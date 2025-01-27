import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Question } from "./src/models/question.model.js";
import connectDB from "./src/db/database.js";

// Load environment variables
dotenv.config({
  path: "./.env",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO_PATH = path.join(__dirname, "proto/questions.proto");

// Load gRPC definitions
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const questionProto =
  grpc.loadPackageDefinition(packageDefinition).questionSearch;

// gRPC method to search questions
async function searchQuestions(call, callback) {
  const { query, page, limit } = call.request || "";

  try {
    const aggregation = [
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { type: { $regex: query, $options: "i" } },
          ],
        },
      },
      {
        $count: "totalResults", // Count matching documents
      },
    ];

    const result = await Question.aggregate(aggregation);

    // If no results, set `totalResults` to 0
    const totalResults = result.length > 0 ? result[0].totalResults : 0;

    // Calculate total pages based on total results and page size
    const totalPages = Math.ceil(totalResults / limit);

    // Fetch the questions with pagination
    const questions = await Question.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit);

    callback(null, { questions: questions, totalPages: totalPages });
  } catch (err) {
    console.error("Error searching for questions:", err);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error searching for questions",
    });
  }
}

// Create the gRPC server
const server = new grpc.Server();

// Add the QuestionService service to the server
server.addService(questionProto.QuestionSearchService.service, {
  searchQuestions: searchQuestions,
});

// Start the server
const PORT = "0.0.0.0:50051";
connectDB().then(() => {
  server.bindAsync(
    PORT,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(`Error binding server: ${err.message}`);
        return;
      }
      console.log(`Server running at ${PORT}`);
      server.start();
    }
  );
});

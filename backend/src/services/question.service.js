import { Question } from "../models/question.model.js";

const searchQuestions = async (call, callback) => {
  const { query, page = 1, limit = 10 } = call.request;
  const skip = (page - 1) * limit;

  try {
    const questions = await Question.find({
      title: { $regex: query, $options: "i" },
    })
      .skip(skip)
      .limit(limit);
    const total = await Question.countDocuments({
      title: { $regex: query, $options: "i" },
    });

    callback(null, {
      questions: questions.map((q) => ({
        id: q._id.toString(),
        type: q.type,
        title: q.title,
        solution: q.solution || "",
      })),
      total,
    });
  } catch (error) {
    callback(error, null);
  }
};

export { searchQuestions };

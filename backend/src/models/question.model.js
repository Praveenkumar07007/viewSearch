import mongoose, { Schema } from "mongoose";

const blockSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  showInOption: {
    type: Boolean,
    required: true,
  },
  isAnswer: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = new Schema({
  type: {
    type: String,
  },
  anagramType: {
    type: String,
  },
  blocks: {
    type: [blockSchema],
  },
  options: [
    {
      text: String,
      isCorrectAnswer: Boolean,
    },
  ],
  siblingId: {
    type: mongoose.Types.ObjectId,
    // ref: "Question",
  },
  solution: {
    type: String,
  },
  title: {
    type: String,
  },
});

export const Question = mongoose.model("Question", questionSchema);

import { Document, Schema, Types, model } from 'mongoose';

export interface IQuiz extends Document {
  userId: Types.ObjectId;
  questions: { _id: Types.ObjectId; optionId?: string }[];
  maxQuestions: number;
  maxTime: number;
  maxMarks: number;
  marksObtained: number;
  completed: boolean;
  grade: number;
}

const QuizSchema = new Schema<IQuiz>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
        optionId: { type: String },
      },
    ],
    maxQuestions: { type: Number, required: true },
    maxTime: { type: Number, required: true },
    maxMarks: { type: Number, required: true, default: 0 },
    marksObtained: { type: Number, required: true, default: 0 },
    completed: { type: Boolean, required: true, default: false },
    grade: { type: Number, required: true },
  },
  { timestamps: true }
);

const Quiz = model<IQuiz>('Quiz', QuizSchema);

export default Quiz;

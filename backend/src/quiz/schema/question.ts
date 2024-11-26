import { Document, Schema, model } from 'mongoose';

export interface IQuestion extends Document {
  question: string;
  image?: string;
  options: {
    text: string;
    id: string;
  }[];
  correctAnswerId: string;
  difficulty: number;
  grade: number;
}

const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  image: { type: String },
  options: [{ text: { type: String, required: true }, id: { type: String, required: true } }],
  correctAnswerId: { type: String, required: true },
  difficulty: { type: Number, required: true },
  grade: { type: Number, required: true },
});

const Question = model<IQuestion>('Question', QuestionSchema);

export default Question;

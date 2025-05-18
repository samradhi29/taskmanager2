import mongoose, { Document, Schema } from 'mongoose';

export interface Task extends Document {
  title: string;
  username: string;
  description?: string;
  status: 'pending' |  'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<Task>(
  {
    title: { type: String, required: true, trim: true },
    username: { type: String, required: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'in progress', 'completed', 'archived'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<Task>('Task', TaskSchema);

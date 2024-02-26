// TaskModel.ts
import mongoose, { Schema, Document } from "mongoose";

export enum TaskStatus {
  Pending = "Pending",
  Completed = "Completed",
  Approved = "Approved",
}

export interface Task extends Document {
  id: string;
  title: string;
  description?: string;
  requiresApproval: boolean;
  status: TaskStatus;
  document?: string;
  dueDate?: Date;
  expiry?: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    requiresApproval: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TaskStatus),
      default: TaskStatus.Pending,
    },
    document: {
      type: String,
      required: false,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    expiry: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
  //  The timestamps: true option in the schema definition automatically adds
  //  createdAt and updatedAt fields to the model, which can be very useful for
  //  tracking when tasks are created and modified.
);

export default mongoose.model<Task>("Task", TaskSchema);

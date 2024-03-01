import mongoose, { Schema, Document } from "mongoose";

import { TaskStatus } from "../types";

export interface Task extends Document {
  id: string;
  title: string;
  description: string;
  requiresApproval: boolean;
  status: TaskStatus;
  document: string;
  dueDate: Date;
  expiry: Date;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requiresApproval: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Completed", "Approved"],
  },
  document: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  expiry: {
    type: Date,
  },
});

export default mongoose.model<Task>("Task", TaskSchema);

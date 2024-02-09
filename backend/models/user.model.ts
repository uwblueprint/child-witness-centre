import mongoose, { Schema, Document } from "mongoose";

import { Role, LocationType } from "../types";

export interface User extends Document {
  id: string;
  firstName: string;
  lastName: string;
  startDate: Date;
  birthday: Date;
  userGroup: Role;
  locationType: LocationType;
  headshot: string;
}

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  userGroup: {
    type: String,
    required: true,
    enum: ["Employee", "Volunteer", "Admin"]
  },
  locationType: {
    type: String,
    required: true,
    enum: ["Remote", "Hybrid", "In-Person"]
  },
  headshot: {
    type: String,
    required: true
  }
});

export default mongoose.model<User>("User", UserSchema);

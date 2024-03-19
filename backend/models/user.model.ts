import mongoose, { Schema, Document } from "mongoose";

import { Role, LocationType } from "../types";

export interface User extends Document {
  id: string;
  firstName: string;
  lastName: string;
  authId: string;
  role: Role;
  startDate: Date;
  birthday: Date;
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
  authId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Volunteer", "Staff", "Admin"],
  },
  startDate: {
    type: Date,
  },
  birthday: {
    type: Date,
  },
  locationType: {
    type: String,
    enum: ["Remote", "Hybrid", "InPerson"],
  },
  headshot: {
    type: String,
  },
});

export default mongoose.model<User>("User", UserSchema);

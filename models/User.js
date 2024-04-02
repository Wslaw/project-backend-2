import { Schema, model } from "mongoose";
import { emailRegexp } from "../constants/user-constants.js";

import { handleSaveError, setUpdateSetting } from "./hooks.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      math: emailRegexp,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSetting);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;

/*
{
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}
*/
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
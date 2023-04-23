import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "PLease Add A Name"],
    },
    email: {
      type: String,
      required: [true, "PLease Add A Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "PLease Add A password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);

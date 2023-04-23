import mongoose, { Schema, model } from "mongoose";

const ticketSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "PLease Select a Product"],
      enum: ["Iphone", "MacBook", "Ipad", "S23"],
    },
    description: {
      type: String,
      required: [true, "PLease enter a description"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket = model("Ticket", ticketSchema);

import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(`${process.env.ABC}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error Connecting to MongoDB " + error);
  }
};

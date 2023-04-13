import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.mjs";
// @desc Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Please Include All Fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already Exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Login a new user
export const loginUser = (req, res) => {
  res.send("login Route");
};

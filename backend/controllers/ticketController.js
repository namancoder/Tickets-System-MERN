import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Ticket } from "../models/ticketModel.js";

// @desc Create User Tickets
// @route POST /api/tickets
// @access private
export const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please product and/or description");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });
  res.status(200).json(ticket);
});

// @desc get User Tickets
// @route POST /api/tickets
// @access private
export const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc get User Single Ticket
// @route POST /api/ticket/:id
// @access private
export const getTicket = asyncHandler(async (req, res) => {
  console.log("get ticket entered");

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  console.log("user found get ticket entered", ticket, req.user);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found with given id");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});

// @desc Delete User Single Ticket
// @route DELETE /api/ticket/:id
// @access private
export const deleteTicket = asyncHandler(async (req, res) => {
  console.log("get ticket entered");

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  console.log("user found get ticket entered", ticket, req.user);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found with given id");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  await Ticket.findByIdAndRemove(req.params.id);

  res.status(200).json({ success: true });
});

// @desc Update User Single Ticket
// @route PUT /api/ticket/:id
// @access private
export const updateTicket = asyncHandler(async (req, res) => {
  console.log("get ticket entered");

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  console.log("user found get ticket entered", ticket, req.user);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found with given id");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});

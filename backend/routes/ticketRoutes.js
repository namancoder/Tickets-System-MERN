import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticketController.js";
const ticketRouter = express.Router();

ticketRouter.route("/").get(protect, getTickets).post(protect, createTicket);
ticketRouter
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

export default ticketRouter;

import express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import router from "./routes/userRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.mjs";
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json(), express.urlencoded({ extended: false }));

app.use("/api/users/", router);
app.use("/api/tickets/", ticketRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});

import express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import path from "path";
import { fileURLToPath } from "url";
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// to Serve Frontend when deploying
if (process.env.NODE_ENV === "production") {
  //Set build folder as Static
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res, done) =>
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: " Welcome to the Support Desk API" });
  });
}
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});

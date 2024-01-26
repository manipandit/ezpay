import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import accountRouter from "./routes/account.route.js";
import connectDB from "./db/db.js";

dotenv.config();
connectDB();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

// healthy checks
app.get("/", (req, res) => {
  res.send("Healthy");
});

// start server
app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port " + process.env.PORT);
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const corsOptions = require("./config/cors");
const connectDB = require("./config/database");
const credentials = require("./middleware/credentials");
const errorHandler = require("./middleware/error_handler");
const authenticationMiddleware = require("./middleware/authentication");

const app = express();

const PORT = 3500;

connectDB();

// Allow Credentials
app.use(credentials);

// CORS
app.use(cors(corsOptions));

// application.x-www-from-urlencoded
app.use(express.urlencoded({ extended: false }));

// application/json response
app.use(express.json());

// middelware for cookies
app.use(cookieParser());

// middleware for authentication
app.use(authenticationMiddleware);

// static files
app.use("/static", express.static(path.join(__dirname, "static")));

// default error handler
app.use(errorHandler);

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

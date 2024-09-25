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
const session = require("express-session");
const passport = require("./config/passport");

const app = express();
const PORT = 3500;

// Connect to DB
connectDB();

// Allow Credentials
app.use(credentials);

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors(corsOptions));

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// application/json response
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// middleware for authentication
app.use(authenticationMiddleware);

// static files
app.use("/static", express.static(path.join(__dirname, "static")));

// Routes
app.use("/api/auth", require("./routes/api/auth"));

// Default error handler
app.use(errorHandler);

// Handle 404 errors
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

// Start the server after connecting to the database
mongoose.connection.once("open", () => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

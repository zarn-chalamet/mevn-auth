const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/authController");
const authMiddleware = require("../../middleware/auth");
const passport = require("passport");

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

router.post("/refresh", authControllers.refresh);

router.get("/user", authMiddleware, authControllers.user);

router.get("/google", authControllers.google);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication
    res.redirect("/");
  }
);

module.exports = router;

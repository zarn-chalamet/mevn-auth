const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/authController");
const authMiddleware = require("../../middleware/auth");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// User Registration
router.post("/register", authControllers.register);

// User Login
router.post("/login", authControllers.login);

// User Logout
router.post("/logout", authControllers.logout);

// Refresh Access Token
router.post("/refresh", authControllers.refresh);

// Get User Information
router.get("/user", authMiddleware, authControllers.user);

// Google OAuth Authentication
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      const accessToken = jwt.sign(
        { id: req.user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1800s" }
      );

      // Set the refresh token in cookies (as you already do)
      const refreshToken = jwt.sign(
        { id: req.user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      req.user.refresh_token = refreshToken;
      await req.user.save();

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Instead of a redirect, you could send back the access token
      res.redirect(`http://localhost:5173/home?access_token=${accessToken}`);
    } catch (error) {
      console.error("Error during callback handling:", error);
      res.redirect("/error");
    }
  }
);

module.exports = router;

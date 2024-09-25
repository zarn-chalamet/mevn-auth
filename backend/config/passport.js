const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); // Adjust the path to your User model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Store credentials in env variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback", // Make sure this matches your route
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("client id", process.env.GOOGLE_CLIENT_ID);
        console.log("client secret", process.env.GOOGLE_CLIENT_SECRET);

        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName,
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Using await instead of a callback
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;

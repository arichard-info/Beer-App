const passport = require("passport");
const mongoose = require("mongoose");
const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth");
const { GOOGLE_CONFIG } = require("./config");
const User = mongoose.model("User");

const googleCallback = async (accessToken, refreshToken, profile, done) => {
  const email =
    profile.emails.find(el => el.verified === true).value ||
    profile.emails[0].value;
  const picture =
    profile.photos && profile.photos[0] && profile.photos[0].value
      ? profile.photos[0].value
      : "";

  let user = await User.findOne({
    $and: [{ authProvider: "google" }, { authProviderId: profile.id }]
  });

  if (!user) {
    user = {
      authProvider: "google",
      authProviderId: profile.id,
      name: profile.displayName,
      email,
      picture,
      toComplete: true
    };
  } else user = user.toObject();
  return done(null, user);
};

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy(GOOGLE_CONFIG, googleCallback));

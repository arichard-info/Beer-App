const passport = require("passport");
const mongoose = require("mongoose");
const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth");
// const { Strategy: TwitterStrategy } = require("passport-twitter");
// const { Strategy: FacebookStrategy } = require("passport-facebook");
// const { Strategy: GithubStrategy } = require("passport-github");
const { GOOGLE_CONFIG } = require("./config");
const User = mongoose.model("User");

const googleCallback = (accessToken, refreshToken, profile, done) => {
  const email =
    profile.emails.find(el => el.verified === true).value ||
    profile.emails[0].value;
  const picture =
    profile.photos && profile.photos[0] && profile.photos[0].value
      ? profile.photos[0].value
      : "";

  User.findOrCreate(
    { googleId: profile.id, name: profile.displayName, email, picture },
    function(err, user) {
      return done(err, user);
    }
  );
};

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy(GOOGLE_CONFIG, googleCallback));
/*
passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback));
passport.use(new GithubStrategy(GITHUB_CONFIG, callback));
*/

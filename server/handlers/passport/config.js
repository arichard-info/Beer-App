const providers = ["twitter", "google", "facebook", "github"];

const callbacks = providers.map(
  provider => `http://localhost:5000/api/auth/${provider}/callback`
);

const [twitterURL, googleURL, facebookURL, githubURL] = callbacks;

/*
exports.TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: twitterURL
};

exports.FACEBOOK_CONFIG = {
  clientID: process.env.FACEBOOK_KEY,
  clientSecret: process.env.FACEBOOK_SECRET,
  profileFields: ["id", "emails", "name", "picture.width(250)"],
  callbackURL: facebookURL
};

exports.GITHUB_CONFIG = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: githubURL
};
*/

exports.GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: googleURL
};

const passport = require("passport");
const GitHubStrategy = require("passport-github");
const User = require("../models/users-model");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackURL = process.env.CALLBACK_URL;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then((user) => {
      cb(null, user);
    })
    .catch((e) => {
      cb(new Error("Failed to deserialize an user"));
    });
});

// Passport Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const currentUser = await User.findOne({
        githubId: profile._json.id,
      });

      if (!currentUser) {
        const newUser = await new User({
          githubId: profile._json.id,
          username: profile._json.login,
          avatar: profile._json.avatar_url,
          profileUrl: profile._json.html_url,
          apiUrl: profile._json.url,
          email: profile._json.email
        }).save();

        if (newUser) {
          cb(null, newUser);
          return;
        }
      }
      cb(null, currentUser);

      return;
    }
  )
);

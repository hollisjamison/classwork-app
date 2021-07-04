require("dotenv").config();
const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const apiRouter = require("./routes/api-route");
const authRouter = require("./routes/auth-route");

const app = express();

// Load env variables and set variables
const port = process.env.PORT || "3001";
const sessionSecret = process.env.SESSION_SECRET;
const { MONGO_URL, MONGO_USER, MONGO_PASS } = process.env;
const buildPath = path.join(__dirname, "client", "build");

// connect to mongodb
mongoose.connect(
  MONGO_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    auth: { user: MONGO_USER, password: MONGO_PASS },
  },
  () => {}
);

mongoose.connection
  .once("open", function () {
    console.log(`Mongo Connected @ ${MONGO_URL}`);
  })
  .on("error", function (error) {
    console.log("CONNECTION ERROR:", error);
  });

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "localhost");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// initalize passport
app.use(passport.initialize());
app.use(passport.session());

// React route
app.use(express.static(buildPath));

// Express routes
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// app.get('/', authCheck, (req, res) => {
//   res.status(200).json({
//     authenticated: true,
//     message: 'user successfully authenticated',
//     user: req.user,
//     cookies: req.cookies
//   });
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath + "/index.html"));
});

// Start app
app.listen(port, () => {
  console.log(`Backend is listening @ http://localhost:${port}`);
});

module.exports = app;

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv')

const apiRouter = require("./routes/api");

const app = express();

// Load env variables and set variables
require('dotenv').config()
const port = process.env.PORT || '3001'
const buildPath = path.join(__dirname, "client", "build");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// Express routes
app.use("/api", apiRouter);

// React route
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath + "/index.html"));
});

// Start app
app.listen(port, () => {
    console.log(`Backend is listening @ http://localhost:${port}`)
})

module.exports = app;

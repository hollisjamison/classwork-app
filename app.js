const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const port = process.env.PORT || '3001'

const buildPath = path.join(__dirname, "client", "build");

const apiRouter = require("./routes/api");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(buildPath));

app.use("/api", apiRouter);

app.use("/", (req, res) => {
  res.sendFile(sendPath);
});

app.listen(port, () => {
    console.log(`Backend is listening @ http://localhost:${port}`)
})

module.exports = app;

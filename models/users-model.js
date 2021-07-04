const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    githubId: String,
    username: String,
    avatar: String,
    profileUrl: String,
    apiUrl: String,
    email: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;
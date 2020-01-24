const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  title: String,
  content: String
})

module.exports = mongoose.model("User", userSchema)
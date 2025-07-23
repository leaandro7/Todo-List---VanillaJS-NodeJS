const mongoose = require("mongoose");

const taskModel = mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model("task", taskModel);

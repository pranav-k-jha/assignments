const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://pranavjha:7229yqitr@cluster0.tciw1xy.mongodb.net/ToDo"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};

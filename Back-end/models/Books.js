const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("book", bookSchema);

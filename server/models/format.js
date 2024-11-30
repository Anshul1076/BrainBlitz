const mongoose = require("mongoose");

const formatSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: {
    type: [String], 
    required: true,
  },
});


module.exports = formatSchema;

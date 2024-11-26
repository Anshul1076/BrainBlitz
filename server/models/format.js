const mongoose = require("mongoose");

// Define a schema for your quiz collections
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

// Export the schema but without binding it to a collection
module.exports = formatSchema;

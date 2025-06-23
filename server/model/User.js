const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  queryType: {
    type: String,
    required: [true, "Query type is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  consent: {
    type: Boolean,
    required: [true, "Consent is required"],
  },
});

module.exports = mongoose.model("User", userSchema);

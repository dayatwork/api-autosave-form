const mongoose = require("mongoose");

const soapSchema = new mongoose.Schema({
  subjective: String,
  objective: String,
  assesment: String,
  plan: String,
});

module.exports = mongoose.model("Soap", soapSchema);

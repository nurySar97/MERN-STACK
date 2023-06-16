const { Schema, model, Types } = require("mongoose");

const wordSchema = new Schema({
  showTime: Number,
  word: String,
});

const schema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now() },
  words: [wordSchema],
});

module.exports = model("Word", schema);

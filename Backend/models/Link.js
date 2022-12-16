const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const linkSchema = new Schema({
  linkUrl: { type: String, default: "" },
  linkDesc: { type: String, default: "" },
  allowed: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
});
const Link = mongoose.model("Link", linkSchema);
module.exports = Link;

const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const linkSchema = new Schema({
  linkUrl: { type: String, default: "" },
  linkDesc: { type: String, default: "" },
  duration :{type:Number,default:0},
  allowed: { type: Boolean, default: false },
});
const Link = mongoose.model("Link", linkSchema);
module.exports = Link;

const express = require("express");
const courserouter = express.Router();

//GET ALL COURSES
courserouter.get("/", (req, res) => {
  res.json({ mssg: "Get all courses" });
});
//Get single Course by id
courserouter.get("/:id", (req, res) => {
  res.json({ mssg: "Get single course" });
});
//post a course
courserouter.post("/:id", (req, res) => {
  res.json({ mssg: "post a single course" });
});
module.exports = courserouter;

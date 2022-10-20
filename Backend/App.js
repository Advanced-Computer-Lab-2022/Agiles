require('dotenv').config()
//express app
const express = require("express");

//mongoose database 
const mongoose = require("mongoose");

//App variables
const app = express();
const Instructor = require("./models/Instructor");

const courseRoutes = require("./routes/course");
//routes
app.get("/", (req, res) => {
  res.status(200).send("You have everything installed!");
});

app.use('/api/course/',courseRoutes )

//listen for requests
const port = process.env.PORT;
app.listen(port, () => {
    console.log('Listening on port',port);
  });
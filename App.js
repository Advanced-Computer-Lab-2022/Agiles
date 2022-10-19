const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
//const MongoURI = 'mongodb+srv://HossamElfar:adminadmin@agilesdb.kc9c3ox.mongodb.net/?retryWrites=true&w=majority';
//App variables
const app = express();
const port = process.env.PORT || "8000";
const Instructor = require("./Models/Instructor");
// #Importing the userController

// configurations
// Mongo DB
/*mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
*/

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});
require("dotenv").config();
//express app
const express = require("express");
const port = process.env.PORT;
const cors = require('cors');

//mongoose database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MongoUri)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

//App variables
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
const adminRoutes = require("./routes/adminRouter");
const courseRoutes = require("./routes/courseRouter");
const instructorRoutes = require("./routes/instructorRouter");
<<<<<<< HEAD
=======
const IndividualTraineeRouter = require("./routes/IndividualTraineeRouter");
>>>>>>> 9ad4a02535cd3d3abf020633bb777d3b246b81c7

app.use("/course/", courseRoutes);
app.use("/admin/", adminRoutes);
app.use("/instructor/", instructorRoutes);
app.use("/individualtrainee/", IndividualTraineeRouter);


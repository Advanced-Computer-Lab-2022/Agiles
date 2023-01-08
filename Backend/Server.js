require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();
const endpointSecret = process.env.ENDPOINT_SECRET;
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Course = require("./models/Course");
const Instructor = require("./models/Instructor");
const IndividualTrainee = require("./models/IndividualTrainee");

mongoose
  .connect(process.env.MongoUri)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(4242, () => {
      console.log(`Listening to requests on http://localhost:4242`);
    });
  })
  .catch((e) => console.log(e));

const payForCourse = async (session) => {
  const courseId = session.metadata.courseId;
  const userId = session.client_reference_id;
  const course = await Course.findOne({ _id: courseId });
  const profit =
    parseInt(course.price) -
    (parseInt(course.price) * parseInt(course.discount)) / 100;
  try {
    await IndividualTrainee.findByIdAndUpdate(userId, {
      $push: { registered_courses: { courseId: courseId,purchasedPrice:price } },
    });
    const month = new Date().getMonth();
    const exists = await Instructor.findOne({ _id: course.instructor,"wallet.month": month});
    if(!exists){
      await Instructor.updateOne( {_id: course.instructor},{$push:{wallet:{amount:profit*70/100,month:month}},$inc:{studentCount:1}});
    }
    else{
      await Instructor.updateOne({_id: course.instructor,"wallet.month": month},{$inc:{"wallet.$.amount":profit*70/100}});
      await Instructor.updateOne({_id: course.instructor},{$inc:{studentCount:1}});
    }
    await Course.updateOne(
      { _id: courseId },
      { studentCount: course.studentCount + 1 }
    );
    return;
  } catch (error) {
    return;
  }
};

app.post('/webhook',bodyParser.raw({type: 'application/json'}), async(request, response) => {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await payForCourse(session);
  }
  response.status(200);
});


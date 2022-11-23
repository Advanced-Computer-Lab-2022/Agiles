const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitles: {
      type: [Object],
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    description: {
      type: String,
      required: false,
    },
    instructor: {
      type: mongoose.Types.ObjectId,
      ref : 'Instructor',
      required: true,
    },
    instructorname: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    free: {
      type: Boolean,
      required: false,
    },
    coursePreviewUrl :{
      type : String,
      validate: { 
        validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
        message: 'Must be a Valid URL' 
      },
      required : false
    },
    language: {
      type: String,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
    },
    discount_enddate: {
      type: Date,
    },
    totalHoursOfCourse: {
      type: Number,
      required: false,
    },
    exercises: {
      type: [{type: mongoose.Types.ObjectId, ref: 'Exam'}],
    },
    imgUrl:{
        type:String,
        validate: { 
          validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
          message: 'Must be a Valid URL' 
        }
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

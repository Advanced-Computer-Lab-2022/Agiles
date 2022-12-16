const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const individualTraineeSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    state:{
      type: Boolean,
      default: false,
      required : true
    },
    registered_courses: [
      {
        courseId: {
          type: Schema.ObjectId,
          ref: "Course",
          required: true,
        },
        courseProgress: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        subtitles: [
          {
            subtitle: { type: String, default: "" },
            time: { type: String, default: "h::mm:ss" },
            link: [{ linkId:{type: mongoose.Schema.Types.ObjectId, ref: "Link"},
            progress:{type:Number,min:0,max:1,default:0} }],
          },
        ],
        courseRating :{type:mongoose.Schema.Types.ObjectId,ref:"Rating"},
        instRating:{type:mongoose.Schema.Types.ObjectId,ref:"Rating"}
      },
    ],
    verficationCode :{
      type:String,
      min:10000,
      max:99999
    },
    mini_bio: {
      type: String,
      required: false,
      default: "",
    },
    imgUrl: {
      type: String,
    },
    creditCard : [{
      type : mongoose.SchemaTypes.ObjectId,
      ref : 'creditCard'
    }]
  },
  { timestamps: true }
);

const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  individualTraineeSchema
);
module.exports = IndividualTrainee;

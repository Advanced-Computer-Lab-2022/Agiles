const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName : {
        type : String ,
        required : true,
        index: { unique: true } 
    },
    password :{
        type : String ,
        required : true
    }
  },{timestamps:true});
  
  const Admin = mongoose.model('Admin', adminSchema);
  module.exports = Admin;  
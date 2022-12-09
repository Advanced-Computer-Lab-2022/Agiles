const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const creditCardSchema = new Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'IndividualTrainee',
        required: true,
    },
    cardName: {
        type: String,
        required: false,
      },
      cardNumber: {
        type: String,
        required: true,
      },
      cardExpiryDate: {
        type: String,
        required: true,
      },
      CVV: {
        type: Number,
        required: true,
      }
});

const creditCard = mongoose.model('creditCard',creditCardSchema);
module.exports=creditCard;
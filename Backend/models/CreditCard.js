const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const creditCardSchema = new Schema({
    cardholderName: {
        type: String,
        required: false,
      },
      pan: {
        type: String,
        required: false,
      },
      cardExpiryDate: {
        type: String,
        required: false,
      },
      walletAmount: {
        type: Number,
        required: false,
      }
});

const creditCard = mongoose.model('creditCard',creditCardSchema);
module.exports=creditCard;
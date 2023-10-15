const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    transactionId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    // donationDate: { type: Date, required: true },
    verifystatus:{
        type:Boolean,
        default:false
    },
    qrCodeScan: { type: String }, // Store the path or URL of the QR code image
    additionalInformation: { type: String },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('DonationSchema',DonationSchema);

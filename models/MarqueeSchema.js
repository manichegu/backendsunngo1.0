const mongoose=require('mongoose');
const MarqueeSchema = new mongoose.Schema({
    Content:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('MarqueeSchema',MarqueeSchema);
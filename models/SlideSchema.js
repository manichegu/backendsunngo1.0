const mongoose=require('mongoose');
const SlideSchema = new mongoose.Schema({
    Main_text:{
        type:String,
        required:true
    },
    Sub_text:{
        type:String,
        required:true
    },
    filechoosen:{
        type:String,
        // required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('SlideSchema',SlideSchema);
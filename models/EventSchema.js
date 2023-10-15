const mongoose=require('mongoose');
const EventSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Location:{
        type:String,
        required:true
    },
    Timings:{
        type:Date,
        // required:true
    },
    OrganisedBy:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    filechoosen:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
// Title: Title,
// Location: Location,
// Timings:Timings,
// OrganisedBy:OrganisedBy
module.exports=mongoose.model('EventSchema',EventSchema);
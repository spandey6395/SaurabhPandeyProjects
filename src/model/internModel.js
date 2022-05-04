//Blog Model

const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

 const internSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"name is required",
        trim:true
    },
    email:{
        type:String,
        required:"email is required",
        unique:"email must be unique",
        trim:true
    },
    mobile:{
        type:Number,
        required:"mobile munber is required",
        unique:"mobile number must be unique",
        trim:true
    },
    collegeId:{
        type:objectId,
        ref:'College',
        required:"collegeId is required",
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
 
 }, {timestamps : true})

module.exports = mongoose.model('Intern', internSchema); //interns
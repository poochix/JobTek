import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,  // it takes string
        required: true // which will be required field
    },
    email:{
        type: String,  
        required: true,
        unique: true  //to stop mulitple account per email 

    },
    phoneNumber:{
        type: Number,  
        required: true,
        unique: false
    },
    password:{
        type: String,  
        required: true
    },
    role:{
        type: String,
        enum:['student', 'recruiter'], 
        required: true
    },
    profile:{
        bio:{type:String },
        skills:[{type:String}],  // to allow storing multiple skills
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    }

},{timestamps: true});

export const User = mongoose.model('User',userSchema);

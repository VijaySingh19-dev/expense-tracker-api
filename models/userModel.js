import mongoose from 'mongoose'

//creating a schema for this user model
//inside the schema we'll add an object and define the properties of this model

const userSchema = new mongoose.Schema({
    name: {type: String , required : true} ,
    email : {type: String , required : true , unique : true} ,
    password : {type : String , required : true }, 
} , {timestamps : true } ) // adding the timestamps

//now use this schema to create a model
//we'll use mongoose.model ftn 
// inside the ftn , provide twoparameters : 1. model name(here Users) & 2. schema(here userSchema)
//export this model in order to use it in another file

export const Users = mongoose.model("Users" , userSchema) ///model is created
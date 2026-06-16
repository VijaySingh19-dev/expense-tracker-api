import mongoose from 'mongoose'

//creating a schema for this user model
//inside the schema we'll add an object and define the properties of this model

const expenseSchema = new mongoose.Schema({
    title: {type: String , required : true , trim : true} ,
    amount : {type : Number , required : true , Min : 1},
    category : {type : String , required : true , trim: true }, 
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
} ,
} , {timestamps : true } ) // adding the timestamps

//now use this schema to create a model
//we'll use mongoose.model ftn 
// inside the ftn , provide twoparameters : 1. model name(here Expense) & 2. schema(here expenseSchema)
//export this model in order to use it in another file

export const Expense = mongoose.model("Expense" , expenseSchema) ///model is created
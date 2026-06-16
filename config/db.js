//this file is for the database connection'
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database connected");
    }
    catch(error){
        console.error("Database connection failed:", error.message);
    }
};

//establishing the mongoDB connection

//an async function is a specialized function 
// that allows you to write asynchronous code (tasks that 
// take time to complete, like fetching data) in a way
//  that looks and behaves like synchronous code. 


//AWAIT =>await is a keyword in JavaScript used to
//  pause execution of an async function until a Promise is resolved

//PROMISE =>A Promise is an object that represents
//  the result of an asynchronous operation (something that will finish in the future)
// A Promise is a placeholder for a value that will be available in the future.

// await mongoose.connect(MONGODB_URI).then( () =>{
//     console.log('Database connected')
// })


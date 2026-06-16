import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from "dotenv";

import authenticateToken from "../middleware/authenticateToken.js"


//For when using MongoDB
 import { Users } from "../models/userModel.js";
 

//helper email-validation function
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


//1. Register function
export const userRegister= async (req,res)=> {

    try{
            const {username ,email ,password } = req.body

            const old_user = await Users.findOne({ email });
            
        //validation
            if( !email || email.trim()=== " " || !(isValidEmail(email))) {
                res.status(400).json({message :"Please provide a valid E-mail id"})
                return
            }

            if( !username || username.trim() === " ") {
                res.status(400).json({message :"Please provide a valid username"})
                return
            }

            if(!password || password.length < 8 ) {
                res.status(400).json({message : "Please provide a valid password of atleast 8-characters"})
                return
            }

            if(old_user) {
                res.status(409).json({messsage : "User already exist , please login instead"})
                return
            }


        //hashing the password
            const hashedPassword = await bcrypt.hash(password , 10)

            // creating a user in DB
            const newUser = await Users.create({
                name: username,
                email,
                password: hashedPassword
            });

            console.log(newUser);

            res.status(201).json({
            message: "User registered successfully."

            })

    }
    catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Internal server error"
            });
    }

}




//2. Login function
export const userLogin= async (req,res)=> {
   
    try{
        const {email ,password } = req.body
        const user = await Users.findOne({ email });

        if(user){
            const pass = await bcrypt.compare(password , user.password)
                if(pass ){
                    const token = jwt.sign({ id: user._id, email: user.email } , process.env.JWT_SECRET ,  { expiresIn: '1d' } );
                    res.status(201).json({
                    message: "User logged-in successfully." ,
                    token    
                    })      
                } else {
                    res.status(401).json({message : "Incorrect password"})
                    return   
                    }  
        }
        else {
            res.status(404).json({message : "New user , please register first"})
            return
        }    
    }

    catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

export const userDashboard = async (req, res) => {
    try {

        const user = await Users.findById(req.user.id);

        res.status(200).json({
            message: `Welcome ${user.name}`
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
    

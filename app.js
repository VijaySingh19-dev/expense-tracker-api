import express from 'express'
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from './routes/authRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'


const app = express()
app.use(express.json());

dotenv.config();
await connectDB();

//coneecting the routes with main app
app.use('/api/auth', authRoutes)       //for auhtorization part

app.use('/api/expense' , expenseRoutes) //for expense part


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
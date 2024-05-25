import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Mongo connected');
    } catch (e: any) {
        console.log('Mongo connection error: ', e.message);
        process.exit(1);
    }
};

export default connectDB;
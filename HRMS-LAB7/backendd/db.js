import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME || 'hrms_lab7',
        });
        console.log(`Successfully connected to MongoDB! Host: ${conn.connection.host}`);
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
};

export default connectDB;
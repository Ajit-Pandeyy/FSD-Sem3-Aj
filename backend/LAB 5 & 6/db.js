import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("You successfully connected to MongoDB!");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
};

export default connectDB;
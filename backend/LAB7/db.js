import mongoose from 'mongoose';

const connectDB = async()=> {
    try{
        await mongoose.conect(process.env.MONGO_URL);
        console.log("You successfully connected to MongoDB!");
    }catch(err){
        console.error(err);
        process.exit(1);
    }
};


export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Successfully connected to MongoDB`);
  } catch (error) {
    console.log(`Failed connecting to MongoDB`);
  }
};

export default connectDB;

import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    //If the database is already connected then dont connect again
    if (connected) {
        console.log(`Aready connected to DB!`)
        return;
    }

    //COnnect to mongodb
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
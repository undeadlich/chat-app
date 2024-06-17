import mongoose from "mongoose"

const connectToMongodb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected");
    }
    catch(error){
        console.log("Error connecting to MongoDB",error.message)
    }
}
export default connectToMongodb;
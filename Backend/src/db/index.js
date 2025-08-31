import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      console.log(`Mongoodb connected with DB host , conguarlate ${connectionInstance.connection.host}`);
      // console.log(connectionInstance);
      
      
    } catch (error) {
        console.log("mongoodb connection Not connected check again", error);
        process.exit(1);
        
        
    }
}

export default connectDB
import mongoose from "mongoose";


const connectDB = async () => {    //in async main thread does not stopped for the async function like sync 

    try{                                                
        await mongoose.connect(process.env.MONGO_URI);     // await holds the as    ync function until the promised is resolved
        console.log("mongodb connected successfully");
    } catch(error){
        console.log(error);

    }
}

export default connectDB;
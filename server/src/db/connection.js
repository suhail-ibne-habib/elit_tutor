import "../loadEnv.js";
import dns from "node:dns"; 
import mongoose from 'mongoose';

// Fix for Node.js querySrv ECONNREFUSED issue on Windows / certain ISPs
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");  

const connectDB = async () => {
  try {

    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      family: 4,
    });

    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
}

export default connectDB;


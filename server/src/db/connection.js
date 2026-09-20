import "../loadEnv.js";
import dns from "node:dns";
import mongoose from "mongoose";

if (process.env.FORCE_IPV4_DNS === "true") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  dns.setDefaultResultOrder("ipv4first");
}

const mongoOptions = {
  dbName: process.env.DB_NAME,
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
};

if (process.env.FORCE_IPV4_DNS === "true") {
  mongoOptions.family = 4;
}

const connectDB = async () => {
  mongoose.set("bufferCommands", false);
  const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
  console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
};

export default connectDB;

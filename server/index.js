import "./src/loadEnv.js";
import connectDB from "./src/db/connection.js";
import { mongoClient } from "./src/lib/auth.js";
import app from "./src/app.js";


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


async function start() {
  await connectDB();
  await mongoClient.connect();
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});

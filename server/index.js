import "./src/loadEnv.js";
import connectDB from "./src/db/connection.js";
import { mongoClient } from "./src/lib/auth.js";
import app from "./src/app.js";

const port = Number(process.env.PORT) || 8000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

async function start() {
  await connectDB();
  await mongoClient.connect();
}

start().catch((error) => {
  console.error("Failed to connect to database", error);
});

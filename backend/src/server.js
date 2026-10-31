import "dotenv/config";
import app from "./app.js";
import { env, validateProductionConfiguration } from "./config/env.js";
import mongoose from "mongoose";

validateProductionConfiguration();

const server = app.listen(env.port, "127.0.0.1", () =>
  console.log(`MSEF API listening on port ${env.port}`),
);

async function connectToMongoDB() {
  if (!env.mongodbUri) {
    console.warn(
      "MONGODB_URI is not set; database-backed features are unavailable.",
    );
    return;
  }

  let delay = 1000;
  while (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(env.mongodbUri, {
        serverSelectionTimeoutMS: 8000,
      });
      console.log("MSEF API connected to MongoDB");
      return;
    } catch (error) {
      console.error(
        `MongoDB connection failed (${error.code || error.name}); retrying in ${delay / 1000}s.`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, 30000);
    }
  }
}

void connectToMongoDB();
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () =>
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    }),
  );
}

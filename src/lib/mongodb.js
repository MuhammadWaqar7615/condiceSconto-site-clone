import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, uri: null };
}

async function connectMongo() {
  if (cached.conn && cached.uri === process.env.MONGODB_URI) {
    return cached.conn;
  }

  // If URI changed, reconnect
  if (cached.conn && cached.uri !== process.env.MONGODB_URI) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.uri = process.env.MONGODB_URI;
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB connection failed:", e.message);
    throw e;
  }

  return cached.conn;
}

export default connectMongo;

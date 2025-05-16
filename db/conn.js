const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Optional setting based on your requirements
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Important to avoid deprecation warnings
    });
    console.log("✅ MongoDB connected locally");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB(); // Call the function to establish the connection

module.exports = mongoose; // Export mongoose for later use (if needed)

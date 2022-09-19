const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Success: Connected to MongoDB");
  } catch (err) {
    console.log("Failure:Unconnected to MongoDB");
    throw new Error();
  }
};

module.exports = connectDB;

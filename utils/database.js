const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://onishi:moninuGAsuki1@cluster0.oasgny5.mongodb.net/appDataBase?retryWrites=true&w=majority"
    );
    console.log("Success: Connected to MongoDB");
  } catch (err) {
    console.log("Failure:Unconnected to MongoDB");
    throw new Error();
  }
};

module.exports = connectDB;

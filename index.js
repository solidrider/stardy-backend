const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./utils/database");
const jwt = require("jsonwebtoken");
const auth = require("./utils/auth");
const { ItemModel, UserModel } = require("./utils/schemaModels");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ITEM function
//Create item
app.post("/item/create", auth, async (req, res) => {
  try {
    await connectDB();
    await ItemModel.create(req.body);
    return res.status(200).json({ message: "Success Create Item" });
  } catch (error) {
    return res.status(400).json({ message: "Failure Create Item" });
  }
});
//ReadAllItems
app.get("/", async (req, res) => {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return res
      .status(200)
      .json({ message: "Success get all items", allItems: allItems });
  } catch (err) {
    return res.status(400).json({ message: "Failure get all items" });
  }
});
//ReadSingleItem
app.get("/item/:id", async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    return res
      .status(200)
      .json({ message: "Success get an item", allItems: singleItem });
  } catch (err) {
    return res.status(400).json({ message: "Failure get an item" });
  }
});
//Update item
app.put("/item/update/:id", auth, async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem.email == req.body.email) {
      await ItemModel.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json({ message: "Success upadate" });
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(400).json({ message: "Failure update" });
  }
});
//Delete item
app.delete("/item/delete/:id", auth, async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem.email == req.body.email) {
      await ItemModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: "Success delete" });
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(400).json({ message: "Failure delete" });
  }
});

//USER function
//Register user
app.post("/user/register", async (req, res) => {
  try {
    await connectDB();
    await UserModel.create(req.body);
    return res.status(200).json({ message: "Success register user account" });
  } catch (err) {
    return res.status(400).json({ message: "Failure register user account" });
  }
});
//Login user
const secret_key = "mern-stardy";
app.post("/user/login", async (req, res) => {
  try {
    await connectDB();
    const saveUserData = await UserModel.findOne({ email: req.body.email });
    if (saveUserData) {
      //exist user
      if (req.body.password === saveUserData.password) {
        //password OK
        const payload = {
          email: req.body.email,
        };
        const token = jwt.sign(payload, secret_key, { expiresIn: "7d" });
        console.log(token);
        return res.status(200).json({ message: "Success login", token: token });
      } else {
        //wrong password
        return res
          .status(400)
          .json({ message: "Failure login.wrong password!" });
      }
    } else {
      //not exist user
      return res
        .status(400)
        .json({ message: "Failure login. Please register new account" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Failure login" });
  }
});

//connecting to port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: String,
  profilePic: String,
});
let User = new mongoose.model("user", userSchema);

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  //app.post("/signup", upload.array("profilePic"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    //console.log(req.files);

    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
      //profilePic: req.files[0].path,
    });
    await User.insertMany([newUser]);
    res.json({ status: "success", msg: "User created successfully." });
  } catch (err) {
    res.json({ status: "Failure", msg: "User unable to create." });
  }
});
app.listen(4567, () => {
  console.log("Listening to port 4567");
});
let connectToMDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://sumanthdps:sumanth@mern2406.9fvsa.mongodb.net/Players?retryWrites=true&w=majority&appName=Mern2406"
    );
    console.log("Successfully to connected MDB");
  } catch (err) {
    console.log("Unable to connect MDB");
  }
};
connectToMDB();

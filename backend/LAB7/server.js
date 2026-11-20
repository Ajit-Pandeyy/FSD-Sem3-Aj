import express from "express";
import os from "os";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";
import Student from "./models/student.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

let userData = [
  { id: 1, name: "Akshat", email: "avs@gmail.com" },
  { id: 2, name: "Akarsh", email: "akarsh@gmail.com" },
  { id: 3, name: "Arsh", email: "arsh@gmail.com" },
  { id: 4, name: "Ashwani", email: "ashwani@gmail.com" },
];

let registeredData = [
  { id: 1, name: "Akshat Kumar", email: "ak@gmail.com" },
  { id: 2, name: "Akarsh", email: "akarsh@gmail.com" },
  { id: 3, name: "Arsh", email: "arsh@gmail.com" },
  { id: 4, name: "Anwar", email: "anwar@gmail.com" },
];

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to Express Server" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/test-db", async (req, res) => {
  try{
    const student = await Student.create({
      name: "Rahul",
      email: "ra12@gmail.com",
      course: "MERN Stack"
    });
    res.status(200).json({
    msg: "Student added successfully",
    data: student
  });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.get("test-db",async (req,res)=>{
  try{
    const students=await Student.find();
    res.status(200).json(students);
  }catch (error){
    res.status(500).json({
      message: error.message,
    })
  }

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
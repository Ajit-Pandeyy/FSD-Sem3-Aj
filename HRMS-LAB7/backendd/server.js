import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import Student from "./models/student.js";
import Employee from "./models/employee.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to HRMS Express Server" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// GET all employees from DB
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      msg: "Employees retrieved successfully",
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve employees",
      details: error.message,
    });
  }
};

app.get("/employees", getAllEmployees);
app.get("/employee", getAllEmployees);

// GET single employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = [{ employeeId: id }];
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      query.push({ _id: id });
    }
    const employee = await Employee.findOne({ $or: query });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({
      msg: "Employee retrieved successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving employee",
      details: error.message,
    });
  }
};

app.get("/employees/:id", getEmployeeById);
app.get("/employee/:id", getEmployeeById);

// POST create employee in DB
const createEmployee = async (req, res) => {
  try {
    const employeeId = req.body.employeeId || req.body.id || req.body.employee_id;
    const name = req.body.name;
    const dateOfJoining = req.body.dateOfJoining || req.body.doj || req.body.date_of_joining || new Date();
    const dept = req.body.dept || req.body.department;
    const salary = req.body.salary;

    if (!employeeId || !name || !dept || salary === undefined) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["employeeId (or id)", "name", "dept (or department)", "salary"],
        received: req.body,
      });
    }

    // Check if employee with same employeeId already exists
    const existingEmployee = await Employee.findOne({ employeeId: String(employeeId) });
    if (existingEmployee) {
      return res.status(409).json({
        error: "An employee with this ID already exists",
        employeeId: employeeId,
      });
    }

    const newEmployee = await Employee.create({
      employeeId: String(employeeId),
      name: String(name).trim(),
      dateOfJoining: new Date(dateOfJoining),
      dept: String(dept).trim(),
      salary: Number(salary),
    });

    res.status(201).json({
      msg: "Employee added successfully",
      data: newEmployee,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create employee",
      details: error.message,
    });
  }
};

app.post("/employees", createEmployee);
app.post("/employee", createEmployee);

// Student test routes
app.post("/test-db", async (req, res) => {
  try {
    const student = await Student.create({
      name: "Rahul",
      email: "ra12@gmail.com",
      course: "MERN Stack",
    });
    res.status(200).json({
      msg: "Student added successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.get("/test-db", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

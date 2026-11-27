import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
    },
    dateOfJoining: {
      type: Date,
      default: Date.now,
    },
    dept: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;

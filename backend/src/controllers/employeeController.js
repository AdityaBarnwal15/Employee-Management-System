const Employee = require("./../models/Employee");

const addEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const mobileNum = req.body.mobileNum || req.body.mobile;

    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee with this email already exists.",
      });
    }

    const newEmployee = new Employee({
      profileImage: req.file ? `uploads/${req.file.filename}` : null,
      name,
      email,
      mobileNum,
      department,
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Employee added successfully.",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({
      message: "Error occurred while adding the employee.",
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employee = await Employee.find().sort({
      createdAt: -1,
    });
    res.status(200).json({
      message: "Employees retrieved successfully.",
      employees: employee,
    });
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res.status(500).json({
      message: "Error occurred while retrieving the employees.",
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }
    res.status(200).json({
      message: "Employee retrieved successfully.",
      employee,
    });
  } catch (error) {
    console.error("Error retrieving employee:", error);
    res.status(500).json({
      message: "Error occurred while retrieving the employee.",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const mobileNum = req.body.mobileNum || req.body.mobile;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobileNum,
        department,
      },
      { new: true },
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee && existingEmployee._id.toString() !== req.params.id) {
      return res.status(400).json({
        message: "Another employee with this email already exists.",
      });
    }

    employee.name = name;
    employee.email = email;
    employee.mobileNum = mobileNum;
    employee.department = department;

    if (req.file) {
      employee.profileImage = `uploads/${req.file.filename}`;
    }

    res.status(200).json({
      message: "Employee updated successfully.",
      employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      message: "Error occurred while updating the employee.",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }
    res.status(200).json({
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      message: "Error occurred while deleting the employee.",
    });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

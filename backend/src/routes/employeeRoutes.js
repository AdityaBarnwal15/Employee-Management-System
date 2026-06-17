const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const { 
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

router.post(
    "/", 
    upload.single("profileImage"), 
    addEmployee
);

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
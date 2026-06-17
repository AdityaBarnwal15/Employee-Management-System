const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        profileImage: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        mobileNum: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Employee", employeeSchema);
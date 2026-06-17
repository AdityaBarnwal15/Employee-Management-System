const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./src/config/db");

const employeeRoutes = require("./src/routes/employeeRoutes");

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("src/uploads"));

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
    res.send("Krptronix-EMS API is Running");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
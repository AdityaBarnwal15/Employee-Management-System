import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Enter a valid email");
      return;
    }

    if (!/^\d{10}$/.test(mobileNum)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    if (!department.trim()) {
      alert("Department is required");
      return;
    }

    const formData = new FormData();

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNum", mobileNum);
    formData.append("department", department);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        formData,
      );

      alert(response.data.message);

      setProfileImage(null);
      setName("");
      setEmail("");
      setMobileNum("");
      setDepartment("");

      document.getElementById("profileImage").value = "";
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="hero">
          <span className="eyebrow">HR dashboard</span>
          <h1>Employee Management System</h1>
          <p className="subtitle">
            Add new employees with a clean, focused form built for fast data
            entry.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>

            <input
              id="profileImage"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobileNum">Mobile Number</label>

            <input
              id="mobileNum"
              type="text"
              placeholder="Enter mobile number"
              value={mobileNum}
              onChange={(e) => setMobileNum(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>

            <input
              id="department"
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <button type="submit">Add Employee</button>
        </form>
      </div>
    </div>
  );
}

export default App;

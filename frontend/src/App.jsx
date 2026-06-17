import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API_URL =
    "https://employee-management-system-v1-f6p0.onrender.com/api/employees";

  const IMAGE_BASE_URL =
    "https://employee-management-system-v1-f6p0.onrender.com";

  const [employees, setEmployees] = useState([]);

  const [editId, setEditId] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [department, setDepartment] = useState("");

  // ---------------- Fetch Employees ----------------

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ---------------- Reset Form ----------------

  const resetForm = () => {
    setEditId(null);
    setProfileImage(null);
    setName("");
    setEmail("");
    setMobileNum("");
    setDepartment("");

    const fileInput = document.getElementById("profileImage");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // ---------------- Submit ----------------

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
      alert("Enter valid email");
      return;
    }

    if (!/^\d{10}$/.test(mobileNum)) {
      alert("Mobile Number must contain exactly 10 digits");
      return;
    }

    if (!department.trim()) {
      alert("Department is required");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNum", mobileNum);
    formData.append("department", department);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);

        alert("Employee updated successfully");
      } else {
        await axios.post(API_URL, formData);

        alert("Employee added successfully");
      }

      resetForm();

      fetchEmployees();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ---------------- Edit ----------------

  const handleEdit = (employee) => {
    setEditId(employee._id);

    setName(employee.name);
    setEmail(employee.email);
    setMobileNum(employee.mobileNum);
    setDepartment(employee.department);

    setProfileImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ---------------- Delete ----------------

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Employee deleted successfully");

      fetchEmployees();

      if (editId === id) {
        resetForm();
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete employee"
      );
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Employee Management System</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Profile Image</label>

            <input
              id="profileImage"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) =>
                setProfileImage(e.target.files[0])
              }
            />
          </div>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobileNum}
              onChange={(e) =>
                setMobileNum(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Department</label>

            <input
              type="text"
              placeholder="Enter Department"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
            />
          </div>

          <button type="submit">
            {editId
              ? "Update Employee"
              : "Add Employee"}
          </button>

          {editId && (
            <button
              type="button"
              style={{
                marginTop: "10px",
                backgroundColor: "#666",
              }}
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div
        className="card"
        style={{ marginTop: "30px" }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Employee List
        </h2>

        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Profile</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>
                    Mobile
                  </th>
                  <th style={thStyle}>
                    Department
                  </th>
                  <th style={thStyle}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td style={tdStyle}>
                      {employee.profileImage ? (
                        <img
                          src={`${IMAGE_BASE_URL}${employee.profileImage}`}
                          alt="Profile"
                          width="60"
                          height="60"
                          style={{
                            borderRadius: "50%",
                            objectFit:
                              "cover",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td style={tdStyle}>
                      {employee.name}
                    </td>

                    <td style={tdStyle}>
                      {employee.email}
                    </td>

                    <td style={tdStyle}>
                      {employee.mobileNum}
                    </td>

                    <td style={tdStyle}>
                      {employee.department}
                    </td>

                    <td style={tdStyle}>
                      <button
                        style={{
                          marginRight:
                            "8px",
                          width: "80px",
                        }}
                        onClick={() =>
                          handleEdit(
                            employee
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        style={{
                          width: "80px",
                          backgroundColor:
                            "#d32f2f",
                        }}
                        onClick={() =>
                          handleDelete(
                            employee._id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#f0f0f0",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
};

export default App;
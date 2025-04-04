import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        tenthCGPA: "",
        interCGPA: "",
        phoneNumber: "",
        parentsPhone: "",
        address: ""
    });

    const navigate = useNavigate();
    const API_URL = "http://localhost:4000";

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert CGPA fields properly to allow decimals
        if (["tenthCGPA", "interCGPA"].includes(name)) {
            setStudent({
                ...student,
                [name]: value === "" ? "" : value // Keep input as is to allow decimal typing
            });
        } else {
            setStudent({
                ...student,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/students/addStudent`, student);
            alert("Student added successfully!");
            navigate("/view-students");
        } catch (error) {
            console.error("Error adding student:", error);
            alert(error.response?.data?.error || "Failed to add student");
        }
    };

    return (
        <div className="form-container">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(student).map((key) => (
                    <div className="form-group" key={key}>
                        <label htmlFor={key}>{key.replace(/([A-Z])/g, " $1").trim()}</label>
                        {key === "gender" ? (
                            <select name={key} value={student[key]} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : key === "dateOfBirth" ? (
                            <input type="date" name={key} value={student[key]} onChange={handleChange} required/>
                        ) : ["tenthCGPA", "interCGPA"].includes(key) ? (
                            <input type="number" step="0.1" min="0" max="10" name={key} value={student[key]} onChange={handleChange} required />
                        ) : (
                            <input type={["email", "address"].includes(key) ? "text" : key.includes("Phone") ? "tel" : "text"} name={key} value={student[key]} onChange={handleChange} required />
                        )}
                    </div>
                ))}
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;

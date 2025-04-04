import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"

const API_URL = "http://localhost:4000/api/students";

export default function ViewStudents() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${API_URL}/getAllStudents`);
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`${API_URL}/deleteStudent/${id}`);
            alert("Student deleted successfully");
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <div className="container">
            <h2>Student List</h2>
            <table className="styled-table">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Full Name</th>
                        <th className="border p-2">Age</th>
                        <th className="border p-2">Gender</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="studentTableBody">
                    {students.map((student) => (
                        <tr key={student.studentID} className="border">
                            <td className="border p-2">{student.studentID}</td>
                            <td className="border p-2">{student.firstName} {student.lastName}</td>
                            <td className="border p-2">{student.age}</td>
                            <td className="border p-2">{student.gender}</td>
                            <td className="border p-2">{student.email}</td>
                            <td className="border p-2">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => setSelectedStudent(student)}
                                >View</button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteStudent(student.studentID)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedStudent && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    <div style={{
                        background: "white", padding: "20px", borderRadius: "8px", width: "400px", textAlign: "left", position: "relative"
                    }}>
                        <span 
                            style={{ position: "absolute", top: "10px", right: "15px", cursor: "pointer", fontSize: "20px", color: "#333" }}
                            onClick={() => setSelectedStudent(null)}
                        >&times;</span>
                        <h2 style={{ marginBottom: "10px" }}>Student Details</h2>
                        <p><strong>ID:</strong> {selectedStudent.studentID}</p>
                        <p><strong>Full Name:</strong> {selectedStudent.firstName} {selectedStudent.lastName}</p>
                        <p><strong>Age:</strong> {selectedStudent.age}</p>
                        <p><strong>Gender:</strong> {selectedStudent.gender}</p>
                        <p><strong>Email:</strong> {selectedStudent.email}</p>
                        <p><strong>10th CGPA:</strong> {selectedStudent.tenthCGPA}</p>
                        <p><strong>Inter CGPA:</strong> {selectedStudent.interCGPA}</p>
                        <p><strong>Phone Number:</strong> {selectedStudent.phoneNumber}</p>
                        <p><strong>Parent's Phone:</strong> {selectedStudent.parentsPhone}</p>
                        <p><strong>Address:</strong> {selectedStudent.address}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

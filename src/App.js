import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import AddStudent from "./components/AddStudent";
import ViewStudents from "./components/ViewStudents";
// import Home from "./components/Home";
const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/add-student">Add Student</Link></li>
      <li><Link to="/view-students">View Students</Link></li>
    </ul>
  </nav>
);

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<div class="container">
        <h1>Welcome to Student Registration</h1>
        <p>Manage students efficiently with a simple and clean interface.</p>
      </div>} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/view-students" element={<ViewStudents />} />
    </Routes>
  </Router>
);

export default App;

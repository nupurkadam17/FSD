
import { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [course, setCourse] = useState("");
    const [students, setStudents] = useState([]);

    function addStudent() {
        if (name == "" || roll == "" || course == "") {
            alert("Please fill all fields!");
        }
        else {
            let student = {
                name: name,
                roll: roll,
                course: course
            };

            setStudents([...students, student]);

            setName("");
            setRoll("");
            setCourse("");
        }
    }

    function deleteStudent(index) {
        setStudents(students.filter((s, i) => i != index));
    }

    return (
        <div className="container">

            <h1>Student Directory</h1>
            <p>Manage Student Records</p>

            <div className="form">
                <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Roll Number"
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                />

                <button onClick={addStudent}>Add Student</button>
            </div>

            <h2>Student Records</h2>

            {students.map((s, index) => (
                <div className="student-card" key={index}>

                    <div>
                        <h3>{s.name}</h3>
                        <p>Roll No: {s.roll}</p>
                        <p>Course: {s.course}</p>
                    </div>

                    <button onClick={() => deleteStudent(index)}>
                        Delete
                    </button>

                </div>
            ))}

            {students.length == 0 && <p>No student records yet.</p>}

        </div>
    );
}

export default App;

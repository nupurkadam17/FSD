const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
    { id: 1, name: "Rahul", age: 20, course: "Computer Engineering" },
    { id: 2, name: "Priya", age: 21, course: "Information Technology" }
];

app.get('/', (req, res) => {
    res.send('Welcome to Student Management System');
});

app.get('/students', (req, res) => {

    res.status(200).json(students);

});

app.get('/students/:id', (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    res.json(student);

});

app.post('/students', (req, res) => {

    const { name, age, course } = req.body;

    if (!name || !Number.isInteger(age) || age <= 0 || !course) {
        return res.status(400).json({
            message: 'Please provide valid name, age and course'
        });
    }

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name,
        age,
        course
    };

    students.push(newStudent);

    res.status(201).json({
        message: 'Student added successfully',
        student: newStudent
    });

});

app.put('/students/:id', (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    const { name, age, course } = req.body;

    if (!name || !Number.isInteger(age) || age <= 0 || !course) {
        return res.status(400).json({
            message: 'Please provide valid name, age and course'
        });
    }

    student.name = name;
    student.age = age;
    student.course = course;

    res.json({
        message: 'Student updated successfully',
        student: student
    });

});

app.delete('/students/:id', (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    students = students.filter(s => s.id !== id);

    res.json({
        message: 'Student deleted successfully'
    });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
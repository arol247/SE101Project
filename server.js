require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (CSS, JS, images) from the "Static" folder
app.use(express.static(path.join(__dirname, 'Student Management', 'Static')));

// Serve HTML pages from the "Templates" folder
app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'Student Management', 'Templates', 'Registrationpage.html'));
});

app.get('/guardian', (req, res) => {
    res.sendFile(path.join(__dirname, 'Student Management', 'Templates', 'RegistrationforGuardian.html'));
});

app.get('/faculty', (req, res) => {
    res.sendFile(path.join(__dirname, 'Student Management', 'Templates', 'RegistrationforFaculty.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Student Management', 'Templates', 'RegistrationforAdmin.html'));
});

// ✅ Connect to MySQL Database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL database.');
    }
});

// ✅ API Endpoint to Handle Form Submissions
app.post('/displayData', (req, res) => {
    const {
        first_name, middle_name, last_name, sex, civil_status, nationality, birth_date, birth_place,
        contact_number, address, lrn, primary, intermediate,
        father, father_occupation, mother, mother_occupation,
        guardian, relationship
    } = req.body;

    console.log('Received form data:', req.body);

    // Insert data into the database (example logic)
    const studentSql = `INSERT INTO students (first_name, middle_name, last_name, sex, civil_status, nationality, birth_date, birth_place,
                        contact_number, address, lrn, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    connection.query(studentSql, [
        first_name, middle_name, last_name, sex, civil_status, nationality, birth_date, birth_place,
        contact_number, address, lrn
    ], (err, result) => {
        if (err) {
            console.error('Error inserting data into students table:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        const studentId = result.insertId;

        const educationSql = `INSERT INTO education_history (student_id, primary_education, intermediate_education)
                              VALUES (?, ?, ?)`;

        connection.query(educationSql, [
            studentId, primary, intermediate
        ], (err, result) => {
            if (err) {
                console.error('Error inserting data into education_history table:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            const guardianSql = `INSERT INTO guardians (father_name, father_occupation, mother_name, mother_occupation,
                                guardian_name, guardian_relationship, student_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?)`;

            connection.query(guardianSql, [
                father, father_occupation, mother, mother_occupation,
                guardian, relationship, studentId
            ], (err, result) => {
                if (err) {
                    console.error('Error inserting data into guardians table:', err.message);
                    return res.status(500).json({ error: 'Database error' });
                }

                res.status(200).json({ message: '✅ Data received and added to the database!' });
            });
        });
    });
});

// ✅ Start the Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/`);
    console.log(`Junior High Registration: http://localhost:${port}/`);
    console.log(`Guardian Registration: http://localhost:${port}/guardian`);
    console.log(`Faculty Registration: http://localhost:${port}/faculty`);
    console.log(`Admin Registration: http://localhost:${port}/admin`);
});
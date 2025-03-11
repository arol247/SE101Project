require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Allow frontend to access backend
app.use(bodyParser.json()); // Parse JSON body

// Debugging: Log environment variables
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

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

// ✅ API Endpoint to Display Form Data and Insert into Database
app.post('/displayData', (req, res) => {
    const {
        sex, civil_status, nationality, birth_date, birth_place,
        contact_number, address, lrn, primary, intermediate,
        father, father_occupation, mother, mother_occupation,
        guardian, relationship
    } = req.body;

    // Log the received data to the terminal
    console.log('Received form data:', req.body);

    // Insert data into the students table
    const studentSql = `INSERT INTO students (sex, civil_status, nationality, birth_date, birth_place,
                        contact_number, address, lrn, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    connection.query(studentSql, [
        sex, civil_status, nationality, birth_date, birth_place,
        contact_number, address, lrn
    ], (err, result) => {
        if (err) {
            console.error('Error inserting data into students table:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        const studentId = result.insertId;

        // Insert data into the education_history table
        const educationSql = `INSERT INTO education_history (student_id, primary_education, intermediate_education)
                              VALUES (?, ?, ?)`;

        connection.query(educationSql, [
            studentId, primary, intermediate
        ], (err, result) => {
            if (err) {
                console.error('Error inserting data into education_history table:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            // Insert data into the guardians table
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
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port =  5000;

app.use(cors()); // Allow frontend to access backend
app.use(bodyParser.json()); // Parse JSON body

// ✅ API Endpoint to Display Form Data
app.post('/displayData', (req, res) => {
    const {
        sex, civil_status, nationality, birth_date, birth_place,
        father, father_occupation, mother, mother_occupation,
        guardian, relationship, contact_number, address, lrn,
        primary, intermediate
    } = req.body;

    // Log the received data to the terminal
    console.log('Received form data:', req.body);

    res.status(200).json({ message: '✅ Data received and displayed on terminal!' });
});

// ✅ Start the Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/`);
});
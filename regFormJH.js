const mysql = require('mysql2');

// Use your existing credentials from VS Code
const connection = mysql.createConnection({
    host: 'localhost',        // e.g., 'localhost' or your remote server IP
    user: 'root',    // Your MySQL username
    password: 'SEProject',// Your MySQL password
    database: 'studentmanagementdb' // Your database name
});

// Check if connection works
connection.connect((err) => {
    if (err) {
        console.error('Connection failed:', err.message);
    } else {
        console.log('Connected to MySQL successfully!');
    }
});

// Example Query
connection.query('SELECT * FROM your_table', (err, results) => {
    if (err) {
        console.error('Query error:', err.message);
    } else {
        console.log('Query results:', results);
    }
});

// Close connection when done
// connection.end();

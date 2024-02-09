const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MySQL connection configuration
const db = mysql.createConnection({
    host: '107.180.1.16',
    user: 'spring2024team1',
    password: 'spring2024team1',
    database: 'spring2024team1',
    port: 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

// Endpoint to create a new user
app.post('/createAccount', (req, res) => {
    let user = req.body;
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        console.log('User record inserted');
        res.send('User created successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
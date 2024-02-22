const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

const dbConfig = {
    host: '107.180.1.16',
    user: 'spring2024team1',
    password: 'spring2024team1',
    database: 'spring2024team1',
    port: 3306
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(dbConfig); // Create a connection to the database
    db.connect(err => {
        if (err) {
            console.log('Error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // Try to reconnect every 2 seconds if connection fails
        } else {
            console.log('Connected to the MySQL server.');
        }
    });
    db.on('error', function (err) {
        console.log('Database error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
            console.log('Attempting to re-establish database connection.');
            handleDisconnect();
        } else {
            console.error('An error occurred:', err);
        }
    });
}

handleDisconnect();

// Login endpoint
app.post('/login', (req, res) => {
    console.log("Login route hit", req.body); // Log to confirm request data
    const { email, password } = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        //console.log("Checkpoint 2")
        if (err) {
            console.error('Failed to fetch user:', err);
            res.status(500).send('An error occurred during the login process');
            return;
        }

        if (results.length > 0) {
            // Simplified for this example
            const match = password === results[0].password;

            if (match) {
                // Passwords match
                res.send('Login successful');
            } else {
                // Passwords do not match
                res.status(401).send('Incorrect password');
            }
        } else {
            // No user found with the given email
            res.status(404).send('User not found');
        }
    });
});

// Updated /createAccount endpoint to handle new user fields
app.post('/createAccount', (req, res) => {
    let { username, firstName, lastName, email, department, positionTitle, password } = req.body;
    // Before storing the password, consider implementing hashing here for security
    let user = { username, firstName, lastName, email, department, positionTitle, password };

    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) {
            console.error('Failed to insert user record:', err);
            res.status(500).send('An error occurred creating the user account');
            return;
        }
        console.log('User record inserted', result);
        res.send('User created successfully');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to fetch achievements
app.get('/achievements', (req, res) => {
    let sql = 'SELECT * FROM achievements';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch achievements:', err);
            res.status(500).send('An error occurred fetching achievements');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Endpoint to fetch logged-in user's profile
app.get('/profile', (req, res) => {
    // Assume the user's email is sent in the query params or via a token
    // For demonstration, using query params. In production, use a secure method like JWT tokens
    const userEmail = req.query.email;

    if (!userEmail) {
        return res.status(400).send('User email is required');
    }

    let sql = 'SELECT username, firstName, lastName, email, department, positionTitle FROM users WHERE email = ?';

    db.query(sql, [userEmail], (err, result) => {
        if (err) {
            console.error('Failed to fetch user profile:', err);
            return res.status(500).send('An error occurred fetching user profile');
        }

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('User not found');
        }
    });
});

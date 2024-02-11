const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const dbConfig = {
    host: '107.180.1.16',
    user: 'spring2024team1',
    password: 'spring2024team1',
    database: 'spring2024team1',
    port: 3306
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(dbConfig);
    db.connect(err => {
        if (err) {
            console.log('Error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
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

app.post('/createAccount', (req, res) => {
    let { username, firstName, lastName, email, department, positionTitle, password } = req.body;
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

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let sql = 'SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Failed to retrieve user:', err);
            res.status(500).send('An error occurred during login');
            return;
        }
        if (results.length > 0) {
            res.send({ status: 'success', message: 'Login successful' });
        } else {
            res.status(401).send({ status: 'fail', message: 'Incorrect email or password' });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

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

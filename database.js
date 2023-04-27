// import mysql from 'mysql2';

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: 'form_sql'
// }).promise()

// async function getUsers() {
//     const result = await pool.query("SELECT * FROM users");
//     const rows = result[0];
//     return rows;
// }

// const users = await getUsers();
// console.log(users);

const mysql = require('mysql2');
const path = require('path');
const express = require('express');
const app = express();

// set the views directory
app.set('views', path.join(__dirname, 'views'));


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Configure MySQL connection
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Sara1234$',
    database: 'form_sql2'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect to MySQL database

// Configure body-parser middleware to handle form data
// app.use(bodyParser.urlencoded({ extended: false }));

// // Serve static files from the 'public' directory
// app.use(express.static('public'));

// Handle form submission
app.post('/', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const password = req.body.password;
    const country = req.body.country;
    const gender = req.body.gender;
    const message = req.body.message;
    console.log(req.body.gender);
    // Insert data into MySQL database
    connection.query(
        'INSERT INTO users (name, age, email, password, country, gender, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, age, email, password, country, gender, message],
        (err, result) => {
            if (err) {
                console.log('Error inserting data into MySQL database:', err);
                res.status(500).send('Internal server error');
                return;
            }
            console.log('Data inserted into MySQL database:', result);

            // Redirect back to home page
            res.redirect('/');
        }
    );
});

// Start server

app.get('/', (req, res) => {
    res.render('post');
})

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});


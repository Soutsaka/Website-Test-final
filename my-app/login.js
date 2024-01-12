
// server.js
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2');
const bcrypt = require("bcrypt")

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
  password: 'password'
});

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', function (req, res, next) {
    res.send('Hello World! from server')
})

app.get('/users', function (req, res, next) {
    connection.query(
        'SELECT * FROM users',
        function(err, results, fields) {
          res.send(results);
        }
    );
})

app.post('/register',async function (req, res, next) {
    const salt = 10
    const password = await bcrypt.hash(req.body.password, salt)
    connection.query(
      'INSERT INTO users(fname, lname, email, password, avatar) VALUES (?, ?, ?, ?, ?)',
      [req.body.fname, req.body.lname, req.body.email, password, req.body.avatar],
      function(err, results) {
        if(err) {
            return res.status(400).send('Email already exists')
        }
        res.send(results);
      }
    );
})

app.post('/login', function (req, res, next) {
    const { email, password } = req.body
    if(!email) {
        return res.status(400).send({message:'Email is required'})
    }
    if(!password) {
        return res.status(400).send({message:'Password is required'})
    }
    connection.query(
      'SELECT id,email,password FROM users WHERE email = ?',
      [id],
      function(err, results) {
        res.send(results);
      }
    );
})



app.listen(4000, function () {
    console.log('CORS-enabled web server listening on port 4000')
})


 

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/database');

var db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to the database"));
db.once('open', () => console.log("Connected to the database"));

// Route to handle sign-up form submissions
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phno = req.body.phno;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phno": phno,
        "gender": gender,
        "password": password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record inserted successfully");
    });

    return res.redirect('signup_successful.html');
});

// Route to handle GET requests to the root URL
app.get("/", (req, res) => {
    res.set("Allow-access-Allow-origin", '*');
    res.send("Welcome to the homepage!");
});

// Start the server and listen on port 3001
app.listen(3001, () => {
    console.log("Listening to port 3001");
});

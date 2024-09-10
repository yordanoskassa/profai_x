const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/user');


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/user")

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email: email })
    .then(user => {
        if(user) {
            if (password === user.password) {
                res.json("Success");

            } else {
                res.json('Password is incorrect');
            }
        } else {
            res.json('User does not exist');
        }

    })
    .catch(err => res.status(400).json('Error: ' + err));

})

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

app.listen(3000, () => {
    console.log("Server is running!")
})


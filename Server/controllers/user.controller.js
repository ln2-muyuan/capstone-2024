const User = require('../models/user.model');

exports.register = async function (req, res) {
    let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    );
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        await user.save();
        res.send("User created successfully");
    }
    catch (err) {
        console.log(err);
        res.send("User creation failed");
    }
}

exports.login = async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne( {email: email} )
        if (!user) {
            return res.status(400).send("User not found");
        }
        if (user.password !== password) {
            return res.status(400).send("Password incorrect");
        }
        else {
            res.send("Login successful");
        }
    }
    catch (err) {
        console.log(err);
        res.send("Login failed");
    }
}



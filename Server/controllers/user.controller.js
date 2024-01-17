const User = require('../models/user.model');
const Patient = require('../models/patient.model');

exports.register = async function (req, res) {
    console.log("Server: received register request");
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
        console.log("Server: successfully saved user");
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


exports.addPatientToUser = async function (req, res) {
    const patients = req.body.patients;
    const email = req.body.email;
    try {
        const user = await User.findOne( {email: email} )
        if (!user) {
            return res.status(400).send("User not found");
        }
        // check whether it is already in the list
        for (let i = 0; i < patients.length; i++) {
            if (user.patientsID.includes(patients[i])) {
                return res.status(400).send("Patient already added to the user");
            }
        }
        user.patientsID.push(...patients);
        await user.save();
        console.log("Server: successfully saved patient");
        res.send("Patient added successfully");
    }
    catch (err) {
        console.log(err);
        res.send("Adding patient failed");
    }
}

exports.getPatients = async function (req, res) {
    const email = req.query.email;
    try {
        const user = await User.findOne( {email: email} )
        const patientsID = user.patientsID;
        let patientsData = []
        for (let i = 0; i < patientsID.length; i++) {
            const patient = await Patient.findOne( {patientID: patientsID[i]} )
            if (!patient) {
                return res.status(400).send("Patient not found");
            }
            patientsData.push({
                name: patient.name,
                patientID: patient.patientID,
                diagnosisID : patient.diagnosisID
            })
        }
        res.send(patientsData);
    }
    catch (err) {
        console.log(err);
        res.send("Server: Getting patients failed");
    }
}

const mongoose = require('mongoose');
require('dotenv').config()



// set up mongoDBUrl here
const mongoDBUrl = process.env.MONGODB_URL;
console.log(mongoDBUrl);

if (!mongoDBUrl) {
    console.log("MONGODB_URL is not set.");
} 


const connectToDB = async () => {
    try {
        await mongoose.connect(mongoDBUrl, { dbName: "fyp" });
        console.log("-----Connected to MongoDB-----");
        console.log("-----Connected to MongoDB-----");
        console.log("-----Connected to MongoDB-----");
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectToDB;
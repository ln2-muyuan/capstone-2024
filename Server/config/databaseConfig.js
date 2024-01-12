const mongoose = require('mongoose');

const mongoDBUrl = "mongodb+srv://ln2:sgIuaEK3l0QMd9mD@cluster0.6cg0sja.mongodb.net/";

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
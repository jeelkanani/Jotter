// local mongodb database
const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/jotter";

const connectToMongo = ()=>{
        mongoose.connect(mongoURI, ()=>{
                console.log("Connect to mongo Succesfully");
        })
}

module.exports = connectToMongo;
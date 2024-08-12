const mongoose = require('mongoose');

const db_connect = () => {
    mongoose.connect('mongodb://localhost:27017/auth')
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error: ", err));
};

module.exports =  db_connect() ;

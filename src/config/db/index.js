const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://mdquang25_mongodb:ENA7RghS0Q2yfL0J@cluster0.twexh1b.mongodb.net/?retryWrites=true&w=majority');
        console.log('connect successfully!');
    } catch (error) {
        console.log('failed to connect to database!');
    }
}

module.exports = { connect };
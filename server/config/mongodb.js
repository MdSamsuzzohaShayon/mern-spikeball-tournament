const mongoose = require('mongoose');

const connectDB = async ()=>{
    // Or:
    try {
      await mongoose.connect(process.env.MONGO_LOCAL_URI);
    } catch (error) {
      console.log(error);
    }
}

module.exports = connectDB;
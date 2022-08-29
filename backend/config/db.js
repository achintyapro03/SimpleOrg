const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log('gone');
    console.log(`Error !! : ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;

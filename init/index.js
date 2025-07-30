const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing  = require('../models/listing.js');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

const initDB = async () => {
await Listing.deleteMany({});
initData.data =initData.data.map((obj)=>({...obj , owner:"6883cc4462c7dc0c7cc0749b"}));
await Listing.insertMany(initData.data);
console.log("data was initialized");
};

initDB();


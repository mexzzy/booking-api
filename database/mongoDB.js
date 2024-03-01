const mongoose = require("mongoose");
const { mongoURL } = require("../config.js");

const database = () => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("mongoDb is connected");
    })
    .catch((error) => {
      console.log("Error connecting to mongoDB ", error);
    });
};

module.exports = database;

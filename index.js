const { port } = require("./config.js");
const mongoose = require("mongoose");
const express = require("express");
const database = require("./database/mongoDB.js");
const bodyParser = require("body-parser");
const auth = require("./routes/auth.js");
const booking = require("./routes/booking.js");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1", auth);
app.use("/v1", booking);

database();

app.listen(port, () =>
  console.log(`server is running on port: http://localhost:${port}`)
);

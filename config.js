const dotenv = require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const port = PORT;
const mongoURL = MONGO_DB_URL;

module.exports = { port, mongoURL };

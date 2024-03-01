const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const bookAppointment = require("../controllers/booking/bookAppointment");
const userAppointments = require("../controllers/booking/userAppointments");
const deleteAppointment = require("../controllers/booking/deleteAppointment");

const router = express.Router();

router.post("/book", checkAuth, bookAppointment);
router.get("/appointments", checkAuth, userAppointments);
router.delete("/appointments/:appointmentId", checkAuth, deleteAppointment);

module.exports = router;

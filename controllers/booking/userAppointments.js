const Booking = require("../../models/bookingSchema.js");
const getId = require("../../utils/getId.js");

const userAppointments = async (req, res) => {
  try {
    const id = await getId(req, res);
    const user = await Booking.find({ userId: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const appoint = user.map((index) => ({
      id: index._id,
      date: index.date,
      time: index.time,
      style: index.haircutType,
    }));

    res.status(200).json(appoint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userAppointments;

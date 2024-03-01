const Booking = require("../../models/bookingSchema.js");

const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    await Booking.findByIdAndDelete(appointmentId);

    res.status(200).json({
      message: "Appointment deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteAppointment;



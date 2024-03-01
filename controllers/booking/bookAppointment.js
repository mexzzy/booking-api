const Booking = require("../../models/bookingSchema");
const User = require("../../models/userSchema.js");
const getId = require("../../utils/getId.js");

const bookAppointment = async (req, res) => {
  try {
    const id = await getId(req, res);
    const { date, time, haircutType } = req.body;

    const data = {
      date,
      time,
    };

    const isTimeAvailable = await isAppointmentTimeAvailable(data);

    if (isTimeAvailable.exist === false) {
      const suggestedTime = await suggestAlternativeTime(isTimeAvailable.time);
      return res.status(400).json({
        message: `Selected time is not available. Consider booking at ${suggestedTime}.`,
      });
    }

    const user = await User.findById(id);

    const newAppointment = {
      userId: user._id,
      name: user.username,
      date,
      time,
      haircutType,
      bookedAt: new Date(),
    };

    const schedule = await Booking.create(newAppointment);

    const response = {
      message: "appointment created",
      id: schedule._id,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const isAppointmentTimeAvailable = async (data) => {
  try {
    const existingAppointment = await Booking.findOne({
      date: data.date,
      time: data.time,
    });

    const exist = !existingAppointment;

    const lastAppointedTime = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(1);

    let time;
    if (lastAppointedTime.length > 0) {
      time = lastAppointedTime[0].time;
    }

    return {
      exist,
      time,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const suggestAlternativeTime = async (data) => {
  try {
    const nextAvailableHour = await getNextAvailableHour(data);
    return nextAvailableHour;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getNextAvailableHour = async (time) => {
  try {
    const currentDate = new Date();
    const dateString = `${
      currentDate.toISOString().split("T")[0]
    }T${time}:00.000Z`;

    const currentTime = new Date(dateString);

    if (isNaN(currentTime.getTime())) {
      throw new Error("Invalid date before adding 1 hour");
    }

    const newTime = new Date(currentTime.getTime() + 60);

    if (isNaN(newTime.getTime())) {
      throw new Error("Invalid date after adding 1 hour");
    }

    const formattedTime = newTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    console.log("Suggested Alternative Time:", formattedTime);
    return formattedTime;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = bookAppointment;

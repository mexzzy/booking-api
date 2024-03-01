const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    userId: String,
    name: String,
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    haircutType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookSchema);
module.exports = Booking;

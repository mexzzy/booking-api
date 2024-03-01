const User = require("../../models/userSchema.js");

const updateUsername = async (req, res) => {
  const { userId } = req.params;
  const { newUsername } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = newUsername;

    await user.save();

    return res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateUsername;

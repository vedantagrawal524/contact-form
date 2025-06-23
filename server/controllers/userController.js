const User = require("../model/User");

const createNewUser = async (req, res) => {
  const { firstName, lastName, email, queryType, message, consent } = req.body;

  // Basic validation
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !queryType ||
    !message?.trim() ||
    consent !== true
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required with consent" });
  }

  try {
    const result = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      queryType,
      message: message.trim(),
      consent,
    });

    res
      .status(201)
      .json({ message: "User contact form submitted successfully" });
  } catch (err) {
    console.error("Error saving contact form:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createNewUser,
};

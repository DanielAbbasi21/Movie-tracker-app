const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = new User({ username, email, password });
    const savedUser = await user.save();

    res.status(201).json(savedUser);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { createUser, getUsers };
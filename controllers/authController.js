const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ email: req.body.email, password: hashedPassword });
    res.send("✅ User registered!");
  } catch (err) {
    res.status(500).send("❌ Registration failed");
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = user;
      res.send("✅ Login successful!");
    } else {
      res.send("❌ Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("❌ Login failed");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.send("✅ Logged out");
  });
};

const bcrypt = require("bcrypt");
const User = require('../models/userDetail')
//USER REGISTER
exports.userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: "user", 
      });
      await user.save();
      res.json({ status: "ok", message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Registration failed" });
    }
  };

  //USER LOGIN
  exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).json({ status: "ok", message: " User Login successful" });
      } else {
        res.json({ status: "error", error: "Invalid Password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Login failed" });
    }
  };


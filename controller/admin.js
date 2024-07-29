const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const JWT_SECRET = "secretkey"; //env
const JWT_SECRET = process.env.JWT_SECRET;
const nodemailer = require('nodemailer')

const User = require('../models/userDetail')

//ADMIN LOGIN
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    if (await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign(
        { email: admin.email, role: admin.role }, JWT_SECRET
      )
      res.status(201).json({ status: "ok", data: token });
    } else {
      res.json({ status: "error", error: "Invalid Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

//ADMIN REGISTER
exports.adminRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin", 
    });
    await admin.save();
    res.json({ status: "ok", message: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};


//TRANSPORTER ETHEREAL
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'brook.swift@ethereal.email',
      pass: 'hTCPGEYXuNA5HGhkTH'
  }
});

//FOROT ADMIN PASSWORD
exports.forgotAdminPassword = async(req, res) => {
  const {email} = req.body
  try{
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found with this email' });
    }

    // Generate a reset token using jwt.sign (include admin ID and role) //<---
    const resetToken = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { 
      expiresIn: '2h'
    });

    admin.resetPasswordToken = resetToken;
    await admin.save();

    const resetUrl = `http://localhost:3400/reset-password/${admin._id}/${resetToken}`

    const mailOptions = {
      from: "brook.swift@ethereal.email",
      to: email,
      subject: "Password Reset Link",
      html: `<p>You requested for a password reset, click <a href="${resetUrl}">here</a> to reset your password</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link sent to your email' });
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}

//RESET ADMIN PASSWORD
exports.resetAdminPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  try {
    const admin = await User.findOne({ 
      _id: id, 
      resetPasswordToken: token, 
      // resetPasswordExpires: { $gt: Date.now() } // Check if token is not expired //? <----------
    });

    if (!admin) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    admin.password = hashedPassword;
    admin.resetPasswordToken = undefined; 
    admin.resetPasswordExpires = undefined; 
    await admin.save();

    res.json({ status: "ok", message: "Password updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
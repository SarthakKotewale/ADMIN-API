const bcrypt = require("bcrypt");
const User = require('../models/userDetail')
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const nodemailer = require('nodemailer')
require('dotenv').config();

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

  //USER LOGIN  --Need to return token for user review 
exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email, role: 'user'});
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (await bcrypt.compare(password, user.password)) {
        //have to generate tokens for review
        const token = jwt.sign({email: user.email, role: user.role}, JWT_SECRET)

        res.status(200).json({ status: "ok", message: " User Login successful", userToken: token});
      } else {
        res.json({ status: "error", error: "Invalid Password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Login failed" });
    }
  };

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'sarthak.k@latitudetechnolabs.org',
        pass: process.env.MAIL_PASS
    }
  });

  //FORGOT USER PASSWORD
  exports.forgotUserPassword = async(req, res) => {
    const {email} = req.body
    try{
      const user = await User.findOne({ email, role: 'user' });
      if (!user) {
        return res.status(404).json({ message: 'User not found with this email' });
      }
  
      const resetToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { 
        expiresIn: '2h'
      });
  
      user.resetPasswordToken = resetToken;
      await user.save();
  
      const resetUrl = `http://localhost:3400/user/resetPassword/${user._id}/${resetToken}`
  
      const mailOptions = {
        from: "sarthak.k@latitudetechnolabs.org",
        to: email,
        subject: " User Password Reset Link",
        html: `<p>You requested for a user password reset, click <a href="${resetUrl}">here</a> to reset your password</p>`,
      };
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: ' User Password reset link sent to your email' });
    }catch(error){
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  }

  //RESET USER PASSWORD
  exports.resetUserPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword } = req.body;
    try {
      const user = await User.findOne({ 
        _id: id, 
        resetPasswordToken: token,
      });
  
      if (!this.resetUserPassword) {
        return res.status(400).json({ error: 'Invalid or expired token.' });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      user.password = hashedPassword;
      user.resetPasswordToken = undefined; 
      await user.save();
  
      res.json({ status: "ok", message: "Password updated successfully" });
  
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Invalid or expired token" });
    }
  };
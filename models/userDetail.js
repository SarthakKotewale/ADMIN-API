const mongoose = require("mongoose");

const userDetailSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  
  //for admin forgot id
  resetPasswordToken: String,
  resetPasswordExpires: Date 
});

module.exports = User = mongoose.model("UserInfo", userDetailSchema);

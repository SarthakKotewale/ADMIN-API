const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");

const {isAdmin} = require('../middleware/auth')

router
  .post("/register", adminController.adminRegister)
  .post("/login", isAdmin, adminController.adminLogin)
  .post('/forgot-password', adminController.forgotAdminPassword)
  .post('/reset-password/:id/:token', adminController.resetAdminPassword)

exports.router = router;

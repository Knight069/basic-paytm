
const express = require("express");
const userRouter = require("./user.js")

const router = express.Router();

app.use("/user", userRouter)

module.exports = router;

//  /api/v1/user

// /api/v1/transaction..
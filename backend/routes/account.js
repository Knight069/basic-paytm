const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

const router = express.Router();

// balacne
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

// transfer
// async function transfer(req) {
router.post("/transfer", authMiddleware, async (req, res) => {
  // using txn in db
  const session = await mongoose.startSession();

  session.startTransaction();
  // fetching body
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
        message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
  await Account.updateOne({ userId: to },{ $inc: { balance: amount } }).session(session);

  //   commit the transaction
  session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

// transfer({
//   userId: "65ac44e10ab2ec750ca666a5",
//   body: {
//     to: "65ac44e40ab2ec750ca666aa",
//     amount: 100,
//   },
// });

// transfer({
//   userId: "65ac44e10ab2ec750ca666a5",
//   body: {
//     to: "65ac44e40ab2ec750ca666aa",
//     amount: 100,
//   },
// });

module.exports = router;

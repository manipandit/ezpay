import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Account } from "../models/account.model.js";
import { toAccountSchema } from "../zod/account.types.js";

export const fetchBalance = async (req, res) => {
  try {
    const userId = req.userId;
    const account = await Account.findOne({ userId });
    if (!account) return res.status(404).json({ message: "Account not found" });

    return res.status(200).json({ balance: account.balance });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error });
  }
};

// while executing transaction use session to ensure that if process fails in middle of transaction then entire transaction is rolled back
export const transferAmount = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { to, amount } = req.body;

    const { success } = toAccountSchema.safeParse(req.body);

    if (!success) return res.status(400).json({ message: "Invalid request" });

    // find the account of sender and check if there is sufficient balance left to do the transaction, if not then abort the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account || amount > account.balance) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "Insufficient Balance", flag: "insufficient" });
    }

    //   find the account of receiver, if not found  then abort the transaction
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Receiver Account Not Found" });
    }

    // if receiver account is found then execute the transaction by debiting the amount from the sender's account and crediting the amount to receiver's account

    // debiting the amount
    await Account.updateOne(
      { userId: req.userId },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);
    // crediting the amount
    await Account.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();

    return res
      .status(200)
      .json({ message: "Transaction Successful", success: true });
  } catch (error) {}
};

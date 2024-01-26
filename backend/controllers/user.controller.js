import { userSchema, updateSchema } from "../zod/user.types.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { Account } from "../models/account.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  try {
    const userInput = userSchema.safeParse(req.body);

    if (!userInput.success)
      return res.status(400).json({ message: "Invalid Inputs" });

    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(411).json({
        message: "User already exists.. login to continue",
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    // create account for user with random balance
    const userId = newUser._id;
    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = await jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      message: "User created successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error, success: false });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    const userPass = existingUser.password;
    const isPasswordCorrect = await bcrypt.compare(password, userPass);
    if (!isPasswordCorrect)
      return res.status(403).json({
        message: "Password incorrect, error while logging in",
        success: false,
        flag: "Incorrect Password",
      });

    const token = await jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({ token: token, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

export const updateInfo = async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);

  if (!success)
    return res
      .status(400)
      .json({ message: "Error while updating information" });

  try {
    await User.updateOne(
      {
        id: req.userId,
      },
      req.body
    );

    return res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
};

export const findUser = async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      $and: [
        {
          _id: { $ne: req.userId }, // Exclude the logged-in user
        },
        {
          $or: [
            {
              firstName: {
                $regex: filter,
              },
            },
            {
              lastName: {
                $regex: filter,
              },
            },
          ],
        },
      ],
    });

    const response = users.map((user) => {
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const currentUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: "user not found" });

    const currentUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };
    return res.status(200).json({ currentUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

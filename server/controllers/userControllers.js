const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(
    async (req, res) => {
        const { name, email, password, pic } = req.body;

        if (!name || !email || !password) {
            res.status(400);

            throw new Error("Please enter all the fields");
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            res.status(400);
            throw new Error("User already exists");
        }

        const newUser = await User.create({
            name,
            email,
            password,
            pic
        })

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                pic: newUser.pic,
                token: generateToken(newUser._id)
            });
        } else {
            res.status(400);
            throw new Error("Failed to create the user, Please try again");
        }
    }
);

const authUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {

            res.status(400);
            throw new Error("Please enter all the fields")
        }
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
    }
)

module.exports = { registerUser , authUser};

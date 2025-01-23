import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import jwt from 'jsonwebtoken';
import UserModel from "../models/User.js";


dotenv.config();
const loginRoute = express.Router();

loginRoute.use(bodyParser.urlencoded({extended: true}));
loginRoute.use(bodyParser.json());


loginRoute.post("/", async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if(!email || !password){
            return res.status(400).json({msg:"Error, please enter the correct email and password"});
        }

        const user = await UserModel.findOne({email: email});
        const verifyPassword = bcrypt.compare(user.password, password);

        if(!user || !verifyPassword){
            return res.json({msg: "Invalid email or password"});
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.SECRET_KEY, {expiresIn: '3hours'});

        return res.json({ token: token });

    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error"});
    }
});

export default loginRoute;
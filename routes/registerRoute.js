import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import express from "express";
import UserModel from "../models/User.js";


const registerRoute = express.Router();

registerRoute.use(bodyParser.urlencoded({extended: true}));


registerRoute.post("/", async(req, res) => {
    const {username, email, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 8);

   try {
    const data = await UserModel.create({
        username: username,
        email: email,
        password: hashPassword
    })

    res.status(201).json({msg:`User created successfully ${data.userId}`, data: data});

   } catch (error) {

        console.log(error);
        res.status(400).json({msg: "All fields are required"});
   }
})

export default registerRoute;
import bodyParser from "body-parser";
import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import authorization from "../middleware/authorization.js";
import UserModel from "../models/User.js";


const userRoute = express.Router();

userRoute.use(bodyParser.urlencoded({extended: true}));

userRoute.get("/", async(req, res) => {
   try {
        const data = await UserModel.find();
        res.json(data);         
   } catch (error) {
        console.log(`An error occured when retrieving users ${error}`);
        res.json({msg: "Error"})
   }
})

userRoute.get("/:userId", async(req, res) => {
    const userId = +req.params.userId;
    try {
        const data = await UserModel.findOne({userId: userId});
        res.json(data);

    } catch (error) {
        console.log(`An error occured when retrieving user id: ${userId} ${error}`);
        res.json({msg:"User not found"})
    }
})


userRoute.patch("/:userId", authenticate, authorization, async(req, res) => {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    try {
        const data = await UserModel.findOneAndUpdate({userId: userId}, {
            username: username,
            email: email,
            password: password
        })

        return res.status(200).json({msg:`User updated successfully ${userId}`});

    } catch (error) {
        return res.status(400).json({msg:`Failed to update user id:${userId}`});
    }
 })

export default userRoute;
import bodyParser from "body-parser";
import express from "express";
import UserModel from "../models/User.js";

const userRoute = express.Router();

userRoute.use(bodyParser.urlencoded({extended: true}));
userRoute.use(bodyParser.json());

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

userRoute.post("/", async(req, res) => {
    const {username, email, password} = req.body;

   try {
    const data = await UserModel.create({
        username: username,
        email: email,
        password: password
    })

    res.status(201).json({msg:`User created successfully ${data.userId}`, data: data});

   } catch (error) {

        console.log(error);
        res.status(400).json({msg: "All fields are required"});
   }
})


userRoute.delete("/:userId", async(req, res) => {
    const userId = +req.params.userId;
    try {
        await UserModel.findOneAndDelete(userId);
        res.status(201).json({msg:`User ${userId} deleted successfully`});

    } catch (error) {
        console.log(error);
        res.status(404).json({msg:`Failed to delete user id:${userId}`});
    }
})

userRoute.patch("/:userId", async(req, res) => {
    const userId = req.params.userId;
    const {username, email, password} = req.body;

    try {
     const data = await UserModel.findOneAndUpdate({userId: userId}, {
         username: username,
         email: email,
         password: password
     })

     res.status(200).json({msg:`User updated successfully ${userId}`, data: data});

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:`Failed to update user id:${userId}`});
    }
 })

export default userRoute;
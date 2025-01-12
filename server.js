import dotenv from "dotenv";
import express from "express";
import connectToDB from "./config/db.js";

const app = express(); 

const port = process.env.port || 3000;

dotenv.config();
connectToDB();


app.listen(port, () => {
    console.log("SERVER CONNECTED TO PORT ", port);
}) 
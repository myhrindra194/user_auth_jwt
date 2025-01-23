import dotenv from "dotenv";
import express from "express";
import connectToDB from "./config/db.js";
import loginRoute from "./routes/loginRoute.js";
import protectedRoute from "./routes/protectedRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express(); 

const port = process.env.port || 3000;

dotenv.config();
connectToDB();


app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/protected", protectedRoute);



app.listen(port, () => {
    console.log("SERVER CONNECTED TO PORT ", port);
});
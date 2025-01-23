import dotenv from "dotenv";
import express from "express";
import connectToDB from "./config/db.js";
import loginRoute from "./routes/loginRoute.js";
import protectedRoute from "./routes/protectedRoute.js";
import registerRoute from "./routes/registerRoute.js";
import userRoute from "./routes/userRoute.js";


dotenv.config();
connectToDB();

const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());


app.use("/users", userRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/protected", protectedRoute);



app.listen(port, () => {
    console.log("SERVER CONNECTED TO PORT ", port);
});
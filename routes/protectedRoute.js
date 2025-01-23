import express from "express";
import jwt from "jsonwebtoken";
import { authenticate, extractBearerToken } from "../middleware/authenticate.js";


const protectedRoute = express.Router();

protectedRoute.get('/', authenticate, (req, res) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Décodage du token
    const decoded = jwt.decode(token, { complete: false })

    return res.json({ content: decoded });
});

export default protectedRoute;
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const extractBearerToken = (headerValue) => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2];
}

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            req.userId = decoded.userId;
            return next()
        }
    })
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//using Jwt_secret from env
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    //checking is the user is logged in or not
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1]; // Bearer tokenstring
    if (!token)
        return res.status(401).json({ message: 'Invalid token format' });
    //decoding email from token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        //next to call next middleware
        next();
    }
    catch (_a) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;

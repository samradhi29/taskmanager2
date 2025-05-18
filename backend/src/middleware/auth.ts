import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: any;
}
//using Jwt_secret from env
const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
 //checking is the user is logged in or not
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Bearer tokenstring
  if (!token) return res.status(401).json({ message: 'Invalid token format' });
//decoding email from token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    //next to call next middleware
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

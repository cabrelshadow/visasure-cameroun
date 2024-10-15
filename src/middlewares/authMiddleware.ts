import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Token is required for authentication' });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; // Assertion de type
   // req.user = decoded; // req.user peut maintenant être de type JwtPayload
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};

export default verifyToken;

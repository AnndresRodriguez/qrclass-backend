import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";


export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    const payload = jwt.verify(token, process.env.SECRET_TOKEN || "SECRET_TOKEN");
    req.body.payload = payload;

    next();


}
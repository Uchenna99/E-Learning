import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/Passport';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

const router = express.Router();

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', 
        { session: false, failureRedirect:'http://localhost:5173'}),
    (req: Request, res: Response) => {
        res.header('Access-Control-Allow-Origin', '*')
        const user = req.user as User;

        // Create a JWT token
        const token = jwt.sign( {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            emailVerified: user.emailVerified,
            role: user.role
        } , process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.status(200).json({token})
      
    }
);



router.get('/logout', (req, res)=>{})

export default router;

// import express, { Request, Response } from "express"
// import passport from "passport";


// const googleRouter = express.Router();


// googleRouter.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// googleRouter.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:5173');
//   });



// googleRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


// // Callback route
// googleRouter.get(
//     '/google/callback',
//     passport.authenticate('google', { session: false }), // No session
//     (req: Request, res: Response) => {
//       const user = req.user; // The user object passed by the Google strategy
//       res.json({ message: 'Login successful', user });
//     }
//   );






// export default googleRouter;







import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/Passport';

const router = express.Router();

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const user = req.user as { id: string; email: string; displayName: string };

        // Create a JWT token
        const token = jwt.sign(user, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        // Respond with the token
        res.json({ token });
    }
);

router.get('/logout', (req, res)=>{})

export default router;

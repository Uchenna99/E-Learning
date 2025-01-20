import express, { Request, Response } from "express"
import passport from "passport";


const googleRouter = express.Router();


googleRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


// Callback route
googleRouter.get(
    '/google/callback',
    passport.authenticate('google', { session: false }), // No session
    (req: Request, res: Response) => {
      const user = req.user; // The user object passed by the Google strategy
      res.json({ message: 'Login successful', user });
    }
  );






export default googleRouter;

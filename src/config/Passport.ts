import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../config/db';
import express from "express"
import dotenv from 'dotenv';
import { GoogleProfile } from 'dtos/GoogleProfile.dto';
import { hashPassword } from '../utils/password.util';

dotenv.config();



passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'http://localhost:3010/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            // Here, you can handle user creation or fetching
            const googleUser = profile as GoogleProfile;

            const findUser = await db.user.findUnique({
                where: { email: googleUser._json.email }
            })
            if (findUser){
                return done( null, findUser );
            }else{
                const newUser = await db.user.create({
                    data: {
                        firstName: googleUser._json.given_name,
                        lastName: googleUser._json.family_name,
                        email: googleUser._json.email,
                        password: await hashPassword('12345678')
                    }
                })
                return done( null, newUser );
            }
            
        }
    )
);


passport.serializeUser((user, done)=>{
    done( null, user );
})

passport.deserializeUser((user: GoogleProfile, done)=>{
    db.user.findFirst({
        where: { email: user._json.email }
    }).then((user)=>{
        done( null, user );
    })
})



export default passport;

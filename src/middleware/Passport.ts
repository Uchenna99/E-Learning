import passport from 'passport';
import dotenv from "dotenv"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user authentication here
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj!);
});

export default passport;


// import dotenv from "dotenv";
// import passport from "passport";
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// dotenv.config();


// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID as string,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     callbackURL: "/auth/google/callback"
//   },
//   (accessToken: string, refreshToken: string, profile: any, done: any)=> {
//     done(null, profile)
//   }
// ));


// passport.serializeUser((user, done)=>{
//     done(null, user);
// })

// passport.deserializeUser((user, done)=>{
//     done( user, null);
// })

// export default passport;
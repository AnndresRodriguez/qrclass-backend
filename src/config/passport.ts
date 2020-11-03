import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { config } from 'dotenv';
config();

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: process.env.GOOGLE_CALLBACK_URL
    },
    function(accessToken:any, refreshToken:any, profile:any, done:any) {
        console.log(profile);
        return done(null, profile)
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
    }
))
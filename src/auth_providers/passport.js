const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // Your Credentials here.
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Credentials here.
            callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
        },
    ),
);

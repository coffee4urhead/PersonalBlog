import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config as dotenvConfig } from "dotenv";
import { blogDb } from "../server.mjs";
import passport from "passport";

dotenvConfig();

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await blogDb.get(id);
        if (!user) {
            return done(new Error("User not found during deserialization"), null);
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

const googleAuthStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://192.168.1.102:3000/google/login/redirect",
        scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            if (!email) {
                return done(new Error("Email not provided by Google"), null);
            }

            const query = {
                selector: { email: profile.emails[0].value },
                limit: 1,
            };

            const result = await blogDb.find(query);

            if (result.docs.length > 0) {
                const user = result.docs[0];
                return done(null, user);
            } else {
                const newUser = {
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: null,
                };

                const createdUser = await blogDb.insert(newUser);
                return done(null, { ...newUser, _id: createdUser.id });
            }
        } catch (error) {
            console.error("Error during Google authentication:", error);
            done(error);
        }
    }
);

export { googleAuthStrategy };

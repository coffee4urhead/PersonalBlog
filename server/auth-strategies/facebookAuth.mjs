import { Strategy as FacebookStrategy } from "passport-facebook";
import { config as dotenvConfig } from "dotenv";
import passport from "passport";
import { blogDb } from "../server.mjs";

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

const facebookAuthStrategy = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3000/facebook/login/redirect",
        profileFields: ["id", "emails", "name", "displayName"],
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            if (!email) {
                return done(new Error("Email not provided by Facebook"), null);
            }

            const query = { selector: { email }, limit: 1 };
            const result = await blogDb.find(query);

            if (result.docs.length > 0) {
                const user = result.docs[0];
                return done(null, user);
            } else {
                const newUser = {
                    username: profile.displayName || `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim(),
                    email,
                    password: null,
                };

                const createdUser = await blogDb.insert(newUser);
                return done(null, { ...newUser, _id: createdUser.id });
            }
        } catch (error) {
            console.error("Error during Facebook authentication:", error);
            done(error);
        }
    }
);

export { facebookAuthStrategy };
import { Strategy as LocalStrategy } from "passport-local";
import { compareToHashedPassword } from "../hashers/passwordHasher.mjs";
import { blogDb } from "../server.mjs";
import passport from "passport";


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

// we should make checks whether the username we are looking for is already created 
// if it is we should prompt the user to type in a new username

const localStrategy = new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
        try {
            const query = {
                selector: { username },
                limit: 1,
            };
            const result = await blogDb.find(query);

            if (result.docs.length === 0) {
                return done(null, false, { message: "Incorrect username." });
            }

            const user = result.docs[0];

            const isPasswordValid = await compareToHashedPassword(password, user.password);
            if (!isPasswordValid) {
                return done(null, false, { message: "Incorrect password." });
            }

            done(null, user);
        } catch (error) {
            console.error("Error during authentication:", error);
            done(error);
        }
    }
);

export { localStrategy };

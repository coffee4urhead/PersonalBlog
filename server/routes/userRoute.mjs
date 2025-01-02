import express from "express";
import passport from "passport";
import { checkSchema, matchedData, validationResult } from "express-validator";
import schemaUser from "../validation-schemas/userValidationSchema.mjs";
import { blogDb } from "../server.mjs";
import { hashPassword } from "../hashers/passwordHasher.mjs";

const userRouter = express.Router();

userRouter.get("/logged", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ loggedIn: true, user: req.user });
    }
    res.json({ loggedIn: false });
});

userRouter.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.redirect("/");
    });
});

userRouter.get("/login/failure", (req, res) => {
    res.status(401).json({ message: "Login failed. Invalid username or password." });
});

userRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/user/logged",
    failureRedirect: "/user/login/failure",
    failureFlash: true
}));

userRouter.post("/create", checkSchema(schemaUser), async (req, res) => {
    const validation = validationResult(req);

    if (validation.isEmpty()) {
        const userData = matchedData(req);

        try {
            const hashedPassword = await hashPassword(userData.password);

            const userObject = {
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
            };

            const response = await blogDb.insert(userObject);

            console.log("User created:", response);
            res.sendStatus(200);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).send("Failed to create user.");
        }
    } else {
        res.json(validation.array());
    }
});

export default userRouter;

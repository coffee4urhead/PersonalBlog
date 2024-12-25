import express from "express";
import { config as dotenvConfig } from "dotenv";

import { checkSchema, matchedData, validationResult } from "express-validator";
import schemaUser from "./validation-schemas/userValidationSchema.mjs";

import passport from "passport";
import { localStrategy } from "./auth-strategies/localUserAuth.mjs";

import { hashPassword } from "./hashers/passwordHasher.mjs";

import cookieParser from "cookie-parser";
import session from "express-session";
import nano from "nano";

dotenvConfig();

const couch = nano({
    url: 'http://127.0.0.1:5984',
    requestDefaults: {
        auth: {
            username: process.env.COUCHDB_USERNAME,
            password: process.env.COUCHDB_PASSWORD,
        }
    }
});
const blogDb = couch.db.use('blog-app');

async function createIndex() {
    try {
        const response = await blogDb.createIndex({
            index: {
                fields: ["username"],
            },
            name: "username-index",
            type: "json",
        });

        console.log("Index created successfully:", response);
    } catch (error) {
        console.error("Error creating index:", error);
    }
}

createIndex();
export { blogDb }

import cors from "cors"

const app = express();

app.use(cookieParser("sivbeivbsvov8uv89sev89se7v89v8esvyse89vys08vds9vdfs89v0df9vdfs09vd09vbdf9"));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: "sivbeivbsvov8uv89sev89se7v89v8esvyse89vys08vds9vdfs89v0df9vdfs09vd09vbdf9",

    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
    }
}))
passport.use(localStrategy);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());



app.get("/user/logged", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ loggedIn: true, user: req.user });
    }
    res.json({ loggedIn: false });
});

app.get("/user/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.redirect("/");
    });
});

app.get("/user/login/failure", (req, res) => {
    res.status(401).json({ message: "Login failed. Invalid username or password." });
});

app.get("/user/login", passport.authenticate("local", {
    successRedirect: "/user/logged",
    failureRedirect: "/user/login/failure",
    failureFlash: true 
}));

app.post("/user/create", checkSchema(schemaUser), async (req, res) => {
    let validation = validationResult(req);

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
        console.log(validation.array());
        res.send("The validation didn't pass");
    }
});

app.get("/", (req, res) => {
    res.send("Hello to the initial page!");
})

app.listen(3000, () => {
    console.log("App listening on port 3000!");
});

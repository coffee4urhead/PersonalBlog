import express from "express";
import { config as dotenvConfig } from "dotenv";

import { checkSchema, matchedData, validationResult } from "express-validator";
import schemaUser from "./validation-schemas/userValidationSchema.mjs";

import passport from "passport";

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
export { blog }

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
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

app.get("/user/logged", (req, res) => {
    const userLoggedIn = req.user ? true : false;
    res.json({ loggedIn: userLoggedIn });
});

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

app.listen(3000, () => {
    console.log("App listening on port 3000!");
});

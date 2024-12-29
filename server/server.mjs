import express from "express";
import { config as dotenvConfig } from "dotenv";

import passport from "passport";
import { localStrategy } from "./auth-strategies/localUserAuth.mjs";
import { googleAuthStrategy } from "./auth-strategies/googleAuth.mjs";
import { facebookAuthStrategy } from "./auth-strategies/facebookAuth.mjs";

import cookieParser from "cookie-parser";
import session from "express-session";
import nano from "nano";

import userRouter from "./routes/userRoute.mjs";
import facebookRouter from "./routes/facebookAuthRoute.mjs";
import googleRouter from "./routes/googleAuthRoute.mjs";

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
        await blogDb.createIndex({
            index: {
                fields: ["username"],
            },
            name: "username-index",
            type: "json",
        });

        await blogDb.createIndex({
            index: {
                fields: ["email"],
            },
            name: "email-index",
            type: "json",
        });

        console.log("Indexes created successfully");
    } catch (error) {
        console.error("Error creating indexes:", error);
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
passport.use(facebookAuthStrategy);
passport.use(localStrategy);
passport.use(googleAuthStrategy);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/google", googleRouter);
app.use("/facebook", facebookRouter);

app.get("/", (req, res) => {
    res.send("Hello to the initial page!");
})

app.listen(3000, () => {
    console.log("App listening on port 3000!");
});

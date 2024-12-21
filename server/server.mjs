import express from "express";

import { checkSchema, matchedData, validationResult } from "express-validator";
import schemaUser from "./validation-schemas/userValidationSchema.mjs";

import cookieParser from "cookie-parser";
import session from "express-session";

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
app.use(cors());
app.use(express.json());

app.get("/user/logged", (req, res) => {
    const userLoggedIn = req.user ? true : false;
    res.json({ loggedIn: userLoggedIn });
});

app.post("/user/create", checkSchema(schemaUser), (req, res) => {
    let validation = validationResult(req);

    if(validation.isEmpty()) {
        console.log(matchedData(req));
        res.sendStatus(200);
    } else {
        console.log(validation.array());
        res.send("The validation didnt pass")
    }

})

app.listen(3000, () => {
    console.log("App listening on port 3000!");
});

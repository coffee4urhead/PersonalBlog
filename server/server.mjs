import express from "express";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/user/logged", (req, res) => {
    const userLoggedIn = req.user ? true : false;
    res.json({ loggedIn: userLoggedIn });
});

app.listen(3000, () => {
    console.log("App listening on port 3000!");
});

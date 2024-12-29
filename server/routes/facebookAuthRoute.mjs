import express from "express";
import passport from "passport";

const facebookRouter = express.Router();

facebookRouter.get(
    "/login/redirect",
    passport.authenticate("facebook", {
      failureRedirect: "/facebook/login/failure",
    }),
    (req, res) => {
      res.status(200).json({ message: "Facebook login successful", user: req.user });
    }
  );
  

facebookRouter.get("/facebook/login/failure", (req, res) => {
    res.status(401).json({ message: "Login failed. Invalid username or email (from Facebook accounts)." });
})

facebookRouter.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.status(200).json({ message: "Successfully logged out" });
    });
});

facebookRouter.get("/login", passport.authenticate("facebook" , {
    successRedirect: "/login/redirect",
    failureRedirect: "/facebook/login/failure",
    failureFlash: true
}));

export default facebookRouter;

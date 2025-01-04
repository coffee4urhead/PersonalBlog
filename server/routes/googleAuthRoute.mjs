import express from "express";
import passport from "passport";

const googleRouter = express.Router();

googleRouter.get(
  "/login/redirect",
  passport.authenticate("google", {
    failureRedirect: "/google/login/failure",
  }),
  (req, res) => {
    const userInfo = JSON.stringify(req.user);
    console.log("User Info:", userInfo);
    const redirectUrl = `myapp://login?user=${encodeURIComponent(userInfo)}`;
    res.redirect(redirectUrl);
  }
);


googleRouter.get("/google/login/failure", (req, res) => {
  res.status(401).json({ message: "Login failed. Invalid username or email (from Google accounts)." });
})

googleRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.status(200).json({ message: "Successfully logged out" });
  });
});

googleRouter.get("/login", passport.authenticate("google", {
  successRedirect: "/login/redirect",
  failureRedirect: "/google/login/failure",
  failureFlash: true
}));

export default googleRouter;

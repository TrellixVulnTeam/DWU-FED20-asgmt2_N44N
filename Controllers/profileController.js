const User = require("../Model/user");

const profileRender = (req, res) => {
    const user = User.findOne({_id: req.user.user._id})
    console.log(user);
    res.render("profile.ejs", { user: req.user }
    ) 
    console.log(req.user);
}

const upgradeSubmit = (req, res) => {
    res.redirect("/profile/upgrade")
}

const logout = (req, res) => {
    res.clearCookie("jwtToken")
    .redirect("/login"); 
}

module.exports = {profileRender, upgradeSubmit, logout};
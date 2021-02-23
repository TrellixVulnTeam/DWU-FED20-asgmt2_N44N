const homeRender = (req, res) => {
    res.render("home.ejs", { user: req.user }
    ) 
}

module.exports = {homeRender};
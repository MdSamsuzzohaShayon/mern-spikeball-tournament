module.exports = {
    ensureAuth: (req, res, next)=>{
        console.log("User exist - ", req.user);
        console.log(req.admin);
        if(req.isAuthenticated()){
            console.log("Authinticated - ");
            return next(); // PASS
        }
        // console.log("Not Authinticated");
        return res.redirect('/api/admin/register'); // RETUTN REDRECT OR RETURN WITH FLASH MESSAGE

    },
    ensureGuast: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/api/admin/dashboard');  // RETURN REDIRECT OR RETURN WITH FLASH MESSAGE
        }
        next(); // PASS

    }
}
const passport = require("passport");
const validator = require("validator")
const User = require('../../models/User')

module.exports = {
    getRegister: (req, res) => {
        res.render("homeowner/register", {validationErrors: false})
    },
    postRegister: (req, res, next) => {    
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const validationErrors = {emailTakenError: false, emailError: false, passwordError: false, confirmError: false};
        
        let errors = []
        // Not a valid email
        if (!validator.isEmail(email)){
            errors.push({msg: 'Please enter a valid email.'})
            validationErrors.emailError = true;
        }
        // Password is not at least 6 characters
        if (!validator.isLength(password, { min:6 })){
            errors.push({msg: 'Password needs to be at least 6 characters.'})
            validationErrors.passwordError = true;
        }

        // Does password match the password confirmation
        if (!validator.equals(confirmPassword, req.body.password)){
            errors.push({msg: 'Password and Confirm Password need to match.'})
            validationErrors.confirmError = true;
        }

        if (Object.values(validationErrors).indexOf(true) > -1) {
            req.flash("errors", errors)
            res.render('homeowner/register', {
                validationErrors,
                firstName,
                lastName, 
                email, 
                password,
                confirmPassword, 
            });
        }else {
            const user = new User({firstName, lastName, email, password})
            User.findOne({email: email}, (err, existingUser) => {
                if(err){
                    return next(err)
                }
                if(existingUser){
                    validationErrors.emailTakenError = true;
                    res.render('homeowner/register', {
                        validationErrors,
                        firstName,
                        lastName, 
                        email, 
                        password,
                        confirmPassword, 
                    });
                }else{
                    user.save(err => {
                        if(err){
                            return next(err)
                        }
                        req.logIn(user, (err) => {
                            if (err) {
                                return next(err);
                            }
                            res.redirect('/');
                        })
                    })
                }
            })
        }
    },
    getLogin: (req, res) => {
        res.render("homeowner/login", {validationErrors: false})
    },
    postLogin: (req, res, next) => {
        const validationErrors = {emailError: false, passwordError: false}
        const { email, password} = req.body

        let errors = []
        // Not a valid email
        if (!validator.isEmail(email)){
            errors.push({msg: 'Please enter a valid email.'})
            validationErrors.emailError = true
        }
        // Password is not at least 6 characters
        if (!validator.isLength(password, { min:6 })){
            errors.push({msg: 'Password needs to be at least 6 characters.'})
            validationErrors.passwordError = true;
        }

        if (Object.values(validationErrors).indexOf(true) > -1) {
            req.flash("errors", errors)
            res.render('homeowner/login', {
                validationErrors,
                email: req.body.email
            })
        }else {
            passport.authenticate("local", (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.flash("errors", info);
                    return res.redirect("/login");
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    req.flash("success", { msg: "Success! You are logged in." });
                    res.redirect(req.session.returnTo || "/");
                });
            })(req, res, next);
        }
    },
    getLogout: (req, res, next) => {
        req.logout( err => {
            if (err) { return next(err) }
        })
        req.session.user = null
        req.session.save(function (err) {
          if (err) next(err)

          req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
          })
        })
    },
}
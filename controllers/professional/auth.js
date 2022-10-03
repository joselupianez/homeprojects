const passport = require("passport")
const validator = require("validator")
const cloudinary = require("../../middleware/cloudinary")
const User = require('../../models/User')

module.exports = {
    getRegister: (req, res) => {
        res.render("professional/register", {layout: './layouts/pro', validationErrors: false})
    },
    postRegister: async (req, res, next) => {    
        const { firstName, lastName, companyName, companyPhone, email, password, confirmPassword } = req.body;
        const validationErrors = {emailTakenError: false, emailError: false, phoneError: false, passwordError: false, confirmError: false};
        // Not a valid email
        if (!validator.isEmail(email))
            validationErrors.emailError = true;
        // Password is not at least 6 characters
        if (!validator.isLength(password, { min:6 }))
            validationErrors.passwordError = true;
        // Does password match the password confirmation
        if (!validator.equals(confirmPassword, req.body.password))
            validationErrors.confirmError = true;
        // Not a valid phone number
        if (!validator.isMobilePhone(companyPhone))
            validationErrors.phoneError = true;

        if (Object.values(validationErrors).indexOf(true) > -1) {
            res.render('professional/register', {
                layout: './layouts/pro',
                validationErrors,
                firstName,
                lastName, 
                companyName, 
                companyPhone,
                email, 
                password,
                confirmPassword, 
            });
        }else {

            const logoUpload = req.file ? await cloudinary.uploader.upload(req.file.path) : 'None'

            const user = new User({firstName, lastName, email, password, isProfessional: true, company: {companyName, logo: logoUpload.secure_url, cloudinaryId: logoUpload.public_id, phoneNumber: companyPhone} })

            User.findOne({email: email}, (err, existingUser) => {
                if(err){
                    return next(err)
                }
                if(existingUser){
                    validationErrors.emailTakenError = true;
                    res.render('professional/register', {
                        layout: './layouts/pro',
                        validationErrors,
                        firstName,
                        lastName, 
                        companyName, 
                        companyPhone,
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
                            res.redirect('/pro');
                        })
                    })
                }
            })
        }
    },
    getLogin: (req, res) => {
        res.render("professional/login", {layout: './layouts/pro', validationErrors: false})
    },
    postLogin: (req, res, next) => {
        const validationErrors = {emailError: false, passwordError: false}
        const { email, password} = req.body

        // Not a valid email
        if (!validator.isEmail(email))
            validationErrors.emailError = true;
        // Password is not at least 6 characters
        if (!validator.isLength(password, { min:6 }))
            validationErrors.passwordError = true;

        if (Object.values(validationErrors).indexOf(true) > -1) {
            res.render('professional/login', {
                layout: './layouts/pro',
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
                    return res.redirect("/professional/login");
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    req.flash("success", { msg: "Success! You are logged in." });
                    res.redirect(req.session.returnTo || "/pro");
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
            res.redirect('/pro')
          })
        })
    },
}
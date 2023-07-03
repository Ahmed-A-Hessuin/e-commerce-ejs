const authModel = require('../models/authModels')
const validationResult = require('express-validator').validationResult;

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        validationError: req.flash("validationError"),
        isUser: false,
        isAdmin: false,
        pagetitle: 'signup'
    })
}
exports.postSignup = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.createNewUser(req.body.username, req.body.email, req.body.password).then(() => {
            res.redirect('/')
        })
    } else {
        req.flash('validationError', validationResult(req).array())
        res.redirect('/signup')
    }
}


exports.getLogin = (req, res, next) => {
    res.render('login', {
        validationError: req.flash('validationError'),
        isUser: false,
        isAdmin: false,
        pagetitle: 'login'
    })

}
exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.login(req.body.email, req.body.password).then(result => {
            req.session.userId = result.id
            req.session.isAdmin = result.isAdmin
            res.redirect('/')
        })
    } else {
        req.flash('validationError', validationResult(req).array())
        res.redirect('/login')
    }

}


exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
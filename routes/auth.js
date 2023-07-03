const router = require('express').Router()
const check = require('express-validator').check
const bodyParser = require('body-parser')
const authController = require('../controllers/auth')
const authGuard = require('./guards/auth')
router.get('/signup', authGuard.notAuth, authController.getSignup)
router.post('/signup', authGuard.notAuth, bodyParser.urlencoded({ extended: true }),
    check('username').not().isEmpty().withMessage('username is require'),
    check('email').not().isEmpty().withMessage('Email is require').isEmail().withMessage('invalid format'),
    check('password').not().isEmpty().withMessage('Password is require').isLength({ min: 6 }).withMessage('must be more than 6'),
    check('password-repeat').custom((value, { req }) => {
        if (value === req.body.password) return true
        else throw 'passwords dont equel'
    })
    , authController.postSignup)

router.get('/login', authGuard.notAuth, authController.getLogin)
router.post('/login', authGuard.notAuth, bodyParser.urlencoded({ extended: true }),
    check('email').not().isEmpty().withMessage('Email is require').isEmail().withMessage('invalid format'),
    check('password').not().isEmpty().withMessage('Email is require').isLength({ min: 6 }).withMessage('must be more than 6')
    , authController.postLogin)

router.all('/logout', authGuard.isAuth, authController.logout)
module.exports = router
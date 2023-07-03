const router = require('express').Router()
const productController = require('../controllers/product')
const authGuard = require('./guards/auth')
const bodyParser = require('body-parser')
const check = require('express-validator').check
router.get('/', productController.getProduct)
router.get('/:id', productController.getProductById)
router.post('/cart', authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    check('amount').not().isEmpty().withMessage('amount is require').isInt({ min: 1 }).withMessage('amount must be grater than 0')
    , productController.postCart)

module.exports = router
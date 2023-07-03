const router = require('express').Router()
const multer = require('multer')
const check = require('express-validator').check
const bodyParser = require('body-parser')
const adminController = require('../controllers/admin')
const adminGaurd = require('./guards/admin')

router.get('/addProduct', adminGaurd, adminController.getAddProduct)
router.post('/addProduct', adminGaurd, bodyParser.urlencoded({ extended: true }),
    check('name').not().isEmpty().withMessage('name is required'),
    check('price').not().isEmpty().withMessage('price is required'),
    check('description').not().isEmpty().withMessage('description is required'),
    check('category').not().isEmpty().withMessage('category is required'),
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'images')
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname)
            }
        })
    }).single('image'),
    check('image').custom((value, { req }) => {
        if (req.file) return true
        else throw 'image is require'
    })
    , adminController.postAddProduct)


module.exports = router
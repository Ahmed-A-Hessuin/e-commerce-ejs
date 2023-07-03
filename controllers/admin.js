const validationResult = require('express-validator').validationResult
const adminModel = require('../models/admin')
exports.getAddProduct = (req, res, next) => {
    res.render('addProduct', {
        validationError: req.flash('validationError'),
        isAdmin: true,
        isUser: true,
        pagetitle: 'addProduct'
    })
}

exports.postAddProduct = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        adminModel.createNewProduct({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        }).then(() => {
            res.redirect('/')
        }).catch((err) => {
            console.log(req.file);
        })
    } else {
        req.flash('validationError', validationResult(req).array())
        res.redirect('/admin/addproduct')
    }
}

const productsModels = require('../models/productsModels')
exports.getHome = (req, res, next) => {
    let category = req.query.category
    let categoryValidation = ['cars', 'phones', 'clothes', 'laptops', 'test']
    if (category && categoryValidation.includes(category)) {
        productsModels.getProductsByCategory(category).then(products => {
            res.render('index', {
                products: products,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                validationError: req.flash('validationError')[0],
                pagetitle: 'Home'
            })
        }
        )
    } else {
        productsModels.getAllProducts().then(products => {
            res.render('index', {
                products: products,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                validationError: req.flash('validationError')[0],
                pagetitle: 'Home'
            })
        })
    }
}
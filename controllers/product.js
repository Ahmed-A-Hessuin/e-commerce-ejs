const productsModels = require('../models/productsModels')
exports.getProductById = (req, res, next) => {
    let id = req.params.id
    productsModels.getProductById(id).then(product => {
        res.render('product', {
            product: product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationError')[0],
            pagetitle: 'product',
        })
    })
}

exports.getProduct = (req, res, next) => {
    res.redirect('/')
}

exports.postCart = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        productsModels.createNewCart({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            Timestamp: Date.now()
        }).then(() => {
            res.redirect('/cart')
        }).catch((err) => {
            res.redirect('/error')
        })
    } else {
        req.flash('validationError', validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}
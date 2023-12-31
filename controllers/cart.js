const cartModel = require('../models/cartModel')
const validationResult = require('express-validator').validationResult

exports.getCart = (req, res, next) => {
    cartModel.getItemsByUser(req.session.userId).then(items => {
        res.render('cart', {
            isUser: true,
            isAdmin: req.session.isAdmin,
            items: items,
            validationError: req.flash('validationError')[0],
            pagetitle: 'cart'

        }).catch(err => console.log(err))
    })
}

exports.postCart = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.createNewCart({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            Timestamp: Date.now()
        }).then(() => {
            res.redirect('/cart')
        }).catch((err) => {
            console.log(err);
        })
    } else {
        req.flash('validationError', validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.postSave = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.editItem(req.body.cartId, {
            amount: req.body.amount,
            Timestamp: Date.now()
        }).then(() => {
            res.redirect('/cart')
        }).catch((err) => {
            console.log(err);
        })
    } else {
        req.flash('validationError', validationResult(req).array())
        res.redirect('/cart')
    }
}

exports.postDelete = (req, res, next) => {
    cartModel.deleteItem(req.body.cartId).then(() => {
        res.redirect('/cart')
    }).catch(err => console.log(err))
}

exports.deleteAll = (req, res, next) => {
    cartModel.deleteAll().then(() => {
        res.redirect('/cart')
    }).catch(err => console.log(err))
}
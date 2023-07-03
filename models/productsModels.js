const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/onlineShop"

const schema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String
});
const Product = mongoose.model('product', schema);



exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.find({})
            }).then(products => {
                mongoose.disconnect()
                resolve(products)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.getProductsByCategory = (category) => {  // let category = req.query.category
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.find({ category: category })
            }).then(products => {
                mongoose.disconnect()
                resolve(products)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.getProductById = (id) => {  // id = req.params.id
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.findById(id)
            }).then(product => {
                mongoose.disconnect()
                resolve(product)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.createNewCart = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let item = new cartItem(data)
                return item.save()
            }).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                reject(err)
            })
    })
}
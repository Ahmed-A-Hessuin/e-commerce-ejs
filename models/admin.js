const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/onlineShop"

const schema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String
});
const addProduct = mongoose.model('addproduct', schema);

exports.createNewProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let item = new addProduct(data)
                return item.save()
            }).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                reject(err)
            })
    })
}
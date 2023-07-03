const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/onlineShop"

const schema = new mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    productId: String,
    userId: String,
    Timestamp: Number
});

const cartItem = mongoose.model('cart', schema);

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
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return cartItem.find({ userId: userId }, {}, { sort: { Timestamp: 1 } })
            }).then((items) => {
                mongoose.disconnect()
                resolve(items)
            }).catch((err) => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.editItem = (id, newDate) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return cartItem.updateOne({ _id: id }, newDate)
            }).then((item) => {
                mongoose.disconnect()
                resolve(item)
            }).catch((err) => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return cartItem.findByIdAndDelete(id)
            }).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch((err) => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.deleteAll = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return cartItem.deleteMany()
            }).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch((err) => {
                mongoose.disconnect()
                reject(err)
            })
    })
}



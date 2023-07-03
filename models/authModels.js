const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const DB_URL = "mongodb://localhost:27017/onlineShop"

const schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
    }
});
const User = mongoose.model('user', schema);


exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return User.findOne({ email: email })
            }).then(user => {
                if (user) {
                    mongoose.disconnect()
                    reject('email is use')
                } else {
                    return bcrypt.hash(password, 10)
                }
            }).then(hashPassword => {
                let user = new User({
                    username: username,
                    email: email,
                    password: hashPassword
                })
                return user.save()
            }).then(() => {
                mongoose.disconnect()
                resolve('email is created')
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
};

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return User.findOne({ email: email })
            }).then(user => {
                if (!user) {
                    mongoose.disconnect()
                    reject('there is no email matches this email')
                } else {
                    bcrypt.compare(password, user.password).then(same => {
                        if (!same) {
                            mongoose.disconnect()
                            reject('Password is incorrect')
                        }
                        else {
                            mongoose.disconnect()
                            resolve({
                                id: user._id,
                                isAdmin: user.isAdmin
                            })
                        }
                    })
                }
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}



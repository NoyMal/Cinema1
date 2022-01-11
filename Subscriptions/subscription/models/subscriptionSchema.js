// const { ObjectID } = require('bson')
const mongoose = require ('mongoose')
const appSchema = mongoose.Schema

const subscriptionsSchema = new appSchema({
    memberId: String,
    movies: [{
        movieId: String,
        date: String
    }]
})

module.exports= mongoose.model('subscriptions', subscriptionsSchema)
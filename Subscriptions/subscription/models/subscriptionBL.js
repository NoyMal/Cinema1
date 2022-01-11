const { resolve } = require('path')
const Subscription = require('./subscriptionSchema')


const getAllSubscriptions = () => {
    return new Promise((resolve, reject) => {
        Subscription.find({}, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}


const getSubscriptionById = (subscriptionId) =>{
    return new Promise((resolve, reject) =>{
        Subscription.findById(subscriptionId,(err, data) =>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}


const addSubscription = (newSubscription) => {
    return new Promise((resolve, reject) => {
        Subscription.find({memberId: newSubscription.memberId}, (err, data) => {
            if(err) {
                reject(err)
            }else{
                let movie = {movieId: newSubscription.movie.movieId, date: newSubscription.movie.date}

                if(data.length === 0) {
                    let obj = {
                        memberId: newSubscription.memberId,
                        movies: [movie]
                    }
                    let newObj = new Subscription(obj)
                    newObj.save((err) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve("Subscription was created !")
                        }
                    })
                }else if(data.length === 1) {
                    let movies = data[0].movies
                    movies.push(movie)
                    let obj = {
                        memberId: newSubscription.memberId,
                        movies: movies
                    }
                    resolve(updateSubscription(data[0]._id, obj))
                } 
            }
        })
    })
}


const updateSubscription = (id, subscription) => {
    return new Promise((resolve, reject) => {
        let obj = {
        memberId: subscription.memberId,
        movies: subscription.movies
        }
        Subscription.findByIdAndUpdate((id), obj, (err) => {
            if (err){
                reject(err)
            }else{
                resolve(" Subscription was Updated !")
            }
        })
    })
}


const deleteSubscription = (SubscriptionId) =>{
    return new Promise((resolve, reject) => {
        Subscription.findByIdAndDelete(SubscriptionId, (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("Subscription has been deleted")
            }
        })
    })
}

module.exports = {getAllSubscriptions,getSubscriptionById,addSubscription,updateSubscription,deleteSubscription}
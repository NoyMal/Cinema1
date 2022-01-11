const express = require('express')
const appRouter = express.Router()
const subscriptionsBL = require('../models/subscriptionBL')


appRouter.route('/').get(async(req,resp)=>{
    const subscriptions = await subscriptionsBL.getAllSubscriptions()
    return resp.json(subscriptions)
})


appRouter.route('/:id').get(async(req,resp) => {
    const id = req.params.id
    const subscription = await subscriptionsBL.getSubscriptionById(id)
    return resp.json(subscription)
})

appRouter.route('/').post(async(req, resp) => {
    const subscriptionObj = req.body
    const subscription = await subscriptionsBL.addSubscription(subscriptionObj)
    return resp.json(subscription)
})

appRouter.route('/:id').put(async(req, resp) => {
    const id = req.params.id
    const subscriptionObj = req.body
    const result = await subscriptionsBL.updateSubscription(id, subscriptionObj)
    return resp.json(result)
})

appRouter.route('/:id').delete(async(req,resp) => {
    const id = req.params.id
    const result = await subscriptionsBL.deleteSubscription(id)
    return resp.json(result)
})

module.exports = appRouter
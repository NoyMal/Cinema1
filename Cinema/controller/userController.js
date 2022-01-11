const express = require('express')
const UsersBL = require('../models/usersBL.js')
const appRouter = express.Router()



appRouter.route('/').get(async(req,resp)=>{
    const users = await UsersBL.getAllUsers()
    return resp.json(users)
})


appRouter.route('/:id').get(async(req,resp) => {
    const id = req.params.id
    const user = await UsersBL.getUserById(id)
    return resp.json(user)
})

appRouter.route('/').post(async(req, resp) => {
    const userObj = req.body
    const user = await UsersBL.addUser(userObj)
    return resp.json(user)
})

appRouter.route('/:id').put(async(req, resp) => {
    const id = req.params.id
    const userObj = req.body
    const result = await UsersBL.updateUser(id, userObj)
    return resp.json(result)
})

appRouter.route('/:id').delete(async(req,resp) => {
    const id = req.params.id
    const result = await UsersBL.deleteUser(id)
    return resp.json(result)
})

module.exports = appRouter
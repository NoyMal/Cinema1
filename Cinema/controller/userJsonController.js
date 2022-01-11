const express = require('express')
const UsersJsonBL = require('../models/usersJsonBL.js')
const router = express.Router()


//Get All users
router.route('/').get(async(req, resp) => {
    const data = await UsersJsonBL.getAllUsers()
    return resp.json(data)
})


//Get user by id
router.route('/:id').get(async(req, resp) => {
    const id = req.params.id
    const data = await UsersJsonBL.getUserJSONById(id)
    return resp.json(data)
})

//add user
router.route('/').post(async(req, resp) => {
    const newUser = req.body;
    const ans = await UsersJsonBL.addUser(newUser)
    return resp.json(ans)
})

//update user
router.route('/:id').put(async(req, reps) => {
    const id = req.params.id
    const newUser = req.body
    const ans = await UsersJsonBL.updateUser(id ,newUser)
    return reps.json(ans)
})

//delete user
router.route('/:id').delete(async(req, resp) => {
    const id = req.params.id
    const ans = await UsersJsonBL.deleteJSUser(id)
    return resp.json(ans)
})

module.exports = router
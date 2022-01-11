const express = require('express')
const PermissionsBL = require('../models/permissionsBL.js')
const router = express.Router()



//Get All permissions
router.route('/').get(async(req, resp) => {
    const data = await PermissionsBL.getAllPermissions();
    return resp.json(data)
})


//Get permission by id
router.route('/:id').get(async(req, resp) => {
    const id = req.params.id
    const data = await PermissionsBL.getPermissionsById(id)
    return resp.json(data)
})

//add permissions
router.route('/').post(async(req, resp) => {
    const newPermissions = req.body;
    const ans = await PermissionsBL.addPermissions(newPermissions)
    return resp.json(ans)

})

//update Permissions
router.route('/:id').put(async(req, resp) => {
    const id = req.params.id
    const newPermissions = req.body
    const ans = await PermissionsBL.updatePermissions(id, newPermissions)
    return resp.json(ans)

})

//delete Permissions
router.route('/:id').delete(async(req, resp) => {
    const id = req.params.id
    const ans = await PermissionsBL.deletePermissions(id)
    return resp.json(ans)

})


module.exports = router
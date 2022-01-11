const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()


const userController = require('./controller/userController')
const permissionsController = require('./controller/permissionsController')
const userJsonController = require('./controller/userJsonController')



require("./configs/usersDB")


app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())
app.use('/users',userController)
app.use('/permissions',permissionsController)
app.use('/usersJs',userJsonController)

const usersSchema = require("./models/usersSchema");


app.listen(3001,()=>{
    console.log("The server is up");
})
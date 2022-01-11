const mongoose = require ('mongoose')
const appSchema = mongoose.Schema

const usersSchema = new appSchema({
    id: String,
    userName: String,
	password: String
})

module.exports= mongoose.model('users', usersSchema)
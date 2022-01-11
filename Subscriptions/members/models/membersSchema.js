const mongoose = require ('mongoose')
const appSchema = mongoose.Schema

const membersSchema = new appSchema({
    name: String,
	email: String,
	city: String
})

module.exports= mongoose.model('members', membersSchema)
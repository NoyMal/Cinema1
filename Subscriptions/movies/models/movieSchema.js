const mongoose = require ('mongoose')
const appSchema = mongoose.Schema

const moviesSchema = new appSchema({
    name: String,
	genres: [String],
	image: {
		medium: String,
		original: String
	},
	premiered: String
})

module.exports= mongoose.model('movies', moviesSchema)
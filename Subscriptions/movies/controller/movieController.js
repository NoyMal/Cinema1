const express = require('express')
const appRouter = express.Router()
const moviesBL = require('../models/moviesBL')


appRouter.route('/').get(async(req,resp)=>{
    const movies = await moviesBL.getAllMovies()
    return resp.json(movies)
})


appRouter.route('/:id').get(async(req,resp) => {
    const id = req.params.id
    const movie = await moviesBL.getMovieById(id)
    return resp.json(movie)
})

appRouter.route('/').post(async(req, resp) => {
    const movieObj = req.body
    const movie = await moviesBL.addMovie(movieObj)
    return resp.json(movie)
})

appRouter.route('/:id').put(async(req, resp) => {
    const id = req.params.id
    const movieObj = req.body
    const result = await moviesBL.updateMovie(id, movieObj)
    return resp.json(result)
})

appRouter.route('/:id').delete(async(req,resp) => {
    const id = req.params.id
    const result = await moviesBL.deleteMovie(id)
    return resp.json(result)
})

module.exports = appRouter
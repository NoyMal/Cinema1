const { resolve } = require('path')
const Movie = require('./movieSchema')


const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        Movie.find({}, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

const getMovieById = (movieId) =>{
    return new Promise((resolve, reject) =>{
        Movie.findById(movieId,(err, data) =>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

const addMovie = (newMovie) => {
    return new Promise((resolve, reject) => {
        const movie = new Movie({
            name: newMovie.name,
            genres: newMovie.genres,
            image: newMovie.image,
            premiered: newMovie.premiered
         })   
         movie.save((err)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve("Movie was created !")
                }
            })  
    })
}


const updateMovie = (movieId, newMovie) => {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate((movieId),{
            name: newMovie.name,
            genres: newMovie.genres,
            image: newMovie.image,
            premiered: newMovie.premiered
        },(err) =>{
            if(err){
                reject(err)
            }
            else{
                resolve("Movie was updated ! ")
            }
        })
    })
}


const deleteMovie = (movieId) =>{
    return new Promise((resolve, reject) => {
        Movie.findByIdAndDelete(movieId, (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("Movie has ben deleted")
            }
        })
    })
}

module.exports = {getAllMovies,getMovieById,addMovie,updateMovie,deleteMovie}
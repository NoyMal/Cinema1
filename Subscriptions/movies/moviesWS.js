const axios = require('axios')
const moviesBL = require('./models/moviesBL')

const getDataToDB=async()=>{
    moviesData = await axios.get("https://api.tvmaze.com/shows")
    let movieObj;
    moviesData.data.forEach(movie => {
        movieObj={
            name: movie.name,
            genres: movie.genres,
            image: movie.image,
            premiered: movie.premiered
        }
        moviesBL.addMovie(movieObj)
    });
}

module.exports={getDataToDB}
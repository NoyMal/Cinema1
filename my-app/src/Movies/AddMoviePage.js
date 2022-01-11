import React, { useState } from "react";
import MoviesMainPage from "../Movies/MoviesMainPage"
import Utils from "../Utils";

const AddMoviePage = (props) => {


    const [Movie, setMovie] = useState({});
    const [movieLink, setMovieLink] = useState("")


    const addMovie = async () => {

        let newMovie = {
            name: Movie.name,
            genres: Movie.genres,
            image: {
                medium: movieLink,
                original: movieLink
            },
            premiered: Movie.premiered
        }
        await Utils.createMovie(newMovie)

        alert(" The Movie Was Created Successfully ! ")
        props.history.push("/AllMoviesComp")
    }


    const GoToMoviesPage = () => {
        props.history.push("/AllMoviesComp")
    }


    return (
        <div>
            <MoviesMainPage />
            <h2> Add Movie Page </h2><br />

            <h3> Name :</h3>
            <input type="text" onChange={e => setMovie({ ...Movie, name: e.target.value })}></input><br />
            <h3> Genres : </h3>
            <input type="text" onChange={e => setMovie({ ...Movie, genres: e.target.value })}></input><br />

            <h3> Image URL :</h3>
            <input type="text" onChange={e => setMovieLink(e.target.value)}></input><br />
            <h3> Premiered :</h3>
            <input type="text" onChange={e => setMovie({ ...Movie, premiered: e.target.value })}></input><br />
            <br />
            <input type="button" value="Save" onClick={addMovie} />
            <input type="button" value="Cancel" onClick={GoToMoviesPage} />
            <br /><br /><br />

        </div>
    )
};


export default AddMoviePage;

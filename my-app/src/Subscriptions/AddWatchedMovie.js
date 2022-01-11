import React, { useEffect, useState } from 'react';
import Utils from "../Utils"



const AddWatchedMovie = (props) => {


    const [movies, setMovies] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    const [subscription, setSubscription] = useState({});
    const [moviesWatched, setMoviesWatched] = useState([]);

    const [movieName, setMovieName] = useState("");
    const [tempMovie, setTempMovie] = useState({});
    const [inputDate, setInputDate] = useState("");

    const [newSub, setNewSub] = useState({});



    useEffect(async () => {
        setMoviesWatched(props.moviesWatched)
        let moviesDb = await Utils.getMovies()
        setMovies(moviesDb.data);
        let subscriptionsDb = await Utils.getSubscriptions()
        setSubscriptions(subscriptionsDb.data);
    }, [])


    useEffect(() => {
        let selectedMovie = movies.filter((movie) => movie.name === movieName)
        if (selectedMovie.length > 0) {
            setTempMovie(selectedMovie[0])
            let obj = {
                memberId: props.memberId,
                movie: {
                    movieId: tempMovie._id,
                    date: inputDate
                }
            }
            setNewSub(obj)
        }
    }, [movieName, inputDate])


    const addWatchedMovie = (async () => {

        let resp = await Utils.createSubscription(newSub)
        let subs = await Utils.getSubscriptions()
    })


    let dropDown = movies.map((movie, index) => {
        return <option key={index}> {movie.name} </option>
    })


    return (
        <div>
            <h4> Add a new movie </h4>
            <select defaultValue={dropDown[0]} onChange={e => setMovieName(e.target.value)}>
                {dropDown}
            </select><br />
            <input type="date" onChange={e => setInputDate(e.target.value)}></input>
            <br /><br />
            <input type="button" value="Subscribe" onClick={addWatchedMovie} />

        </div>

    )
};


export default AddWatchedMovie;
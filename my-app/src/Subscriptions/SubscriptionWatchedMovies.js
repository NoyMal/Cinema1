import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import Utils from "../Utils"
import AddWatchedMovie from "./AddWatchedMovie"


const SubscriptionWatchedMovies = (props) => {

    const [Show, setShow] = useState(false);

    const [movies, setMovies] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [memberId, setMemberId] = useState("");

    
    useEffect(async ()=>{
        setMemberId(props.memberId);
        let subscriptionsDb = await Utils.getSubscriptions()
        setSubscriptions(subscriptionsDb.data);
        let moviesDb = await Utils.getMovies()
        setMovies(moviesDb.data);
    },[movies])


    let moviesArr = [];
    let filterSubs = subscriptions.filter((item) => item.memberId === memberId)
    if(filterSubs.length > 0){
        moviesArr = filterSubs[0].movies.map((subMovies) =>{
            let correctMovie = {};
            movies.forEach((movie) =>{
                if(subMovies.movieId === movie._id){
                    correctMovie = {name: movie.name, id: movie._id, date: subMovies.date};
                }
            });
            return correctMovie;
        });
    }

    let obj = moviesArr.map((item, key) =>{
        return(
            <li key={key}>
                <Link to={`/AllMoviesComp/${item.id}`}>{item.name}</Link> , {item.date}
            </li>
        )
    });



    return(
        <div>
            <h4> Movies Watched </h4>
            {obj}
            <br/>
            
            <input type="button" value="Subscribe on new movie" onClick={() => setShow(!Show)} />

            <div style={{display: Show ? "block" : "none" }}>
                <AddWatchedMovie moviesWatched={moviesArr} memberId={props.memberId} sub={filterSubs} />
            </div>
            <br/><br/>


        </div>
        
    )
};


export default SubscriptionWatchedMovies;
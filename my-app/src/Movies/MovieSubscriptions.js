import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import Utils from "../Utils"


const MovieSubscriptions = (props) => {


    const [subscriptions, setSubscriptions] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(async ()=>{
        let subscriptionsDb = await Utils.getSubscriptions()
        setSubscriptions(subscriptionsDb.data);
        let membersDb = await Utils.getMembers()
        setMembers(membersDb.data);
    },[])

    let filterSubscriptions = subscriptions.filter((subscription) => {
        let watchedSub;
        subscription.movies.forEach((movie) => {
            if(movie.movieId == props.movieId){
                watchedSub = subscription;
            }       
        });
        return watchedSub;
    })

    let obj = filterSubscriptions.map((sub,key) => {
        let member = members.filter(member => member._id === sub.memberId);
        let index = sub.movies.findIndex((movie) => movie.movieId === props.movieId);
        if(member.length != 0){
            return (
                <li key={key}>
                    <Link to={`/MemberPage/${member[0]._id}`}>{member[0].name}</Link> , {sub.movies[index].date}
                </li>
            )
        }
    });

    if(obj.length === 0){
        obj = <label> None </label>
    }


    
    return(
        <div>
            <h4> Subscriptions watched : </h4>
            {obj}
            
        </div>
        
    )
};


export default MovieSubscriptions;
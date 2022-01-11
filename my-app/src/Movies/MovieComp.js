import React,{useEffect, useState} from 'react';
import MovieSubscriptions from "./MovieSubscriptions"


const MovieComp = (props) => {

    let isAdminCheck = sessionStorage.getItem('Admin')
    let userPermissions = JSON.parse(sessionStorage.getItem('userPermissions'))
    let UpdateMovies = "";
    let DeleteMovies = "";
    if(isAdminCheck === 'true'){UpdateMovies = 'true'}else if(userPermissions.UpdateMovies){UpdateMovies = 'true'}else{UpdateMovies = 'none'}
    if(isAdminCheck === 'true'){DeleteMovies = 'true'}else if(userPermissions.DeleteMovies){DeleteMovies = 'true'}else{DeleteMovies = 'none'}


    let [movieLink,setMovieLink] = useState("")
    let [genresStr,setGenresStr] = useState("")
    
    let [premieredStr,setPremieredStr] = useState("")


    useEffect(()=>{
        let genString = ""
        let Genres = props.data.genres
        for (let i = 0; i < Genres.length; i++) {
            if(genString === ""){
                genString += '"' + Genres[i] 
            }else{
                genString += ',' + Genres[i]  
            }
        }
        genString += '"'
        genString = genString.replaceAll(',', '","')
        setGenresStr(genString)
    })

    useEffect(()=>{
        let tempLink = props.data.image.original
        setMovieLink(tempLink)
        let perObj = props.data.premiered.slice(0,4)
        setPremieredStr(perObj)
    })



    return(
        <div>
            <br/>
            {/* Movie ID : {props.data._id}<br/> */}
            <h3>{props.data.name} , {premieredStr}</h3> 
            Genres : {genresStr} <br/>
            <img width="200" height="200" src={movieLink}></img>
            <br/>
            <input style={{display: `${UpdateMovies}`}} type="button" value="Edit" onClick={ ()=> props.callback(props.data._id)} />
            <input style={{display: `${DeleteMovies}`}} type="button" value="Delete" onClick={ ()=> props.delete(props.data._id)} />
            <br/>
            <MovieSubscriptions movieId={props.data._id} />
            <br/><br/><br/>
                       

        </div>
        
    )
};


export default MovieComp;
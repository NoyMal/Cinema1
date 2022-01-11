import React, { useEffect } from "react";
import UserMainPage from "../Main/UserMainPage"

const MoviesMainPage = (props) => {
   
    let isAdminCheck = sessionStorage.getItem('Admin')
    let userPermissions = JSON.parse(sessionStorage.getItem('userPermissions'))
    // let perObj = {
    //     ViewSubscriptions: userPermissions.ViewSubscriptions,
    //     CreateSubscriptions: userPermissions.CreateSubscriptions,
    //     DeleteSubscriptions: userPermissions.DeleteSubscriptions,
    //     UpdateSubscription: userPermissions.UpdateSubscription,
    //     ViewMovies: userPermissions.ViewMovies,
    //     CreateMovies: userPermissions.CreateMovies,
    //     DeleteMovies: userPermissions.DeleteMovies,
    //     UpdateMovies: userPermissions.UpdateMovies
    // }
    let ViewMovies = "";
    let CreateMovies = "";
    if(isAdminCheck === 'true'){ViewMovies = 'true'}else if(userPermissions.ViewMovies){ViewMovies = 'true'}else{ViewMovies = 'none'}
    if(isAdminCheck === 'true'){CreateMovies = 'true'}else if(userPermissions.CreateMovies){CreateMovies = 'true'}else{CreateMovies = 'none'}

    return(
        <div>
            <UserMainPage />
            <p  className="topnav">
                <a style={{display: `${ViewMovies}`}} href="/AllMoviesComp"> All Movies </a>
                <a style={{display: `${CreateMovies}`}} href="/AddMoviePage"> Add Movie </a>
            </p>
        </div>
    )
};


export default MoviesMainPage;
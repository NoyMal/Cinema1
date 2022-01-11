import React, {useEffect} from "react";
import './Style.css';


const UserMainPage = (props) => {

    let isAdminCheck = sessionStorage.getItem('Admin')
    let isAdmin = 'none';
    if(isAdminCheck === 'true'){isAdmin = 'true'}else(isAdmin = 'none')
    let userPermissions = JSON.parse(sessionStorage.getItem('userPermissions'))
    let Subscriptions = "";
    let Movies = "";
    if(isAdminCheck === 'true'){Subscriptions = 'true'}else if(userPermissions.ViewSubscriptions || userPermissions.CreateSubscriptions){Subscriptions = 'true'}else{Subscriptions = 'none'}
    if(isAdminCheck === 'true'){Movies = 'true'}else if(userPermissions.ViewMovies || userPermissions.CreateMovies){Movies = 'true'}else{Movies = 'none'}


    useEffect(() => {
        let logOutTime = sessionStorage.getItem('userSessionTimeOut')
        if(isAdminCheck === 'false'){
            setTimeout(
                function(){
                    sessionStorage.setItem('Admin' , 'false')
                    sessionStorage.setItem('User' , 'null')
                    sessionStorage.setItem('userSessionTimeOut' , 'null')
                    alert("Your session is over !")
                    props.history.push('/')
            } , logOutTime*1000);   
        }
    },[])



    const LogOut = () => {
        sessionStorage.setItem('Admin' , 'false')
        sessionStorage.setItem('User' , 'null')
        sessionStorage.setItem('userSessionTimeOut' , 'null')
        alert("logged out !")
    }


    return(
        <div>

            <p  className="topnav">
                <a style={{display: `${Movies}`}} href="/MoviesMainPage"> Movies </a>
                <a style={{display: `${Subscriptions}`}} href="/SubscriptionsMainPage"> Subscriptions </a>
                <a style={{display: `${isAdmin}`}} href="/ManageUsersComp"> User Management </a>
                <a href="/" onClick={LogOut}> Log Out </a>
            </p>

        </div>
    )
};


export default UserMainPage;
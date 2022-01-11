import React from "react";
import UserMainPage from "../Main/UserMainPage"


const SubscriptionsMainPage = (props) => {
    
    let isAdminCheck = sessionStorage.getItem('Admin')
    let userPermissions = JSON.parse(sessionStorage.getItem('userPermissions'))
    let ViewSubscriptions = "";
    let CreateSubscriptions = "";
    if(isAdminCheck === 'true'){ViewSubscriptions = 'true'}else if(userPermissions.ViewSubscriptions){ViewSubscriptions = 'true'}else{ViewSubscriptions = 'none'}
    if(isAdminCheck === 'true'){CreateSubscriptions = 'true'}else if(userPermissions.CreateSubscriptions){CreateSubscriptions = 'true'}else{CreateSubscriptions = 'none'}

    return(
        <div>
            <UserMainPage />

            <p  className="topnav">
                <a style={{display: `${ViewSubscriptions}`}} href="/AllMembers ">All Members  </a>
                <a style={{display: `${CreateSubscriptions}`}} href="/AddMemberPage"> Add Member </a>
            </p>
           
        </div>
    )
};


export default SubscriptionsMainPage;
import React from "react";
import '../Main/Style.css';
import UserMainPage from "../Main/UserMainPage"


const ManageUsersComp = () => {

    
    return(
        <div>
            <UserMainPage />
            <p  className="topnav">
                <a href="/UsersPage"> All Users </a>
                <a href="/AddUserPage"> Add User </a>
            </p>
        </div>
    )
};

export default ManageUsersComp;
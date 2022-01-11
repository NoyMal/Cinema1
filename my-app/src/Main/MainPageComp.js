import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import Utils from '../Utils';
import UserMainPage from './UserMainPage'
import CreateAccountComp from '../Login/CreateAccountComp'
import LoginComp from '../Login/LoginComp'
import MoviesMainPage from '../Movies/MoviesMainPage'
import SubscriptionsMainPage from '../Subscriptions/SubscriptionsMainPage'
import ManageUsersComp from '../ManageUsers/ManageUsersComp'
import AddUserPage from '../ManageUsers/AddUserPage'
import UsersPage from '../ManageUsers/UsersPage'
import UserComp from '../ManageUsers/UserComp'
import EditUserPage from '../ManageUsers/EditUserPage'
import AllMoviesComp from '../Movies/AllMoviesComp'
import AddMoviePage from '../Movies/AddMoviePage'
import EditMovie from '../Movies/EditMovie'
import AllMembers from '../Subscriptions/AllMembers'
import MemberComp from '../Subscriptions/MemberComp'
import MemberPage from '../Subscriptions/MemberPage'
import AddMemberPage from '../Subscriptions/AddMemberPage'
import EditMember from '../Subscriptions/EditMember'
import MovieSubscriptions from '../Movies/MovieSubscriptions'
import SubscriptionWatchedMovies from '../Subscriptions/SubscriptionWatchedMovies'



const MainPageComp = (props) => {


    useEffect(async () => {
        let users = await Utils.getUsersDB()
        let adminObj = {
            userName: "1",
            password: "1"
        }
        if (users.data == false) {
            let resp = await Utils.createUserDB(adminObj)
            let users = await Utils.getUsersDB()
            let user = users.data.filter(user => user.userName === "1")
            let id = user[0]._id
            let permissionsObj = {
                id: id,
                ViewSubscriptions: true,
                CreateSubscriptions: true,
                DeleteSubscriptions: true,
                UpdateSubscription: true,
                ViewMovies: true,
                CreateMovies: true,
                DeleteMovies: true,
                UpdateMovies: true
            }
            let permissionsResp = await Utils.createPermissions(permissionsObj)
            let userJsObj = {
                id: id,
                firstName: "Admin",
                lastName: "Admin",
                createdDate: "01/01/2000",
                sessionTimeOut: 100000000000000
            }
            await Utils.createJsUsers(userJsObj)
            alert(userJsObj.firstName)
        }
    }, [])


    return (
        <div class="main">
            <h3> Movies - Subscriptions Web Site </h3>

            <Switch>
                <Route exact path="/" component={LoginComp} />
                <Route path="/CreateAccountComp" component={CreateAccountComp} />
                <Route path="/UserMainPage" component={UserMainPage} />
                <Route path="/MoviesMainPage" component={MoviesMainPage} />
                <Route path="/SubscriptionsMainPage" component={SubscriptionsMainPage} />
                <Route path="/ManageUsersComp" component={ManageUsersComp} />
                <Route path="/AddUserPage" component={AddUserPage} />
                <Route path="/UsersPage" component={UsersPage} />
                <Route path="/user/:id" component={UserComp} />
                <Route path="/EditUserPage/:userName" component={EditUserPage} />
                <Route path="/AllMoviesComp" component={AllMoviesComp} />
                <Route path="/EditMovie/:id" component={EditMovie} />
                <Route path="/AddMoviePage" component={AddMoviePage} />
                <Route path="/AllMembers" component={AllMembers} />
                <Route path="/MemberComp/:id" component={MemberComp} />
                <Route path="/MemberPage/:id" component={MemberPage} />
                <Route path="/EditMember/:id" component={EditMember} />
                <Route path="/AddMemberPage" component={AddMemberPage} />
                <Route path="/MovieSubscriptions/:id" component={MovieSubscriptions} />
                <Route path="/SubscriptionWatchedMovies/:id" component={SubscriptionWatchedMovies} />
            </Switch>

        </div>
    );
};

export default MainPageComp;
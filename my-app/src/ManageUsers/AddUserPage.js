import React, { useState } from "react";
import ManageUsersComp from "../ManageUsers/ManageUsersComp"
import Utils from "../Utils";

const AddUserPage = (props) => {

    const [checkedArr, setCheckedArr] = useState({
        ViewSubscriptions: false,
        CreateSubscriptions: false,
        DeleteSubscriptions: false,
        UpdateSubscription: false,
        ViewMovies: false,
        CreateMovies: false,
        DeleteMovies: false,
        UpdateMovies: false
    });

    const [User, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        sessionTimeOut: 0,
        createdDate: "",
        permissions: []
    });


    const addUser = async () => {
        await Utils.createUserDB({ userName: User.userName, password: "" });
        let resp = await Utils.getUsersDB();
        // console.log(JSON.stringify(resp.data))
        let UserDB = resp.data.filter(item => item.userName === User.userName);
        // console.log(JSON.stringify(UserDB))
        let id = UserDB[0]._id;

        let permissionsJSON = {
            id: id,
            ViewSubscriptions: checkedArr.ViewSubscriptions,
            CreateSubscriptions: checkedArr.CreateSubscriptions,
            DeleteSubscriptions: checkedArr.DeleteSubscriptions,
            UpdateSubscription: checkedArr.UpdateSubscription,
            ViewMovies: checkedArr.ViewMovies,
            CreateMovies: checkedArr.CreateMovies,
            DeleteMovies: checkedArr.DeleteMovies,
            UpdateMovies: checkedArr.UpdateMovies
        };
        await Utils.createPermissions(permissionsJSON)
        let userJSON = {
            id: id,
            firstName: User.firstName,
            lastName: User.lastName,
            sessionTimeOut: User.sessionTimeOut,
            createdDate: User.createdDate
        };

        await Utils.createJsUsers(userJSON)

        alert("The User Was Created Successfully !")
        props.history.push("/UsersPage")
    };

    const GoToUsersPage = () => {
        props.history.push("/UsersPage")
    }

    return (
        <div>
            <ManageUsersComp />
            <h2> Add User Page </h2><br />

            <h3> First Name : </h3>
            <input type="text" onChange={e => setUser({ ...User, firstName: e.target.value })}></input><br />
            <h3> Last Name : </h3>
            <input type="text" onChange={e => setUser({ ...User, lastName: e.target.value })}></input><br />
            <h3> User Name : </h3>
            <input type="text" onChange={e => setUser({ ...User, userName: e.target.value })}></input><br />
            <h3> Session Time Out :</h3>
            <input type="text" onChange={e => setUser({ ...User, sessionTimeOut: e.target.value })}></input><br />
            <h3> Created Date : </h3>
            <input type="text" onChange={e => setUser({ ...User, createdDate: e.target.value })}></input><br />
            <br />
            <table class="pTable">
                <tr>
                    <td>
                        <h3> <input type="checkbox" onChange={(e) => { setCheckedArr({ ...checkedArr, ViewSubscriptions: e.target.checked }) }} ></input> View Subscriptions    </h3> <br />
                        <h3> <input type="checkbox" onChange={(e) => { setCheckedArr({ ...checkedArr, CreateSubscriptions: e.target.checked }) }} ></input>  Create Subscriptions</h3><br />
                        <h3> <input type="checkbox" onChange={(e) => { setCheckedArr({ ...checkedArr, DeleteSubscriptions: e.target.checked }) }} ></input> Delete Subscriptions </h3> <br />
                        <h3> <input type="checkbox" onChange={(e) => { setCheckedArr({ ...checkedArr, UpdateSubscription: e.target.checked }) }} ></input> Update Subscription</h3> <br />
                    </td>
                    <td></td><td></td><td></td>
                    <td>
                        <h3> <input type="checkbox" onChange={(e) => { setCheckedArr({ ...checkedArr, ViewMovies: e.target.checked }) }} ></input> View Movies</h3> <br />
                        <h3> <input type="checkbox" onChange={(e) => { setCheckedArr({ ...checkedArr, CreateMovies: e.target.checked }) }} ></input> Create Movie</h3> <br />
                        <h3> <input type="checkbox" onChange={(e) => { setCheckedArr({ ...checkedArr, DeleteMovies: e.target.checked }) }} ></input> Delete Movie</h3> <br />
                        <h3> <input type="checkbox" onChange={(e) => { setCheckedArr({ ...checkedArr, UpdateMovies: e.target.checked }) }} ></input> Update Movie</h3> <br />
                    </td>
                </tr>
            </table>

            <input type="button" value="Save" onClick={addUser} />
            <input type="button" value="Cancel" onClick={GoToUsersPage} />

        </div>
    )
};


export default AddUserPage;

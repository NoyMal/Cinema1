import React, { useEffect, useState } from 'react';
import UserMainPage from "../Main/UserMainPage";
import Utils from "../Utils";

const EditUserPage = (props) => {

    const [checkedArr, setCheckedArr] = useState({})
    const [user, setUser] = useState({})

    // console.log("props.match.params.userName : " + props.match.params.userName)

    useEffect(() => {

        Utils.getUsersDB().then(usersDb => {


            let userDb = usersDb.data.filter(tempUser => tempUser.userName === props.match.params.userName)

            if (userDb[0]) {
                let id = userDb[0]._id
                Utils.getJsUsers().then(usersJs => {
                    let userJs = usersJs.data.filter(tempJsUser => tempJsUser.id === id)
                    Utils.getPermissions().then(permissionsJs => {

                        let permissionJs = permissionsJs.data.filter(tempPermissionsJs => tempPermissionsJs.id === id)
                        setCheckedArr(permissionJs[0])

                        // console.log(JSON.stringify(checkedArr));
                        // console.log(checkedArr[0].ViewSubscriptions)

                        let userObj = {
                            firstName: userJs[0].firstName,
                            lastName: userJs[0].lastName,
                            userName: userDb[0].userName,
                            sessionTimeOut: userJs[0].sessionTimeOut,
                            createdDate: userJs[0].createdDate
                        }

                        // console.log("userObj: " + JSON.stringify(userObj));
                        setUser(userObj)
                    })
                })
            }

        })

    }, [])


    const editUser = async () => {
        let usersDb = await Utils.getUsersDB()
        let userDb = usersDb.data.filter(tempUser => tempUser.userName === props.match.params.userName)
        let id = userDb[0]._id

        await Utils.updateUserDB(id, { userName: user.userName, password: userDb[0].password })
        let permissionsObj = {
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

        await Utils.updatePermissions(id, permissionsObj)

        let userJs = {
            id: id,
            firstName: user.firstName,
            lastName: user.lastName,
            sessionTimeOut: user.sessionTimeOut,
            createdDate: user.createdDate
        }
        await Utils.updateJsUsers(id, userJs)

        alert(" The User Was Updated Successfully ! ")
        props.history.push("/UsersPage")
    }

    const GoToUsersPage = () => {
        props.history.push("/UsersPage")
    }


    return (

        <div>
            <UserMainPage />

            <h3> Edit User Page </h3><br />
            <h3> First Name : </h3>
            <input type="text" value={user.firstName} onChange={e => setUser({ ...user, firstName: e.target.value })}></input><br />
            <h3> Last Name : </h3>
            <input type="text" value={user.lastName} onChange={e => setUser({ ...user, lastName: e.target.value })}></input><br />
            <h3> User Name : </h3>
            <input type="text" value={props.match.params.userName} onChange={e => setUser({ ...user, userName: e.target.value })}></input><br />
            <h3> Session Time Out :</h3>
            <input type="text" value={user.sessionTimeOut} onChange={e => setUser({ ...user, sessionTimeOut: e.target.value })}></input><br />
            <h3> Created Date : </h3>
            <input type="text" value={user.createdDate} onChange={e => setUser({ ...user, createdDate: e.target.value })}></input><br />
            <br />
            <table class="pTable">
                <tr>
                    <td>
                        <h3> <input type="checkbox" checked={checkedArr.ViewSubscriptions} onChange={(e) => { setCheckedArr({ ...checkedArr, ViewSubscriptions: e.target.checked }) }} /> View Subscriptions </h3>
                        <h3> <input type="checkbox" checked={checkedArr.CreateSubscriptions} onChange={(e) => { setCheckedArr({ ...checkedArr, CreateSubscriptions: e.target.checked }) }} ></input>Create Subscriptions </h3>
                        <h3> <input type="checkbox" checked={checkedArr.DeleteSubscriptions} onChange={(e) => { setCheckedArr({ ...checkedArr, DeleteSubscriptions: e.target.checked }) }} ></input> Delete Subscriptions</h3>
                        <h3> <input type="checkbox" checked={checkedArr.UpdateSubscription} onChange={(e) => { setCheckedArr({ ...checkedArr, UpdateSubscription: e.target.checked }) }} ></input>Update Subscription  </h3>
                    </td>
                    <td></td><td></td>
                    <td>
                        <h3> <input type="checkbox" checked={checkedArr.ViewMovies} onChange={(e) => { setCheckedArr({ ...checkedArr, ViewMovies: e.target.checked }) }} ></input> View Movies</h3>
                        <h3> <input type="checkbox" checked={checkedArr.CreateMovies} onChange={(e) => { setCheckedArr({ ...checkedArr, CreateMovies: e.target.checked }) }} ></input> Create Movie</h3>
                        <h3><input type="checkbox" checked={checkedArr.DeleteMovies} onChange={(e) => { setCheckedArr({ ...checkedArr, DeleteMovies: e.target.checked }) }} ></input> Delete Movie </h3>
                        <h3> <input type="checkbox" checked={checkedArr.UpdateMovies} onChange={(e) => { setCheckedArr({ ...checkedArr, UpdateMovies: e.target.checked }) }} ></input> Update Movie</h3>
                    </td>
                </tr>
            </table><br />

            <input type="button" value="Update" onClick={editUser} />
            <input type="button" value="Cancel" onClick={GoToUsersPage} />

        </div >

    )
};


export default EditUserPage;
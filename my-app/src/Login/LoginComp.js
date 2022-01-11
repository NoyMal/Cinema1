import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../Main/Style.css';


const LoginComp = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [users, setUsers] = useState([])
    const [usersJs, setUsersJs] = useState([])
    const [permissions, setPermissions] = useState([])



    useEffect(async () => {
        let usersResp = await axios.get("http://localhost:3001/users")
        setUsers(usersResp.data)

        let permissionsResp = await axios.get("http://localhost:3001/permissions")
        setPermissions(permissionsResp.data)

        let usersJsResp = await axios.get("http://localhost:3001/usersJs")
        setUsersJs(usersJsResp.data)

    }, [])


    const checkUserInfo = () => {
        let isExist = false
        if (username === "" || password === "") {
            alert("Enter User Name And Password !")
        } else {
            users.map(user => {
                if (user.userName === username) {
                    isExist = true
                    if (user.password === password) {
                        if (user.userName === "1" && user.password === "1") {    // admin
                            sessionStorage.setItem('Admin', true)
                            // set admin preObj
                        }
                        else if (user.userName !== "1") {    // user
                            permissions.map(permission => {
                                if (permission.id === user._id) {
                                    let perObj = {
                                        ViewSubscriptions: permission.ViewSubscriptions,
                                        CreateSubscriptions: permission.CreateSubscriptions,
                                        DeleteSubscriptions: permission.DeleteSubscriptions,
                                        UpdateSubscription: permission.UpdateSubscription,
                                        ViewMovies: permission.ViewMovies,
                                        CreateMovies: permission.CreateMovies,
                                        DeleteMovies: permission.DeleteMovies,
                                        UpdateMovies: permission.UpdateMovies
                                    }
                                    sessionStorage.setItem('userPermissions', JSON.stringify(perObj))

                                    usersJs.map(userJs => {
                                        if (userJs.id === user._id) {
                                            let userSessionTimeOut = userJs.sessionTimeOut
                                            sessionStorage.setItem('userSessionTimeOut', userSessionTimeOut)
                                        }
                                    })
                                }
                            })
                            sessionStorage.setItem('Admin', false)
                            sessionStorage.setItem('User', user.userName)
                        }
                        alert(`Welcome  ${user.userName} !`)
                        props.history.push("/UserMainPage")
                    }
                    else if (user.password === "") {
                        alert("User Does Not Have A Password Yet")
                        alert("Create A User Account")
                    }
                    else if (user.password !== password) {
                        alert("Wrong Password !")
                    }
                }
            })
            if (isExist === false) {
                alert("User Name Does Not Exist !")
            }
        }
    }
    return (
        <div class="loginComp">
            <h1> Login Page </h1><br />
            <h2> User Name :</h2>
            <input type="text" placeholder="Enter user name" onChange={e => setUsername(e.target.value)}></input><br />
            <h2> Password :</h2>
            <input type="text" placeholder="Enter password" onChange={e => setPassword(e.target.value)}></input><br />
            <br /><br />
            <input type="button" value="Login" onClick={checkUserInfo} /><br /><br />
            <Link to="/CreateAccountComp" > Create User Account </Link><br />
        </div>
    )
};

export default LoginComp;

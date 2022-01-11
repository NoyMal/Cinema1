import React, { useEffect, useState } from "react";
import axios from 'axios'

const CreateAccountComp = (props) => {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[users, setUsers] = useState([])

    useEffect(async() => {
        let usersResp = await axios.get("http://localhost:3001/users")
        setUsers(usersResp.data)
    },[])

    const checkUserInput = async() => {
        let id = ""
        let first = false
        let exists = false
        if(username === "" || password === ""){
            alert("Wrong User Name Or Password !")
        }else{
            let checkData = users.map(user =>{
                if(user.userName === username){ //האם שם משתמש קיים
                    exists = true
                    if(user.password === ""){// כניסה ראשונה
                        id = user._id
                        first = true
                        let obj = {
                            userName: username,
                            password: password
                        }
                        let resp = axios.put(`http://localhost:3001/users/${id}`, obj)
                        alert("Welcome !")
                        props.history.push("/UserMainPage")
                    }else if(user.password === password || user.password !== password){// יוזר כבר רשום
                        alert("User Is Already Exists ! ")
                        props.history.push("/")
                    }else if(user.userName === username){
                        exists = false
                    }
                }
            })
            if(exists === false){
                alert("User Name Does Not Exist !")
            }
        }
    }
    return(
        <div>
            <h3>Create An Account</h3><br/>
            User Name : <input type="text" onChange={e => setUsername(e.target.value)}></input><br/>
            Password : <input type="text" onChange={e => setPassword(e.target.value)}></input><br/>
            <br/>
            <input type="button" value="Create" onClick={checkUserInput}/>
            
        </div>
    );
};

export default CreateAccountComp;
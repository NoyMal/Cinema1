import React,{useEffect,useState} from 'react';
import ManageUsersComp from "../ManageUsers/ManageUsersComp"
import Utils from "../Utils"
import UserComp from "./UserComp"

const UsersPage = (props) => {
    let finalUsersData = [];
    const [data,setData] = useState([])

    useEffect(()=>{

        //step 1 - data from db - 2 users - gal .id
            Utils.getUsersDB().then(usersDB=>{
            Utils.getJsUsers().then(respUserJS=>{
            Utils.getPermissions().then(respPerJS=>{

                usersDB.data.forEach( currentDBUser =>{
                    let id = currentDBUser._id;
        
                    let userDetails = respUserJS.data.filter(x=>x.id===id);
                    userDetails=userDetails[0];
        
                    let userPermissions = respPerJS.data.filter(x=>x.id===id);
                    userPermissions=userPermissions[0];
        
                    let obj = {
                        id: currentDBUser._id,
                        userName: currentDBUser.userName,
                        password: currentDBUser.password,
        
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName,
                        sessionTimeOut: userDetails.sessionTimeOut,
                        createdDate: userDetails.createdDate,
                        
                        ViewSubscriptions: userPermissions.ViewSubscriptions,
                        CreateSubscriptions: userPermissions.CreateSubscriptions,
                        DeleteSubscriptions: userPermissions.DeleteSubscriptions,
                        UpdateSubscription: userPermissions.UpdateSubscription,
                        ViewMovies: userPermissions.ViewMovies,
                        CreateMovies: userPermissions.CreateMovies,
                        DeleteMovies: userPermissions.DeleteMovies,
                        UpdateMovies: userPermissions.UpdateMovies
                    }
                    finalUsersData.push(obj)
                })
                setData(finalUsersData)
            })
            })
        })
        
    },[])

    const goToEditPage = (userName)=>{
        props.history.push(`/EditUserPage/${userName}`)
    }

    const DeleteUser = (deleteUserName)=>{
        Utils.getUsersDB().then(usersDb=>{
            let userDb = usersDb.data.filter(tempUser => tempUser.userName === deleteUserName)
            if(userDb[0]){
                
                let id = userDb[0]._id
                Utils.deleteUserDB(id)
                Utils.deleteJsUsers(id)
                Utils.deletePermissions(id)
                alert ("User has been deleted !")
                props.history.push('/ManageUsersComp')
            }
        })
    }

    let items = data.map((user,index)=>{
        return <div key={index}> <UserComp key={index} data={user} callback={(userName) => goToEditPage(userName)} cancle={(deleteUserName) => DeleteUser(deleteUserName)}/></div> 

    })

    return(
        <div>
            <ManageUsersComp />
            <ul>
                {items}
            </ul>
        </div>
    )

}


export default UsersPage;
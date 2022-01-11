import React,{useEffect, useState} from 'react';
import SubscriptionWatchedMovies from './SubscriptionWatchedMovies'

const MmeberComp = (props) => {

    let isAdminCheck = sessionStorage.getItem('Admin')
    let userPermissions = JSON.parse(sessionStorage.getItem('userPermissions'))
    let DeleteSubscriptions = "";
    let UpdateSubscription = "";
    if(isAdminCheck === 'true'){DeleteSubscriptions = 'true'}else if(userPermissions.DeleteSubscriptions){DeleteSubscriptions = 'true'}else{DeleteSubscriptions = 'none'}
    if(isAdminCheck === 'true'){UpdateSubscription = 'true'}else if(userPermissions.UpdateSubscription){UpdateSubscription = 'true'}else{UpdateSubscription = 'none'}




    const [member,setMmeber] = useState({})
    const [res,setRes] = useState(false)

    useEffect(()=>{
        setMmeber(props.data)
    },[res])

    useEffect(()=>{
        setRes(!res)
    },[])

    const refresh = ()=>{
        props.history.push("/SubscriptionsMainPage")
    }

    return(
        <div>
            <br/>

            <h3> {member.name} </h3>
            Email : {member.email} <br/>
            City : {member.city} <br/>
            <br/>
            <input style={{display: `${UpdateSubscription}`}} type="button" value="Edit" onClick={ ()=> props.edit(props.data._id)} />
            <input style={{display: `${DeleteSubscriptions}`}} type="button" value="Delete" onClick={ ()=> props.delete(props.data._id)} />
            <br/>
            <SubscriptionWatchedMovies memberId={member._id} refresh={refresh} />
            <br/><br/>
            
        </div>
    )
};


export default MmeberComp;
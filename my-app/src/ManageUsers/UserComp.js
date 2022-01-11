import React, { useEffect } from 'react';

const UserComp = (props) => {


    useEffect(() => {


    }, [])


    return (
        <div>
            <br />
            <h3> Name : {props.data.firstName} {props.data.lastName}  </h3>
            <h3> User Name : {props.data.userName} </h3>
            <h3> Session Time Out (Minutes) : {props.data.sessionTimeOut}</h3>
            <h3> Created Date :{props.data.createdDate} </h3>
            <h3>Permissions : </h3>
            View Subscriptions : {JSON.stringify(props.data.ViewSubscriptions)}<br />
            Create Subscriptions : {JSON.stringify(props.data.CreateSubscriptions)}<br />
            Delete Subscriptions : {JSON.stringify(props.data.DeleteSubscriptions)}<br />
            Update Subscription : {JSON.stringify(props.data.UpdateSubscription)}<br />
            View Movies : {JSON.stringify(props.data.ViewMovies)}<br />
            Create Movies : {JSON.stringify(props.data.CreateMovies)}<br />
            Delete Movies : {JSON.stringify(props.data.DeleteMovies)}<br />
            Update Movies : {JSON.stringify(props.data.UpdateMovies)}<br /><br />

            <input type="button" value="Edit" onClick={() => props.callback(props.data.userName)} />
            <input type="button" value="Delete" onClick={() => props.cancle(props.data.userName)} />
            <br></br><br></br>
            ====================================
        </div>

    )
};


export default UserComp;
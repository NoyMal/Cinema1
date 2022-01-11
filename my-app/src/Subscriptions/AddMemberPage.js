import React, { useState } from "react";
import SubscriptionsMainPage from "../Subscriptions/SubscriptionsMainPage"
import Utils from "../Utils";

const AddMemberPage = (props) => {


    const [Member, setMember] = useState({});


    const addMember = async () => {

        let newMember = {
            name: Member.name,
            email: Member.email,
            city: Member.city
        }
        await Utils.createMember(newMember)

        alert(" The Member Was Created Successfully ! ")
        props.history.push("/AllMembers")
    }


    const GoToMembersPage = () => {
        props.history.push("/AllMembers")
    }


    return (
        <div>
            <SubscriptionsMainPage />
            <h2> Add Member Page </h2><br />

            <h3> Name :</h3>
            <input type="text" onChange={e => setMember({ ...Member, name: e.target.value })}></input><br />
            <h3> Email :</h3>
            <input type="text" onChange={e => setMember({ ...Member, email: e.target.value })}></input><br />
            <h3> City :</h3>
            <input type="text" onChange={e => setMember({ ...Member, city: e.target.value })}></input><br />
            <br /><br />

            <input type="button" value="Save" onClick={addMember} />
            <input type="button" value="Cancel" onClick={GoToMembersPage} />

        </div>
    )
};


export default AddMemberPage;

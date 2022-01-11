import React,{useEffect,useState} from 'react';
import SubscriptionsMainPage from "./SubscriptionsMainPage"
import Utils from "../Utils";

const EditMember = (props) => {

    const [member, setMember] = useState({})
    const [memberName, setMemberName] = useState("")


    useEffect(()=>{
        let id = props.match.params.id
        Utils.getMemberById(id).then(memberDb =>{
            setMember(memberDb.data)
            setMemberName(memberDb.data.name)
        })
    },[])
        

    const editMember = async () => {
        let id =  props.match.params.id
        let newMember = {
            name: member.name,
            email: member.email,
            city: member.city
        }
        await Utils.updateMember(id, newMember)
        alert(" The Member Was Updated Successfully ! ")
        props.history.push("/AllMembers")
    }

    const GoToMembersPage = () => {
        props.history.push("/AllMembers")
    }

    return(

        <div>
            <SubscriptionsMainPage />

            <h3> Edit Member :  {memberName} </h3>
            Name : <input type="text" value={member.name} onChange={e => setMember({...member, name: e.target.value})}></input><br/>
            Email : <input type="text" value={member.email} onChange={e => setMember({...member, email: e.target.value})}></input><br/>
            City : <input type="text" value={member.city} onChange={e => setMember({...member, city: e.target.value})}></input><br/>
            <br/><br/>

            <input type="button" value="Update" onClick = {editMember}/>
            <input type="button" value="Cancel" onClick = {GoToMembersPage}/>

            <br/><br/><br/><br/>

        </div>
        
    )
};


export default EditMember ;
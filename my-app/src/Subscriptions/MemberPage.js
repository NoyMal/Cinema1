import React,{useEffect, useState} from 'react';
import Utils from "../Utils"

const MemberPage = (props) => {

    const [member,setMmeber] = useState({})



    useEffect(async ()=>{
        let memberDb = await Utils.getMemberById(props.match.params.id)
        setMmeber(memberDb.data)
    },[])


    const back = () => {
        props.history.push("/AllMoviesComp")
    }

    return(
        <div>
            <br/>

            <h2> {member.name} </h2>
            Email : {member.email} <br/><br/>
            City : {member.city} <br/><br/>
            <br/>
            <input type="button" value="Back" onClick={back} />
            <br/><br/><br/>
            
        </div>
    )
};


export default MemberPage;
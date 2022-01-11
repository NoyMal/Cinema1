import React,{useEffect,useState} from 'react';
import SubscriptionsMainPage from "./SubscriptionsMainPage"
import Utils from "../Utils"
import MmeberComp from "./MemberComp"

const AllMembers = (props) => {

    const [members,setMembers] = useState([])
    const [deleteFun,setDeleteFun] = useState("")

    useEffect(()=>{
        Utils.getMembers().then(membersDb =>{
            setMembers(membersDb.data)
            setDeleteFun(false)
        })
    },[deleteFun])


    const goToEditMember = (memberId)=>{
        props.history.push(`/EditMember/${memberId}`)
    }


    const DeleteMember = (IdToDelete)=>{
        Utils.getMemberById(IdToDelete).then(memberDb =>{
            let memberName =   memberDb.data.name
            alert (`${memberName} has been deleted !`)
            Utils.deleteMember(IdToDelete)
            setDeleteFun(true)
            props.history.push('/SubscriptionsMainPage')
        })
    }
    

    let items = members.map((member,index)=>{
        return <div key={index}> <MmeberComp key={index} data={member} edit={(memberId) => goToEditMember(memberId)} delete={(IdToDelete) => DeleteMember(IdToDelete)} /></div> 
    })


    return(
        <div>
            <SubscriptionsMainPage />
            <ul>
                
                {items}

            </ul>
        </div>
    )

}


export default AllMembers;
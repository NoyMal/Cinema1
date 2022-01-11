const { resolve } = require('path')
const Member = require('./membersSchema')

const getAllMembers = () => {
    return new Promise((resolve, reject) => {
        Member.find({}, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

const getMemberById = (memberId) =>{
    return new Promise((resolve, reject) =>{
        Member.findById(memberId,(err, data) =>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

const addMember = (newMember) => {
    return new Promise((resolve, reject) => {
        const member = new Member({
            name: newMember.name,
            email: newMember.email,
            city: newMember.city
         })   
            member.save((err)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve("Member was created !")
                }
            })  
    })
}


const updateMember = (memberId, newMember) => {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate((memberId),{
            name: newMember.name,
            email: newMember.email,
            city: newMember.city
        },(err) =>{
            if(err){
                reject(err)
            }
            else{
                resolve("Member was updated ! ")
            }
        })
    })
}


const deleteMember = (MemberId) =>{
    return new Promise((resolve, reject) => {
        Member.findByIdAndDelete(MemberId, (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("Member has been deleted")
            }
        })
    })
}

module.exports = {getAllMembers,getMemberById,addMember,updateMember,deleteMember}
const { resolve } = require('path')
const User = require('./usersSchema')


//user-> DB, 2 X JSON
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}


const getUserById =  (userId) =>{
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, data) => {
            if(err){
                reject(err)
            }
            else{
                 
                let obj = {
                    //data from DB
                    id: userId,
                    username: data.userName,
                    password: data.password,
                }

                resolve(obj)
            }
        })
    })
}


const addUser = (newUser) => {
    return new Promise((resolve, reject) => {
        const user = new User({
            userName: newUser.userName,
            password: newUser.password
         }) 
            user.save((err)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve("User was created !")
                }
            })  
    })
}


const updateUser = (userId, newUser) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate((userId),{
            userName: newUser.userName,
            password: newUser.password
        },(err) =>{
            if(err){
                reject(err)
            }
            else{
                resolve("User was updated ! ")
            }
        })
    })
}


const deleteUser = (UserId) =>{
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(UserId, (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve("User has been deleted")
            }
        })
    })
}

module.exports = {getAllUsers,getUserById,addUser,updateUser,deleteUser}
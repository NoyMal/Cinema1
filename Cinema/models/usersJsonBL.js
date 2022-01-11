const { resolve } = require('path')
const jsonFile = require('jsonfile')



const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./json/Users.json',(err, data)=>{
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

const getUserJSONById = (userId) =>{
    return new Promise((resolve, reject) =>{
        jsonFile.readFile('./json/Users.json' ,(err, data) =>{
            if(err){
                reject(err)
            }
            else{
                let userData = data.filter(item=> item.id === userId)
                resolve(userData)
            }
        })
    })
}


const addUser = (newUser) => {
    let userArr = []
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./json/Users.json', (err, data) => {
            if(err){
                reject(err)
            }
            else{
                userArr = data
                userArr.push(newUser)
                jsonFile.writeFile('./json/Users.json',userArr,(err)=>{
                    if(err){
                        reject(err)
                    }else {
                        resolve("User was created !")
                    }
                })
            }
        })
    })
}

const updateUser = (userId, newUser) => {
    let userArr = []
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./json/Users.json' ,(err, data) =>{
            if(err){
                reject(err)
            }
            else{                
                userArr = data
                for (let i = 0; i < userArr.length; i++) {
                    if (userArr[i].id === userId){
                        userArr[i] = newUser
                    } 
                }
                jsonFile.writeFile('./json/Users.json' , userArr, (err) =>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve("User was updated !" + userArr)
                    }
                })
            }
        }) 
    })
}


const deleteJSUser = (userId) =>{
    let allUsers = []
    let newUsers = []
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./json/Users.json' ,(err, data) =>{
            if(err){
                reject(err)
            }
            else{
                allUsers = data
                for (let i = 0; i < allUsers.length; i++) {
                    if (allUsers[i].id != userId){
                        newUsers.push(allUsers[i])
                    } 
                }
                jsonFile.writeFile('./json/Users.json' , newUsers, (err) =>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve("User has been deleted !")
                    }
                })
            }
        })  
    }
)}

module.exports = {getAllUsers,getUserJSONById,addUser,updateUser,deleteJSUser}
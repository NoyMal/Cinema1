const { resolve } = require('path')
const jsonFile = require('jsonfile')


const getAllPermissions = () => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./json/Permissions.json',(err, data)=>{
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

const getPermissionsById = (userId) =>{
    return new Promise((resolve, reject) =>{
        jsonFile.readFile('./json/Permissions.json' ,(err, data) =>{
            if(err){
                reject(err)
            }
            else{
                let permissionData = data.filter(item=> item.id == userId)
                resolve(permissionData)
            }
        })
    })
}


const addPermissions = (newPermissions) => {
    let perArr = []
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./json/Permissions.json', (err, data) => {
            if(err){
                reject(err)
            }
            else{
                perArr = data
                perArr.push(newPermissions)
                jsonFile.writeFile('./json/Permissions.json',perArr,(err)=>{
                    if(err){
                        reject(err)
                    }else {
                        resolve("Permissions was created !")
                    }
                })
            }
        })
    })
}

const updatePermissions = (userId, selectedPermissions) => {
    let perArr = []
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./json/Permissions.json' ,(err, data) =>{
            if(err){
                reject(err)
            }
            else{                
                perArr = data
                for (let i = 0; i < perArr.length; i++) {
                    if (perArr[i].id == userId){
                        perArr[i] = selectedPermissions
                    } 
                }
                jsonFile.writeFile('./json/Permissions.json' , perArr, (err) =>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve("Permissions was updated !")
                    }
                })
            }
        }) 
    })
}

const deletePermissions = (userId) =>{
    let allPermissions = []
    let newPermissions = []
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./json/Permissions.json' ,(err, data) =>{
            if(err){
                reject(err)
            }
            else{
                allPermissions = data
                for (let i = 0; i < allPermissions.length; i++) {
                    if (allPermissions[i].id != userId){
                        newPermissions.push(allPermissions[i])
                    } 
                }
                jsonFile.writeFile('./json/Permissions.json' , newPermissions, (err) =>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve("Permissions have been deleted !")
                    }
                })
            }
        })  
    }
)}

module.exports = {getAllPermissions,getPermissionsById,addPermissions,updatePermissions,deletePermissions}
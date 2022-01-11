const axios = require('axios')
const membersBL = require('./models/membersBL')

const getDataToDB=async()=>{
    membersData = await axios.get("https://jsonplaceholder.typicode.com/users")
    let memberObj;
    membersData.data.forEach(member => {
        memberObj={
            name: member.name,
            email: member.email,
            city: member.address.city
        }
     membersBL.addMember(memberObj)
    });
}

module.exports={getDataToDB}
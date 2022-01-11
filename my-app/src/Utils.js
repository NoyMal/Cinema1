import axios from 'axios'


// DB users
const getUsersDB = () => {
    return axios.get("http://localhost:3001/users")
}
const getDBById = (id) => {
    return axios.get(`http://localhost:3001/users/${id}`)
}
const createUserDB = (DbUser) => {
    return axios.post("http://localhost:3001/users" , DbUser)
}
const updateUserDB = (id, DbUser) => {
    return axios.put(`http://localhost:3001/users/${id}`, DbUser)
}
const deleteUserDB = (id) => {
    return axios.delete(`http://localhost:3001/users/${id}`)
}

//json users
const getJsUsers = () => {
    return axios.get("http://localhost:3001/usersJs")
}
const getJsById = (id) => {
    return axios.get(`http://localhost:3001/usersJs/${id}`)
}
const createJsUsers = (JsUser) => {
    return axios.post("http://localhost:3001/usersJs", JsUser)
}
const updateJsUsers = (id, JsUser) => {
    return axios.put(`http://localhost:3001/usersJs/${id}`,JsUser)
}
const deleteJsUsers = (id) => {
    return axios.delete(`http://localhost:3001/usersJs/${id}`)
}

// json permissions
const getPermissions = () => {
    return axios.get("http://localhost:3001/permissions")
}
const getPermissionsById = (id) => {
    return axios.get(`http://localhost:3001/permissions/${id}`)
}
const createPermissions = (permissions) => {
    return axios.post("http://localhost:3001/permissions", permissions)
}
const updatePermissions = (id , permissions) => {
    return axios.put(`http://localhost:3001/permissions/${id}`, permissions)
}
const deletePermissions = (id) => {
    return axios.delete(`http://localhost:3001/permissions/${id}`)
}




// DB movies
const getMovies = () => {
    return axios.get("http://localhost:3000/movies")
}
const getMovieById = (id) => {
    return axios.get(`http://localhost:3000/movies/${id}`)
}
const createMovie = (newMovie) => {
    return axios.post("http://localhost:3000/movies" , newMovie)
}
const updateMovie = (id, newMovie) => {
    return axios.put(`http://localhost:3000/movies/${id}`, newMovie)
}
const deleteMovie = (id) => {
    return axios.delete(`http://localhost:3000/movies/${id}`)
}


// DB members
const getMembers = () => {
    return axios.get("http://localhost:3000/members")
}
const getMemberById = (id) => {
    return axios.get(`http://localhost:3000/members/${id}`)
}
const createMember = (newMember) => {
    return axios.post("http://localhost:3000/members" , newMember)
}
const updateMember = (id, newMember) => {
    return axios.put(`http://localhost:3000/members/${id}`, newMember)
}
const deleteMember = (id) => {
    return axios.delete(`http://localhost:3000/members/${id}`)
}


// DB subscriptions
const getSubscriptions = () => {
    return axios.get("http://localhost:3000/subscriptions")
}
const getSubscriptionById = (id) => {
    return axios.get(`http://localhost:3000/subscriptions/${id}`)
}
const createSubscription = (newSubscription) => {
    return axios.post("http://localhost:3000/subscriptions" , newSubscription)
}
const updateSubscription = (id, newSubscription) => {
    return axios.put(`http://localhost:3000/subscriptions/${id}`, newSubscription)
}
const deleteSubscription = (id) => {
    return axios.delete(`http://localhost:3000/subscriptions/${id}`)
}



export default {
    getDBById, getUsersDB, createUserDB, updateUserDB, deleteUserDB,
    getJsUsers, getJsById, createJsUsers, updateJsUsers, deleteJsUsers,
    getPermissions, getPermissionsById, createPermissions, updatePermissions, deletePermissions,
    getMovies, getMovieById, createMovie, updateMovie, deleteMovie,
    getMembers, getMemberById, createMember, updateMember, deleteMember,
    getSubscriptions, getSubscriptionById, createSubscription, updateSubscription, deleteSubscription
}
import HttpBackend from "./../config/http"

const httpBackend= HttpBackend()

const tokenJwt= window.location.pathname.split('/')[2]
const storageAdmin= JSON.parse(localStorage.getItem("@sismiegee/auth/admin"))
const storageUser= JSON.parse(localStorage.getItem("@sismiegee/auth"))
const storageToken= storageUser?.length > 0 ? storageUser?.jwt : storageAdmin?.length > 0 ? storageAdmin?.jwt : tokenJwt  
// const token= 
// console.log("tokenJwt");

export const authService = { 
    createUser,
    authenticate,
    loadUsers,
    getMe,
    editUser,
    loadRoles,
    deleteUser,
}

function createUser(userData) {
    return httpBackend.post(`auth/local/register`, userData)
}

function authenticate(dataUser) {
    const { identifier, password } = dataUser
    return httpBackend.post(`auth/local`, {
        identifier,
        password,
      })
}

function loadUsers() {
    return httpBackend.get(`users`)
}

function loadRoles() {
    return httpBackend.get(`users-permissions/roles`)
}

function editUser(id, userData) {
    // console.log(storageToken);
    return httpBackend.put(`users/${id}`, userData)
}

function deleteUser(id) {
    return httpBackend.delete(`users/${id}`)
}

function getMe(token) {
    return httpBackend.get(`users/me?[populate]=role`, { headers: {"Authorization" : `Bearer ${token}`} })
}
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./AxiosService";
import axios from "axios";

const hostName="http://localhost:8080/user"


async function saveUser(formUser) {
  // console.log(formData)
  //   axiosInstance.post(hostName,formData);

  //   const response = await axios.post(`${hostName}`, formData)
  //   console.log(formData)

  //   return response
  return axiosInstance.post(hostName,formUser);
}

function getUserFromToken() {
  console.log(jwtDecode(JSON.parse(sessionStorage.getItem("token"))));
    return jwtDecode(JSON.parse(sessionStorage.getItem("token")))
}


async function Login(formData){
console.log(formData)
    const response = await axios.post(`${hostName}/login`, formData)
    .then(response=>{
        const token=response.data.accessToken
        sessionStorage.setItem("token",JSON.stringify(token))
        console.log(response)

        return jwtDecode(token)

    })
    console.log(formData)

    return response
}

function activateAccount(username) {
    axiosInstance.put(`${hostName}/activate`,{username})
}

export const getAlluser = async () => {
    const accessToken= JSON.parse(sessionStorage.getItem("token"))

    console.log(JSON.stringify(accessToken));
  
    if (accessToken) {
      try {
        const response = await axios.get('http://localhost:8080/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        // Handle the response data
        console.log(JSON.stringify(response));
        return response.data;
      } catch (error) {
        console.error('Request failed:', error);
        // Handle unauthorized access or other errors
      }
    } else {
      // Redirect to login page or handle unauthenticated state
    }
  };
function getUser(id){
    return axiosInstance.get(`${hostName}/${id}`)
    .then(response=>response.data)
}
function Logout() {
    sessionStorage.clear();
}

function getAllOwners() {
    return axiosInstance.get(`${hostName}/owners`)
    .then(response=>response.data)
}

function forgotPassword(username){
    return axiosInstance.post(`${hostName}/forgot`,{username})
}

function changePassword(username,password){
    return axiosInstance.put(`${hostName}/changePassword`,{username,newPassword:password})
}

function updateUser(formData){
  console.log(formData)
    return axiosInstance.put(`${hostName}/${formData.id}`,formData)
}

export default {
    saveUser,
    Login,
    getAllOwners,
    getUser,
    getUserFromToken,
    Logout,
    activateAccount,
    forgotPassword,
    changePassword,
    updateUser
}
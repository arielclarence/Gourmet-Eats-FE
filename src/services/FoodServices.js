import axios from 'axios';
import axiosInstance from "./AxiosService";

const hostName="http://localhost:8080/food"

async function createFood(formUser) {
  return axiosInstance.post(hostName,formUser);
}
const getFoodByCuisineId = async (cuisineid) => {
    const accessToken= JSON.parse(sessionStorage.getItem("token"))

    console.log(JSON.stringify(accessToken));
  
    if (accessToken) {
      try {
        const response = await axios.get(`${hostName}/cuisine/${cuisineid}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        // Handle the response data
        console.log(JSON.stringify(response.data.foods));
        return response.data;
      } catch (error) {
        console.error('Request failed:', error);
        // Handle unauthorized access or other errors
      }
    } else {
      // Redirect to login page or handle unauthenticated state
    }
  };
  export const getAllFoods = async () => {
    const accessToken= JSON.parse(sessionStorage.getItem("token"))

    console.log(JSON.stringify(accessToken));
  
    if (accessToken) {
      try {
        const response = await axios.get(`${hostName}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        // Handle the response data
        console.log(JSON.stringify(response.data.foods));
        return response.data.foods;
      } catch (error) {
        console.error('Request failed:', error);
        // Handle unauthorized access or other errors
      }
    } else {
      // Redirect to login page or handle unauthenticated state
    }
  };
  export default {
    getFoodByCuisineId,
    getAllFoods,
    createFood
}
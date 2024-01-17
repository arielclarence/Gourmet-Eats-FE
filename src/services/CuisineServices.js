import axios from 'axios';
import axiosInstance from "./AxiosService";

const hostName="http://localhost:8080/cuisine"

export const CreateCuisine = async (formData) => {
  const accessToken = JSON.parse(sessionStorage.getItem("token"));

  console.log(JSON.stringify(accessToken));

  if (accessToken) {
    try {
      const response = await axiosInstance.post(hostName, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Handle the response data
      console.log(JSON.stringify(response));
      return response.data; // You can return the created cuisine data or handle it as needed
    } catch (error) {
      console.error('Request failed:', error);
    }
  } else {
    // Redirect to the login page or handle unauthenticated state
  }
};
export const getAllCuisine = async () => {
    const accessToken= JSON.parse(sessionStorage.getItem("token"))

  
    if (accessToken) {
      try {
        const response = await axios.get(hostName, {
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
  export default {
    getAllCuisine,
    CreateCuisine
}
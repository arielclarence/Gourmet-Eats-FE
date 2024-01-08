import axios from 'axios';

export const getAllCuisine = async () => {
    const accessToken= JSON.parse(sessionStorage.getItem("token"))

    console.log(JSON.stringify(accessToken));
  
    if (accessToken) {
      try {
        const response = await axios.get('http://localhost:8080/cuisine', {
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
    getAllCuisine
}
import axios from 'axios';

const hostName = "http://localhost:8080/chat";

const makechatroom = async (formUser) => {
  try {
    const response = await axios.post(hostName, formUser);

    // Assuming the response contains a chat ID property (adjust accordingly)
    const chatId = response.data.id;

    // Store the chat ID in sessionStorage
    sessionStorage.setItem('chatId', chatId);

    return response;
  } catch (error) {
    // Handle errors, you might want to log or throw the error
    console.error('Error creating chat room:', error);
    throw error;
  }
};
const getChatBySellerId = async (sellerid) => {
  const accessToken= JSON.parse(sessionStorage.getItem("token"))

  console.log(JSON.stringify(accessToken));

  if (accessToken) {
    try {
      const response = await axios.get(`${hostName}/seller/${sellerid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Handle the response data
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Request failed:', error);
      // Handle unauthorized access or other errors
    }
  } else {
    // Redirect to login page or handle unauthenticated state
  }
};
const getChatByCustomerId = async (sellerid) => {
  const accessToken= JSON.parse(sessionStorage.getItem("token"))

  console.log(JSON.stringify(accessToken));

  if (accessToken) {
    try {
      const response = await axios.get(`${hostName}/customer/${sellerid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Handle the response data
      console.log(JSON.stringify(response.data));
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
  makechatroom,
  getChatBySellerId,
  getChatByCustomerId

};

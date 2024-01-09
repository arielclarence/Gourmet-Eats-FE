import axios from 'axios';

const hostName = "http://localhost:8080/chat";

const makechatroom = async (formUser) => {
  try {
    const response = await axios.post(hostName, formUser);

    // Assuming the response contains a chat ID property (adjust accordingly)
    const chatId = response.data.chatId;

    // Store the chat ID in sessionStorage
    sessionStorage.setItem('chatId', chatId);

    return response;
  } catch (error) {
    // Handle errors, you might want to log or throw the error
    console.error('Error creating chat room:', error);
    throw error;
  }
};

export default {
  makechatroom
};

import axios from 'axios';

const hostName = "http://localhost:8080/message";
const sendMessage = async (formUser) => {
  const chatId= sessionStorage.getItem("chatId")
  console.log(JSON.stringify(chatId));
  formUser.chatid=chatId;
  try {
    const response = await axios.post(hostName, formUser);

    return response;
  } catch (error) {
    // Handle errors, you might want to log or throw the error
    console.error('Error posting message:', error);
    throw error;
  }
};
const getMessagesByChatid = async () => {
  const accessToken= JSON.parse(sessionStorage.getItem("token"))

  const chatId= sessionStorage.getItem("chatId")
  console.log(JSON.stringify(chatId));

  if (chatId) {
    try {
      const response = await axios.get(`${hostName}/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Handle the response data
      console.log(JSON.stringify(response.data.messages));
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
  getMessagesByChatid,
  sendMessage
};

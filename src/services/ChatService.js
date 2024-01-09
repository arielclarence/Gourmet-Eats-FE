import axios from 'axios';
const hostName="http://localhost:8080/chat"
const makechatroom = async (formUser) => {
    return axiosInstance.post(hostName,formUser);
  };

  export default {
    makechatroom
}
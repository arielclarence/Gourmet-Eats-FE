import React, { useState, useEffect } from "react";
import ChatComponent from '../../components/ChatComponent';
import ChatService from "../../services/ChatService";
import UserServices from "../../services/UserServices";

import Food from "./Food";
// import Food from "./foodbasicdone";
const Chatstable = () => {
  const userloggedinid=UserServices.getUserFromToken().userid;
  const userloggedinrole=UserServices.getUserFromToken().role;

  const [Chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      if (userloggedinrole=="Seller") {
        const response = await ChatService.getChatBySellerId(userloggedinid);
        setChats(response.chats);
        setIsLoading(false);
      console.log(response)

      }
      else if(userloggedinrole=="Customer"){
        const response = await ChatService.getAllChat(userloggedinid);
        setChats(response.chats);
        setIsLoading(false);
      }
    }

    fetchChats();
  }, []);

// Chatstable.jsx

const handleChatSelect = (Chat) => {
  setSelectedChat(Chat);
};

return (
  <div className="table-container">
    <div className="card-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        Chats.map((Chat, index) => (
          <ChatComponent
            key={index}
            Chat={Chat}
            Role={userloggedinrole}
            onSelect={handleChatSelect}
            isSelected={selectedChat === Chat}
          />
        ))
      )}
    </div>

  </div>
);

};

export default Chatstable;

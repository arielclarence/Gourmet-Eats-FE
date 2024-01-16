import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesComponent from '../../components/ChatMessagesComponent';
import SendMessageComponent from '../../components/SendMessageComponent';
import MessageService from '../../services/MessageService';
import UserServices from '../../services/UserServices';

function ChatPage() {
    const user=UserServices.getUserFromToken();
    const chatId= JSON.parse(sessionStorage.getItem("chatId"));
    const [username,setUsername] = useState([]);
    const [stompClient, setStompClient] = useState();
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [fetchingPrevious, setFetchingPrevious] = useState(false);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });

        stompClient.onConnect = () => {
            stompClient.subscribe(`/user/${chatId.id}/queue/inboxmessages`, (frame) => {
                onMessageReceived(frame);
            });
        };

        stompClient.activate();

        setStompClient(stompClient);
        fetchLatestMessages();
        return () => {
            // Cleanup function to unsubscribe when the component unmounts
            stompClient.deactivate();
        };
    }, []);

    const sendMessage = async (newMessage) => {
        const payload = {
            'id': uuidv4(),
            'senderid': user.userid, // Assuming newMessage has senderid property
            'content':  newMessage.text, // Assuming newMessage has text property
            'chatid': null, // Assuming newMessage has chatid property
        };

        // Send the message to the backend
        try {
            await MessageService.sendMessage(payload);
            
        } catch (error) {
            console.error('Error posting message:', error);
            return;
        }

        // Publish the message to the WebSocket
        stompClient.publish({ 'destination': `/user/${chatId.id}/queue/inboxmessages`, body: JSON.stringify(payload) });

    };

    const onMessageReceived = (frame) => {
        const rawMessage = JSON.parse(frame.body);

        // Add formatted timestamp to the message
        const timestamp = new Date().toLocaleString();
        const message = {
          ...rawMessage,
          timestamp,
        };
      
        console.log('Received Message:', message);
        setMessagesReceived((prevMessages) => [...prevMessages, message]);
    };

    const fetchLatestMessages = async () => {
    setFetchingPrevious(true);

    try {
        const messagesData = await MessageService.getMessagesByChatid();
        if (user.role === chatId.sellerid) {
            setUsername(chatId.customername);
        } else {
            setUsername(chatId.sellername);
        }

        // Check if there are messages before restructuring the data
        if (messagesData.messages && messagesData.messages.length > 0) {
            const restructuredData = messagesData.messages.map((message) => ({
                id: message.id,
                senderid: message.senderid.id,
                content: message.content,
                timestamp: message.timestamp.toLocaleString(),
                chatid: message.chatid.id,
            }));
            
            setMessagesReceived(restructuredData);
        } else {
            // If there are no messages, you can handle it as needed.
            console.log('No messages available.');
        }

        setFetchingPrevious(false);
    } catch (error) {
        console.error('Error fetching latest messages:', error);
        setFetchingPrevious(false);
    }
};


    return (
        <div className="App">
            
            <ChatMessagesComponent messagesReceived={messagesReceived} displayname={username} id={user.userid}/>
            <br></br>
            <SendMessageComponent onMessageSend={sendMessage} />

        </div>
    );
}

export default ChatPage;

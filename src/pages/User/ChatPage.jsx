import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesComponent from '../../components/ChatMessagesComponent';
import SendMessageComponent from '../../components/SendMessageComponent';
import MessageService from '../../services/MessageService';
import UserServices from '../../services/UserServices';

function ChatPage() {
    const user=UserServices.getUserFromToken();
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
            stompClient.subscribe('/topic/chat', (frame) => {
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
        stompClient.publish({ 'destination': '/topic/chat', body: JSON.stringify(payload) });
    };

    const onMessageReceived = (frame) => {
        const message = JSON.parse(frame.body);
        setMessagesReceived((prevMessages) => [...prevMessages, message]);
    };

    const fetchLatestMessages = async () => {
        setFetchingPrevious(true);

        try {
            const messagesData = await MessageService.getMessagesByChatid();
            console.log(messagesData.messages)
            setMessagesReceived(messagesData.messages);
            setFetchingPrevious(false);
        } catch (error) {
            console.error('Error fetching latest messages:', error);
            setFetchingPrevious(false);
        }
    };

    return (
        <div className="App">
            <SendMessageComponent onMessageSend={sendMessage} />
            <br></br>
            <ChatMessagesComponent messagesReceived={messagesReceived} />
        </div>
    );
}

export default ChatPage;

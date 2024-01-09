import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesComponent from '../../components/ChatMessagesComponent';
import SendMessageComponent from '../../components/SendMessageComponent';

function ChatPage() {
    const [stompClient, setStompClient] = useState();
    const [messagesReceived, setMessagesReceived] = useState([]);

    useEffect(() => {
        setupStompClient();
    }, []); // Run only once on component mount

    const setupStompClient = () => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });

        stompClient.onConnect = () => {
          stompClient.subscribe('/topic/chat', (data) => {
              onMessageReceived(data);
          });
      };
  
      stompClient.onStompError = (frame) => {
          console.error('Stomp Error:', frame);
      };
  
      stompClient.onWebSocketClose = (event) => {
          console.log('WebSocket Close:', event);
      };
  
      stompClient.onUnhandledFrame = (frame) => {
          console.log('Unhandled Frame:', frame);
      };
  
      stompClient.activate();
  
      setStompClient(stompClient);
  };

    const sendMessage = (newMessage) => {
        const payload = { 'id': uuidv4(), 'text': newMessage.text };
        stompClient.publish({ 'destination': '/topic/chat', body: JSON.stringify(payload) });
    };

    const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);
console.log(message);

        setMessagesReceived(messagesReceived => [...messagesReceived, message]);
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

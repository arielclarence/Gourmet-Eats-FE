import React, { useState } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesPlaceholder from '../../components/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from '../../components/SendMessagePlaceholder';
import UsernamePlaceholder from '../../components/UsernamePlaceholder';

function Chat() {
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);

  const setupStompClient = (username) => {
    // stomp client over websockets
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      // subscribe to the backend public topic
      stompClient.subscribe('/topic/publicmessages', (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      // subscribe to the backend "private" topic
      stompClient.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
        onMessageReceived(data);
      });
    };

    // initiate client
    stompClient.activate();

    // maintain the client for sending and receiving
    setStompClient(stompClient);
  };

  // send the data using Stomp
  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
    if (payload.to) {
      stompClient.publish({ 'destination': `/user/${payload.to}/queue/inboxmessages`, body: JSON.stringify(payload) });
    } else {
      stompClient.publish({ 'destination': '/topic/publicmessages', body: JSON.stringify(payload) });
    }
  };

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };

  const onUsernameInformed = (username) => {
    setUsername(username);
    setupStompClient(username);
  }

  return (
    <div className="App">
      <UsernamePlaceholder username={username} onUsernameInformed={onUsernameInformed} />
      <br></br>
      <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
      <br></br>
      <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
    </div>
  );

}

export default Chat;
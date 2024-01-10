import React from 'react';

const MessageReceived = (props) => {
  const messageStyle = {
    textAlign: props.isCurrentUser ? 'right' : 'left',
    margin: '5px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  return (
    <div style={messageStyle}>
      <div>{props.text}  {props.timestamp}</div>
    </div>
  );
};

const ChatMessagesComponent = (props) => {
  return (
    <>
      <h2>Messages:</h2>
      {props.messagesReceived.map((message) => (
        <MessageReceived
          key={message.id}
          text={message.content}
          timestamp={message.timestamp}
          isCurrentUser={message.from === props.username}
        />
      ))}
    </>
  );
};

export default ChatMessagesComponent;

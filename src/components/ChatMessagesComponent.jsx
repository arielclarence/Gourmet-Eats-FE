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
      
      <div>{props.text} {props.id} {props.timestamp} {props.isCurrentUser}</div>
    </div>
  );
};

const ChatMessagesComponent = (props) => {
console.log(props)
  return (
    <>
      <h2>Messages with {props.displayname}</h2>
      {props.messagesReceived.map((message) => (
        <MessageReceived
          key={message.id}
          text={message.content}
          timestamp={message.timestamp}
          isCurrentUser={message.senderid === props.id}
        />
      ))}
    </>
  );
};

export default ChatMessagesComponent;

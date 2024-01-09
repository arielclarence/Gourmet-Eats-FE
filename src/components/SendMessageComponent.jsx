import { useState } from "react";

const SendMessageComponent = (props) => {
  const [message, setMessage] = useState('');

  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
      return;
    }

    // Assume that props.destinationUsername is the specific destination
    props.onMessageSend({ text: message, to: props.destinationUsername });
    setMessage('');
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='message'>Message:</label>
      <input id='message' type='text' onChange={(event) => setMessage(event.target.value)} value={message}></input>
      <br />
      {/* Assume that props.destinationUsername is the specific destination */}
      <p>Destination: {props.destinationUsername}</p>
      <button type="button" onClick={onMessageSend}>Send</button>
    </form>
  );
}

export default SendMessageComponent;

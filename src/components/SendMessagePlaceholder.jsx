import { useState } from "react";

const SendMessagePlaceholder = (props) => {
  const [message, setMessage] = useState('');
  const [destinationUsername, setDestinationUsername] = useState('');



  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
    }

    props.onMessageSend({ 'text': message, 'to': destinationUsername });
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
      <label htmlFor='destUsername'>Destination:</label>
      <input id='destUsername' type='text' onChange={(event) => setDestinationUsername(event.target.value)}></input>
      <button onClick={onMessageSend}>Send</button>
    </form>
  );
}

export default SendMessagePlaceholder;
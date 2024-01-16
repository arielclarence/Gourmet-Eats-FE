import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './CardSelection.css'; // Import the CSS file

function ChatComponent(props) {
  const navigate = useNavigate();

  const handleSelect = () => {
    props.onSelect(props.Chat.id);
  };

  const handleOpenChat = async () => {
    try {
      // Make the chat room and get the chat ID
      sessionStorage.setItem('chatId',JSON.stringify(props.Chat));
      // Navigate to the chat page with the chat ID
      navigate('/chat');
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <div className="card-container">
      <div
        key={props.id}
        className={`card ${props.isSelected ? 'selected' : ''}`}
        onClick={handleSelect}
        style={{ backgroundColor: props.isSelected ? 'grey' : 'white' }}
      >
        <Card>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              style={{ fontSize: '1.5rem', whiteSpace: 'nowrap' }}
            >
              {props.Role === 'Seller' ? props.Chat.customername : props.Chat.sellername}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpenChat} style={{ marginTop: '10px' }}>
              Open Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ChatComponent;

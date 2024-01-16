import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import UserServices from '../services/UserServices';
import ChatService from '../services/ChatService';
import { useNavigate } from 'react-router-dom';

function FoodCardComponent({ food, onSelect, isSelected }) {
  const userloggedinid=UserServices.getUserFromToken().userid;
  const navigate=useNavigate()
  const chatData = {
    customerid: userloggedinid,
    sellerid: food.seller.id
  };
  const handleSelect = () => {
    onSelect(food);
  };
  const handleOpenChat = async () => {
    try {
      // Make the chat room and get the chat ID
      const chat = await ChatService.makechatroom(chatData);
      // Navigate to the chat page with the chat ID
      navigate('/chat')
      window.location.href = '/chat';
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  }

  const cardStyle = {
    margin: '0 20px', // Increased spacing between cards
    width: '300px', // Set the width of each card
    height: '400px', // Set the height of each card
    borderRadius: '8px', // Add border radius for rounded corners
    overflow: 'hidden', // Hide overflow content
    cursor: 'pointer', // Add cursor pointer on hover

    // Optional: Add box-shadow for a subtle effect
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: isSelected ? 'green' : 'white', // Set background color based on selection
    color: isSelected ? 'white' : 'black', // Set text color based on selection
  };

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={handleSelect}
      style={cardStyle}
    >
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={food.pictureUrl}
          alt={food.name}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            style={{ fontSize: '1.5rem', whiteSpace: 'nowrap' }}
          >
            {food.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {food.description}
          </Typography>
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Price: ${food.price.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpenChat} style={{ marginTop: '10px' }}>
            Open Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default FoodCardComponent;

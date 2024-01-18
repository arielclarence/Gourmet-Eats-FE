import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import UserServices from '../services/UserServices';
import ChatService from '../services/ChatService';
import { useNavigate } from 'react-router-dom';
import ToastServices from '../services/ToastServices';

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
  const addToCart = async () => {
    console.log(food);

    try {
      
      // Prepare cart item data
      const cartItem = {
        foodid: food.id,
        food: food.name,
        pictureUrl: food.pictureUrl,
        sellerid: food.seller.id,
        price: food.price.toFixed(2),
        specialRequest: '',
        amount: 1, // Initial amount
      };
  
      // Check if the same food is already in the cart
      let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      const existingIndex = cart.findIndex(item => item.foodid === food.id);
  
      if (existingIndex !== -1) {
        // If the same food is found, increment the amount
        cart[existingIndex].amount += 1;
      } else {
        // If not, add a new item to the cart
        cart.push(cartItem);
      }
  
      // Update the cart in sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(cart));
      console.log(cart);
      // Notify the user that the item was added to the cart
      ToastServices.Success("Succesfully add food to cart")
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  const cardStyle = {
    margin: '0 20px', // Increased spacing between cards
    width: '300px', // Set the width of each card
    height: '600px', // Set the height of each card
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
          <Button variant="contained" color="secondary" onClick={handleOpenChat} style={{ marginTop: '10px' }}>
            Open Chat
          </Button>
          <Button variant="contained" color="primary" onClick={addToCart} style={{ marginTop: '10px' }}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default FoodCardComponent;

import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch the cart from sessionStorage on component mount
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, amount) => {
    // Update the quantity of an item in the cart
    const updatedCart = [...cart];
    updatedCart[index].amount += amount;

    // If the quantity becomes zero, remove the item from the cart
    if (updatedCart[index].amount <= 0) {
      updatedCart.splice(index, 1);
    }

    // Update state and sessionStorage
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateSpecialRequest = (index, specialRequest) => {
    // Update the specialRequest for the specific item
    const updatedCart = [...cart];
    updatedCart[index].specialRequest = specialRequest;
    setCart(updatedCart);
  };

  const calculateSubtotal = (item) => {
    return item.price * item.amount;
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const placeOrder = async () => {
    // Send the cart content to your backend for processing
    // try {
    //   const response = await fetch('/api/placeOrder', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(cart),
    //   });

    //   if (response.ok) {
    //     // Order placed successfully, you may want to clear the cart or show a success message
    //     alert('Order placed successfully!');
    //     setCart([]);
    //     sessionStorage.removeItem('cart');
    //   } else {
    //     // Handle error response from the server
    //     alert('Failed to place the order. Please try again.');
    //   }
    // } catch (error) {
    //   // Handle network errors
    //   console.error('Error placing order:', error);
    //   alert('An error occurred while placing the order.');
    // }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Your Cart</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', borderSpacing: '10px' }}>
        <thead>
          <tr>
            <th style={{ width: '250px' }}>Picture</th>
            <th style={{ width: '250px' }}>Name</th>
            <th style={{ width: '250px' }}>Subtotal</th>
            <th style={{ width: '250px' }}>Amount</th>
            <th style={{ width: '250px' }}>Special Request</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td style={{ width: '250px' }}>
                <img src={item.pictureUrl} alt={item.food} style={{ width: '100%', height: 'auto' }} />
              </td>
              <td style={{ width: '250px' }}>{item.food}</td>
              <td style={{ width: '250px' }}>${calculateSubtotal(item).toFixed(2)}</td>
              <td style={{ width: '250px' }}>
                <button onClick={() => updateQuantity(index, -1)} style={{ fontSize: '12px' }}>-</button>
                {item.amount}
                <button onClick={() => updateQuantity(index, 1)} style={{ fontSize: '12px' }}>+</button>
              </td>
              <td style={{ width: '250px' }}>
                <input
                  type="text"
                  placeholder="Special Request"
                  value={item.specialRequest || ''}
                  onChange={(e) => updateSpecialRequest(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'right' }}>
        <strong>Grand Total: ${calculateGrandTotal().toFixed(2)}</strong>
      </div>
      <button onClick={placeOrder} style={{ marginTop: '20px' }}>Place Order</button>
    </div>
  );
};

export default CartPage;

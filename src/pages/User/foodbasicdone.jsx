import React, { useEffect, useState } from 'react';
import FoodComponent from '../../components/FoodComponent'; // Update the import path
import { getFoodByCuisineId } from '../../services/FoodServices'; 
import './Food.css'; 


function Food({ cuisine }) {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const fetchFoodByCuisine = async () => {
      const response = await getFoodByCuisineId(cuisine.id);
      setFoodItems(response.foods);
    };

    fetchFoodByCuisine();
  }, [cuisine.id]);

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
  };

  return (
    <div>
      <h2>{cuisine.cuisineName} Foods</h2>
      <div className="food-card-container">
        {foodItems.map((food, index) => (
          <FoodComponent
            key={index}
            food={food}
            onSelect={handleFoodSelect}
            isSelected={selectedFood === food}
          />
        ))}
      </div>
    </div>
  );
}

export default Food;


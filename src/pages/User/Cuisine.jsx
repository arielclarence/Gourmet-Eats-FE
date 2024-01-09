import React, { useState, useEffect } from "react";
import CuisineComponent from '../../components/CuisineComponent';
import { getAllCuisine } from "../../services/CuisineServices";
import Food from "./Food";
// import Food from "./foodbasicdone";
const Cuisinestable = () => {
  const [Cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCuisines = async () => {
      const response = await getAllCuisine();
      setCuisines(response.cuisines);
      setIsLoading(false);
    }

    fetchCuisines();
  }, []);

// Cuisinestable.jsx

const handleCuisineSelect = (cuisine) => {
  setSelectedCuisine(cuisine);
};

return (
  <div className="table-container">
    <div className="card-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        Cuisines.map((cuisine, index) => (
          <CuisineComponent
            key={index}
            cuisine={cuisine}
            onSelect={handleCuisineSelect}
            isSelected={selectedCuisine === cuisine}
          />
        ))
      )}
    </div>

    {selectedCuisine && (
      <Food cuisine={selectedCuisine} />
    )}
  </div>
);

};

export default Cuisinestable;

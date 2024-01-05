import React, { useState, useEffect, useRef } from "react";
import CuisineComponent from '../../components/CuisineComponent';
import { getAllCuisine } from "../../services/CuisineServices";

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
    console.log(Cuisines)
  }, []);

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
  </div>
  );
};

export default Cuisinestable;



import React, { useState, useEffect, useRef } from "react";
import CuisineComponent from '../components/CuisineComponent';
import { getAllCuisine } from "../API/apiCuisine";

const Cuisinestable = () => {
  const [Cuisines, setCuisines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Cuisinesmapped = useRef([]);

  useEffect(() => {
    const fetchCuisines = async () => {
      const response = await getAllCuisine();
      setCuisines(response.cuisines);
      setIsLoading(false);
    }

    fetchCuisines();
  }, []);

  return (
    <div className="table-container">
      <table aria-label="cuisine table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? 
          <tr><td>Loading</td></tr> : 
          Cuisines.map((cuisine, index) => (
            <CuisineComponent key={index} cuisine={cuisine} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cuisinestable;

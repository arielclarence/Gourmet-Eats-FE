import React, { useState, useEffect,useRef } from "react";
import axios from 'axios';
import CuisineComponent from '../components/CuisineComponent';

const Cuisinestable = () => {
  const [Cuisines, setCuisines] = useState([]);
const Cuisinesmapped=useRef([])
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cuisines');
        const cuisinesArray = Object.values(response.data)[0];
        Cuisinesmapped.current=cuisinesArray.map((cuisine,index) => <CuisineComponent cuisine={cuisine} key={index} />);
      console.log(Cuisinesmapped);
        setCuisines(cuisinesArray);
        
      } catch (error) {
        console.error('Error fetching cuisine:', error);
      }
    };
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
          {Cuisinesmapped.current}
        </tbody>
      </table>
    </div>
  );
};

export default Cuisinestable;
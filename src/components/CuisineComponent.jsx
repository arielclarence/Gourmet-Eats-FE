import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./CardSelection.css"; // Import the CSS file

function CuisineComponent(props) {
  const handleSelect = () => {
    onSelect(props.cuisine);
  };

  return (
    <div className="card-container">
      <div
        key={props.cuisine.id}
        className={`card ${props.isSelected ? "selected" : ""}`}
        onClick={handleSelect}
      >
        {/* Your card content goes here */}
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={props.cuisine.pictureUrl}
            alt={props.cuisine.cuisineName}
          />
          <CardContent>
            {/* Card content */}
            <Typography
              variant="h5"
              component="div"
              style={{ fontSize: "1.5rem", whiteSpace: "nowrap" }}
            >
              {props.cuisine.cuisineName}
            </Typography>
            {/* Other card content */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CuisineComponent;

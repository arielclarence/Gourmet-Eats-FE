import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const logos = [
  { id: 1, name: 'Logo 1', imageUrl: 'url_to_your_logo1' },
  { id: 2, name: 'Logo 2', imageUrl: 'url_to_your_logo2' },
  // Add more logos as needed
];

const CardSelection = () => {
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handleLogoSelect = (logo) => {
    setSelectedLogo(logo);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {logos.map((logo) => (
        <Card key={logo.id} style={{ margin: '10px', maxWidth: '300px', textAlign: 'center' }}>
          <CardMedia component="img" height="140" image={logo.imageUrl} alt={logo.name} />
          <CardContent>
            <Typography variant="h6">{logo.name}</Typography>
            <IconButton
              onClick={() => handleLogoSelect(logo)}
              color={selectedLogo === logo ? 'primary' : 'default'}
            >
              <CheckCircleIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardSelection;

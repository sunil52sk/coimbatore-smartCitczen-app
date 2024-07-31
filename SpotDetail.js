// SpotDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const SpotDetail = () => {
  // Use useParams to get the spot ID from the URL
  const { spotId } = useParams();

  // Fetch spot details based on spotId (you can replace this with your data fetching logic)
  const spotDetails = {
    1: {
      title: 'Spot 1',
      description: 'Description for Spot 1.',
    },
    // Add more details as needed
  };

  const spot = spotDetails[spotId];

  if (!spot) {
    return <div>Spot not found</div>;
  }

  return (
    <div>
      <h1>{spot.title}</h1>
      <p>{spot.description}</p>
    </div>
  );
};

export default SpotDetail;

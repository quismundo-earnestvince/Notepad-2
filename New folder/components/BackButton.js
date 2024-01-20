import React from 'react';
const BackButton = ({ onClick }) => {
  return (
    <button className="back-button" onClick={onClick}>
      Back
    </button>
  );
};
 
export default BackButton;
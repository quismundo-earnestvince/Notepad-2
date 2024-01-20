import React from 'react';
const Button = ({ text, onClick }) => {
  return (
    <button className="rounded-button" onClick={onClick} style={{ backgroundColor: '#e9b824' }}>
      {text}
    </button>
  );
};

export default Button;
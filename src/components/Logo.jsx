import React from 'react';

function Logo({ size = '50px' }) {
  return (
    <figure style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img 
        src="/logo.png" 
        alt="Company Logo" 
        style={{ 
          width: size, 
          height: size, 
          borderRadius: '50%', 
          objectFit: 'cover', 
          border: '2px solid #ddd' // Optional border for styling
        }} 
      />
    </figure>
  );
}

export default Logo;

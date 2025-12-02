import React from 'react';

const Header = ({ total }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Product Management App</h1>
        <div className="total-display">
          <span className="total-label">Total Inventory Value:</span>
          <span className="total-amount">${total.toFixed(2)}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
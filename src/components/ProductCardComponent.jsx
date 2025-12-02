import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, updateQuantity, onProductSelect, onDelete }) => {
  const subtotal = product.price * product.quantity;
  const isLowStock = product.quantity <= 5;
  const [cartMessage, setCartMessage] = useState('');

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (product.quantity > 0) {
      // Show success message
      setCartMessage(`Added 1 ${product.name} to cart!`);
      
      // Decrease quantity by 1 when added to cart
      updateQuantity(product.id, -1);
      
      // Clear message after 2 seconds
      setTimeout(() => {
        setCartMessage('');
      }, 2000);
      
      // You can also update cart state here if you have a cart system
      console.log(`Added ${product.name} to cart. New quantity: ${product.quantity - 1}`);
    } else {
      setCartMessage('Out of stock!');
      setTimeout(() => {
        setCartMessage('');
      }, 2000);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onProductSelect(product);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  const handleImageClick = () => {
    onProductSelect(product);
  };

  const handleNameClick = () => {
    onProductSelect(product);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, -1);
  };

  return (
    <div className={`product-card ${isLowStock ? 'low-stock' : ''}`}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onClick={handleImageClick}
        />
        {isLowStock && (
          <div className="low-stock-badge">Only {product.quantity} left</div>
        )}
        <div className="product-rating">
          ⭐ {product.rating}
        </div>
      </div>
      
      <div className="product-content">
        <div className="product-header">
          <h3 
            className="product-name"
            onClick={handleNameClick}
          >
            {product.name}
          </h3>
          <span className="product-category">{product.category}</span>
        </div>
        
        <p className="product-description">
          {product.description.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description}
        </p>
        
        <div className="product-price-section">
          <div className="price">${product.price.toFixed(2)}</div>
          <div className="subtotal">Total: ${subtotal.toFixed(2)}</div>
        </div>
        
        <div className="product-quantity-section">
          <div className="quantity-label">Quantity:</div>
          <div className="quantity-controls">
            <button 
              className="quantity-btn minus"
              onClick={handleDecrease}
              disabled={product.quantity <= 0}
              type="button"
            >
              −
            </button>
            <span className="quantity-value">{product.quantity}</span>
            <button 
              className="quantity-btn plus"
              onClick={handleIncrease}
              type="button"
            >
              +
            </button>
          </div>
        </div>
        
        {/* Cart Message */}
        {cartMessage && (
          <div className={`cart-message ${product.quantity === 0 ? 'error' : 'success'}`}>
            {cartMessage}
          </div>
        )}
        
        <div className="product-actions">
          <button 
            className="btn add-to-cart-btn"
            onClick={handleAddToCart}
            type="button"
            disabled={product.quantity <= 0}
          >
            🛒 Add to Cart
          </button>
          <button 
            className="btn view-details"
            onClick={handleViewDetails}
            type="button"
          >
            View Details
          </button>
          <button 
            className="btn delete-btn"
            onClick={handleDelete}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
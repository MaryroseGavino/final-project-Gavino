import React from 'react';
import './ProductDetail.css';

const ProductDetail = ({ 
  product, 
  onBack, 
  onUpdateQuantity, 
  onEditProduct, 
  onDeleteProduct 
}) => {
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <button 
        className="back-button"
        onClick={onBack}
      >
        ← Back to Products
      </button>
      
      <div className="product-detail">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-detail-image"
          />
        </div>
        
        <div className="product-info">
          <h2>{product.name}</h2>
          <span className={`category-badge ${product.category.toLowerCase()}`}>
            {product.category}
          </span>
          <p className="description">{product.description}</p>
          
          <div className="specifications">
            <h4>Specifications:</h4>
            <p>{product.specifications}</p>
          </div>
          
          <div className="product-metrics">
            <div className="metric">
              <span className="metric-label">Price:</span>
              <span className="price">${product.price.toFixed(2)}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Rating:</span>
              <span className="rating">
                ⭐ {product.rating}
                <span className="rating-text">/5</span>
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">In Stock:</span>
              <span className={`quantity ${product.quantity <= 5 ? 'low-stock' : ''}`}>
                {product.quantity} units
              </span>
            </div>
          </div>
          
          <div className="quantity-controls">
            <h4>Adjust Stock:</h4>
            <div className="quantity-buttons">
              <button 
                onClick={() => onUpdateQuantity(product.id, -1)}
                className="quantity-btn decrease"
                disabled={product.quantity <= 0}
              >
                -
              </button>
              <span className="current-quantity">{product.quantity}</span>
              <button 
                onClick={() => onUpdateQuantity(product.id, 1)}
                className="quantity-btn increase"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              className="edit-btn"
              onClick={() => {
                const newName = prompt("Enter new product name:", product.name);
                if (newName && newName.trim()) {
                  onEditProduct({...product, name: newName.trim()});
                }
              }}
            >
              ✏️ Edit Name
            </button>
            <button 
              className="delete-btn"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
                  onDeleteProduct(product.id);
                }
              }}
            >
              🗑️ Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
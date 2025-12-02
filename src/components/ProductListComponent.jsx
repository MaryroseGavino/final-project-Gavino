import React from 'react';
import ProductCard from './ProductCardComponent';
import './ProductList.css'; // Add this import

const ProductList = ({ products, updateQuantity, onProductSelect, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products found. Try a different category or add new products.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          updateQuantity={updateQuantity}
          onProductSelect={onProductSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
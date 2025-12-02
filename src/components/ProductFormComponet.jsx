import React, { useState } from 'react';
import './ProductFormComponent.css'; // We'll create this CSS file

const ProductForm = ({ addProduct, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    quantity: '',
    image: '',
    description: '',
    specifications: '',
    rating: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key].toString().trim()) {
        newErrors[key] = 'This field is required';
      }
    });
    
    if (formData.price && isNaN(formData.price)) {
      newErrors.price = 'Price must be a number';
    }
    
    if (formData.quantity && (isNaN(formData.quantity) || formData.quantity < 0)) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    
    if (formData.rating && (formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      addProduct(formData);
      // Reset form
      setFormData({
        name: '',
        category: 'Electronics',
        price: '',
        quantity: '',
        image: '',
        description: '',
        specifications: '',
        rating: ''
      });
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="product-form-modal">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter product name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Electronics">Electronics</option>
              <option value="Fitness">Fitness</option>
              <option value="Office">Office</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Sports">Sports</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price ($) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
              placeholder="0.00"
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              className={errors.quantity ? 'error' : ''}
              placeholder="0"
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label>Rating (0-5) *</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={errors.rating ? 'error' : ''}
              placeholder="4.0"
            />
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Image URL *</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={errors.image ? 'error' : ''}
            placeholder="https://images.unsplash.com/photo-..."
          />
          {errors.image && <span className="error-message">{errors.image}</span>}
          {formData.image && (
            <div className="image-preview">
              <img 
                src={formData.image} 
                alt="Preview" 
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            rows="3"
            placeholder="Enter product description..."
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Specifications *</label>
          <textarea
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            className={errors.specifications ? 'error' : ''}
            rows="2"
            placeholder="Enter product specifications (separated by commas)..."
          />
          {errors.specifications && <span className="error-message">{errors.specifications}</span>}
        </div>

        <div className="form-buttons">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
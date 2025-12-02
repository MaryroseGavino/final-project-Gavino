import React, { useState } from 'react';
import ProductList from './components/ProductListComponent';
import ProductForm from './components/ProductFormComponet';
import ProductDetail from './components/ProductDetailComponent';
import Header from './components/HeaderComponent';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gaming Laptop",
      category: "Electronics",
      price: 1299.99,
      quantity: 5,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
      description: "High-performance gaming laptop with RTX graphics",
      specifications: "RTX 4070, 16GB RAM, 1TB SSD, 240Hz display",
      rating: 4.8
    },
    {
      id: 2,
      name: "Yoga Mat",
      category: "Fitness",
      price: 34.99,
      quantity: 15,
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400",
      description: "Premium non-slip yoga mat with carrying strap",
      specifications: "72\" x 24\", 6mm thickness, 7 colors available",
      rating: 4.6
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Electronics",
      price: 249.99,
      quantity: 8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      description: "Advanced smartwatch with health monitoring",
      specifications: "Heart rate, GPS, 7-day battery, Waterproof",
      rating: 4.4
    },
    {
      id: 4,
      name: "Standing Desk",
      category: "Office",
      price: 399.99,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      description: "Electric height-adjustable standing desk",
      specifications: "60\" x 30\", Memory presets, Cable management",
      rating: 4.7
    },
    {
      id: 5,
      name: "Blender",
      category: "Kitchen",
      price: 89.99,
      quantity: 12,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      description: "High-speed professional blender for smoothies",
      specifications: "1500W, 64oz pitcher, 8 pre-programmed settings",
      rating: 4.5
    },
    {
      id: 6,
      name: "Camping Tent",
      category: "Outdoor",
      price: 199.99,
      quantity: 6,
      image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400",
      description: "4-person waterproof camping tent",
      specifications: "Waterproof 3000mm, 2 doors, 9' x 7' floor",
      rating: 4.3
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: products.length + 1,
      quantity: parseInt(newProduct.quantity),
      price: parseFloat(newProduct.price),
      rating: parseFloat(newProduct.rating)
    };
    setProducts([...products, productWithId]);
    setIsModalOpen(false);
  };

  const updateQuantity = (productId, change) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          const newQuantity = Math.max(0, product.quantity + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    setSelectedProduct(null);
  };

  const editProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setSelectedProduct(null);
  };

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const total = products.reduce((sum, product) => {
    return sum + (product.price * product.quantity);
  }, 0);

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.quantity <= 5).length;

  return (
    <div className="app">
      <Header total={total} productsCount={totalProducts} />
      
      {/* Add Product Button */}
      <div className="add-product-button-container">
        <button 
          className="add-product-button"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="plus-icon">+</span> Add New Product
        </button>
      </div>

      {/* Modal for adding new product */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button 
                className="close-button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <ProductForm 
                addProduct={addProduct} 
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="main-container">
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onUpdateQuantity={updateQuantity}
            onEditProduct={editProduct}
            onDeleteProduct={deleteProduct}
          />
        ) : (
          <>
            <div className="sidebar">
              <div className="stats-panel">
                <h3>📊 Store Statistics</h3>
                <div className="stat-item">
                  <span className="stat-label">Total Products:</span>
                  <strong className="stat-value">{totalProducts}</strong>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Value:</span>
                  <strong className="stat-value">${total.toFixed(2)}</strong>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Categories:</span>
                  <strong className="stat-value">{categories.length - 1}</strong>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Low Stock Items:</span>
                  <strong className={`stat-value ${lowStockCount > 0 ? 'warning' : ''}`}>
                    {lowStockCount}
                  </strong>
                </div>
                
                <div className="category-breakdown">
                  <h4>Products by Category:</h4>
                  {categories
                    .filter(cat => cat !== "All")
                    .map(category => (
                      <div key={category} className="category-stat">
                        <span className="category-name">{category}:</span>
                        <span className="category-count">
                          {products.filter(p => p.category === category).length}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            
            <div className="content">
              <div className="filter-section">
                <h3>Filter by Category</h3>
                <div className="category-buttons">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                      <span className="category-count">
                        ({category === "All" ? products.length : 
                          products.filter(p => p.category === category).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <ProductList 
                products={filteredProducts}
                updateQuantity={updateQuantity}
                onProductSelect={setSelectedProduct}
                onDelete={deleteProduct}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
import React from 'react';

const ProductFilters = () => (
  <div className="filters">
    <input type="text" placeholder="Product Name" />
    <input type="text" placeholder="SKU" />
    <select><option>Category</option></select>
    <select><option>Size</option></select>
    <button>-</button>
    <input type="text" placeholder="Price" />
  </div>
);

export default ProductFilters;

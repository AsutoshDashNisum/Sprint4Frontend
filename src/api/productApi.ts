// src/api/productApi.ts
import api from './axiosConfig';

// ✅ Fetch all products
export const fetchProducts = () => api.get('/products');

// ✅ Delete a product by ID
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

// ✅ Update product by ID
export const updateProduct = (id: number, data: any) => api.put(`/products/${id}`, data);

// ✅ Apply discount to all products in a category
export const applyDiscountToCategory = (categoryId: number, discount: number) =>
  api.put(`/products/discount/${categoryId}?discount=${discount}`);

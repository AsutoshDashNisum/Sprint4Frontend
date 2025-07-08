import axios from 'axios';

// Define the product request payload
interface ProductRequest {
  name: string;
  sku: string;
  categoryId: number;
  status: string;
  price: number;
  discount: number;
}

// Fetch all products
export const fetchProducts = () => {
  return axios.get('http://localhost:8080/api/products');
};

// Delete a product by ID
export const deleteProduct = (id: number) => {
  return axios.delete(`http://localhost:8080/api/products/${id}`);
};

// Update product details
export const updateProduct = (id: number, data: ProductRequest) => {
  return axios.put(`http://localhost:8080/api/products/${id}`, data);
};



export const applyDiscountToCategory = (categoryId: number, discount: number) =>
  axios.put(`http://localhost:8081/api/products/category/${categoryId}/discount`, { discount });


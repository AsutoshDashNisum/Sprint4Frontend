import api from './axiosConfig';

export const fetchProducts = () => api.get('/products');
export const createProduct = (productData: any) => api.post('/products', productData);
export const fetchProductsByCategory = (categoryId: number) =>
  api.get(`/products/category/${categoryId}`);

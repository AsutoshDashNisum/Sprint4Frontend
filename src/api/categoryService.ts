import api from './axiosConfig';

export const fetchCategories = () => api.get('/categories');
export const createCategory = (categoryData: any) => api.post('/categories', categoryData);

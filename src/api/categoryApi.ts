import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/categories';

export const getAllCategories = () => axios.get(BASE_URL);
export const createCategory = (data: { categoryName: string; description: string }) => axios.post(BASE_URL, data);

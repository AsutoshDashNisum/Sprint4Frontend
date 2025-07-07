import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/promos';

export const getAllPromos = () => axios.get(BASE_URL);
export const getPromoByCode = (promoCode: string) => axios.get(`${BASE_URL}/${promoCode}`);
export const createPromo = (data: any) => axios.post(BASE_URL, data);
export const updatePromo = (promoCode: string, data: any) => axios.put(`${BASE_URL}/${promoCode}`, data);
export const deletePromo = (promoCode: string) => axios.delete(`${BASE_URL}/${promoCode}`);
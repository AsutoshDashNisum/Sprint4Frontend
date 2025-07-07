import api from './axiosConfig';

export const fetchPromoByCode = (code: string) => api.get(`/promos/${code}`);
export const createPromo = (promoData: any) => api.post('/promos', promoData);

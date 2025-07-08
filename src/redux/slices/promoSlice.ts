import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define Promo type
interface Promo {
  promoCode: string;
  promoType: string;
  description: string;
  amount: number;
}

// State type
interface PromoState {
  data: Promo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PromoState = {
  data: [],
  status: 'idle'
};

// 🔁 Fetch promos
export const fetchPromos = createAsyncThunk('promo/fetch', async () => {
  const res = await axios.get('http://localhost:8080/api/promos');
  return res.data.map((promo: any) => ({
    promoCode: promo.promoCode,
    promoType: promo.promo_type,
    description: promo.description,
    amount: promo.amount
  }));
});

// 🆕 Create promo
export const createPromo = createAsyncThunk(
  'promo/create',
  async (promoData: Promo) => {
    const payload = {
      promoCode: promoData.promoCode,
      promo_type: promoData.promoType, // Backend expects this key
      description: promoData.description,
      amount: promoData.amount
    };
    const res = await axios.post('http://localhost:8080/api/promos', payload);
    const created = res.data;
    return {
      promoCode: created.promoCode,
      promoType: created.promo_type,
      description: created.description,
      amount: created.amount
    };
  }
);

const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPromos.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPromos.rejected, state => {
        state.status = 'failed';
      })
      .addCase(createPromo.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  }
});

export default promoSlice.reducer;

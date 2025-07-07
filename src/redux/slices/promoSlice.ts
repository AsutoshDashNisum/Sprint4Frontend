import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define Promo type
interface Promo {
  promoCode: string;
  promoType: string;
  description: string;
  amount: number;
}

// Define the state type
interface PromoState {
  data: Promo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PromoState = {
  data: [],
  status: 'idle'
};

// ✅ Define and export only once
export const fetchPromos = createAsyncThunk('promo/fetch', async () => {
  const res = await axios.get('http://localhost:8080/api/promos');
  return res.data;
});

export const createPromo = createAsyncThunk('promo/create', async (promoData: Promo) => {
  const res = await axios.post('http://localhost:8080/api/promos', promoData);
  return res.data;
});

const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(createPromo.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  }
});

// ✅ Do not re-export functions here again
export default promoSlice.reducer;

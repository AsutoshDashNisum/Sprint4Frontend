import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetch', async () => {
  const res = await axios.get('http://localhost:8080/api/products');
  return res.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: { data: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});

export default productSlice.reducer;

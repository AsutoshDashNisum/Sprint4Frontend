import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  categoryName: string;
  description: string;
}

interface CategoryState {
  data: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CategoryState = {
  data: [],
  status: 'idle'
};

export const fetchCategories = createAsyncThunk('category/fetch', async () => {
  const res = await axios.get('http://localhost:8080/api/categories');
  return res.data;
});

export const createCategory = createAsyncThunk('category/create', async (categoryData: Category) => {
  const res = await axios.post('http://localhost:8080/api/categories', categoryData);
  return res.data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  }
});

export default categorySlice.reducer;

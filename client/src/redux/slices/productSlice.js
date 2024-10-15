import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { baseUrl } from '../../../baseUrl';

export const addProduct = createAsyncThunk('product/addProduct', async (formData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${baseUrl}/product/add`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue(data.message || 'Failed to add product');
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.message || 'Error adding product');
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                toast.success('Product added successfully!');
                
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload || 'Failed to add product');
            });
    },
});

export default productSlice.reducer;

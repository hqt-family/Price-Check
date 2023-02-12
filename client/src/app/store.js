import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../features/auth/authSlice';
import priceReducers from '../features/prices/priceSlice';
import productReducers from '../features/products/productSlice';

export const store = configureStore({
    reducer: {
        auth: authReducers,
        products: productReducers,
        prices: priceReducers
    }
})
import { configureStore } from '@reduxjs/toolkit';
import policiesReducer from './features/policiesSlice.js';

export const store = configureStore({
    reducer: {
        policies: policiesReducer,
    },
});
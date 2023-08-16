import { configureStore } from '@reduxjs/toolkit';
import admainReducer from './reducers/admainReducer';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    admains: admainReducer
  },
  devTools: process.env.NODE_ENV !== 'production',});
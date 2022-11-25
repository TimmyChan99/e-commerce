import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart';
import userReducer from './user/user';

const store = configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { productType } from '../../utils/data';
import { RootState } from '../store';

const initialState = {
 cartItems: [] as Array<productType>,
}

const cart = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<productType>) => {
			// action.payload is the { product, quantity } object
			const newItem = action.payload;
			const existItem = state.cartItems.find((x) => x.slug === newItem.slug);
      const cartItems = state.cartItems;
			const updatedCartItems = existItem ? cartItems.map((x) => x.slug === existItem.slug ? newItem : x) : [...cartItems, newItem];
			return { ...state, cartItems: updatedCartItems };
		}
	}
});

export const {addItem} = cart.actions

export default cart.reducer

export const selectCartItems = (state: RootState) => state.cart.cartItems
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { productType } from '../../utils/data';
import { RootState } from '../store';

type cartItemType = productType & {quantity: number};

const initialState = {
 cartItems: [] as Array<cartItemType>,
}

const cart = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<cartItemType>) => {
			// action.payload is the { product, quantity } object
			const newItem = action.payload;
			const existItem = state.cartItems.find((x) => x.slug === newItem.slug);
      const cartItems = state.cartItems;
			const updatedCartItems = existItem ? cartItems.map((x) => x.slug === existItem.slug ? newItem : x) : [...cartItems, newItem];
			return { ...state, cartItems: updatedCartItems };
		},

		removeItem: (state, action: PayloadAction<string>) => {
			// action.payload is the slug
			const slug = action.payload;
			const cartItems = state.cartItems.filter((x) => x.slug !== slug);
			return { ...state, cartItems };
		},

		clearCart: (state) => {
			return { ...state, cartItems: [] };
		}
	}
});

export const { addItem, removeItem, clearCart } = cart.actions

export default cart.reducer

export const selectCartItems = (state: RootState) => state.cart.cartItems

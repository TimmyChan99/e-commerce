import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

type userType = {
	user: string;
	shippingAddress: {
		fullName: string;
		address: string;
		city: string;
		postalCode: string;
		country: string;
	};
	paymentMethod: string;
};

type PaymentMethod = 'PayPal' | 'Stripe' | 'CashOnDelivery';

const initialState: userType = {
	user : '',
	shippingAddress: {} as userType['shippingAddress'],
	paymentMethod: '' as PaymentMethod,
}

let paymentMethod = 'oo';
console.log(paymentMethod);
const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setShippingAddress: (state, action: PayloadAction<userType['shippingAddress']>) => {
			// action.payload is the shippingAddress
			return { ...state, shippingAddress: action.payload };
		},

		setPaymentMethod: (state, action: PayloadAction<userType['paymentMethod']>) => {
			// action.payload is the paymentMethod
			return { ...state, paymentMethod: action.payload };
		}
	}
});

export const { setShippingAddress, setPaymentMethod } = user.actions

export default user.reducer

export const selectShippingAddress = (state: RootState) => state.user

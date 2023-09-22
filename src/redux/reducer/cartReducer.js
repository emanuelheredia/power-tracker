import {
	ADD_PTODUCT_TO_CART,
	ADD_PTODUCT_TO_CART_EXITO,
	ADD_PTODUCT_TO_CART_ERROR,
} from "../types/index";

const initialState = {
	msg: {},
	loading: false,
	error: false,
	cart: [],
};

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_PTODUCT_TO_CART:
			return {
				...state,
				error: false,
				loading: true,
			};
		case ADD_PTODUCT_TO_CART_EXITO:
			return {
				...state,
				error: false,
				loading: false,
				cart: action.payload,
			};
		default:
			return state;
	}
}

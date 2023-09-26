import {
	ADD_PRODUCT_TO_CART,
	ADD_PRODUCT_TO_CART_EXITO,
	ADD_PRODUCT_TO_CART_ERROR,
	UPDATE_PRODUCT_AMOUNT_CART,
	UPDATE_PRODUCT_AMOUNT_CART_EXITO,
	UPDATE_PRODUCT_AMOUNT_CART_ERROR,
	RESET_RESPONSE_MSGS_CART,
	RESET_RESPONSE_MSGS_CART_ERROR,
	RESET_RESPONSE_MSGS_CART_EXITO,
	DELETE_PRODUCT_TO_CART,
	DELETE_PRODUCT_TO_CART_EXITO,
	DELETE_PRODUCT_TO_CART_ERROR,
} from "../types/index";

const initialState = {
	msg: "",
	loading: false,
	error: false,
	cart: [],
};

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_PRODUCT_TO_CART:
		case RESET_RESPONSE_MSGS_CART:
		case UPDATE_PRODUCT_AMOUNT_CART:
		case DELETE_PRODUCT_TO_CART:
			return {
				...state,
				error: false,
				loading: true,
			};
		case ADD_PRODUCT_TO_CART_EXITO:
			return {
				...state,
				msg: "El producto se agregó con éxito",
				error: false,
				loading: false,
				cart: action.payload,
			};
		case DELETE_PRODUCT_TO_CART_EXITO:
			return {
				...state,
				msg: "El producto se eliminó con éxito",
				error: false,
				loading: false,
				cart: state.cart.filter(
					(item) => item.product.code !== action.payload.code,
				),
			};
		case UPDATE_PRODUCT_AMOUNT_CART_EXITO:
			return {
				...state,
				msg: "La cantidad del producto se actualizó con éxito",
				error: false,
				loading: false,
				cart: state.cart.map((item) => {
					if (item.product.code === action.payload.product.code) {
						return {
							...item,
							amount: action.payload.amount,
						};
					}
					return item;
				}),
			};
		case RESET_RESPONSE_MSGS_CART_EXITO:
			return {
				...state,
				error: false,
				loading: false,
				msg: initialState.msg,
			};
		case ADD_PRODUCT_TO_CART_ERROR:
			return {
				...state,
				error: true,
				loading: false,
			};
		case DELETE_PRODUCT_TO_CART_ERROR:
			return {
				...state,
				error: true,
				loading: false,
			};
		case UPDATE_PRODUCT_AMOUNT_CART_ERROR:
			return {
				...state,
				error: true,
				loading: false,
			};
		case RESET_RESPONSE_MSGS_CART_ERROR:
			return {
				...state,
				error: true,
				loading: false,
			};
		default:
			return state;
	}
}

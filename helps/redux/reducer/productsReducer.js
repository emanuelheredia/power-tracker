import {
	UPLOAD_ALL_PRODUCTS,
	UPLOAD_ALL_PRODUCTS_EXITO,
	UPLOAD_ALL_PRODUCTS_ERROR,
	UPDATE_ALL_PRODUCTS,
	UPDATE_ALL_PRODUCTS_EXITO,
	UPDATE_ALL_PRODUCTS_ERROR,
	GET_ALL_PRODUCTS_EXITO,
	GET_ALL_PRODUCTS_ERROR,
	GET_ALL_PRODUCTS,
} from "../types";
const initialState = {
	products: [],
	msg: "",
	loading: false,
	error: false,
};
export default function productsReducer(state = initialState, action) {
	switch (action.type) {
		case UPLOAD_ALL_PRODUCTS:
		case UPDATE_ALL_PRODUCTS:
		case GET_ALL_PRODUCTS:
			return {
				...state,
				loading: true,
			};
		case UPLOAD_ALL_PRODUCTS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: action.payload,
			};
		case UPDATE_ALL_PRODUCTS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: action.payload,
			};
		case GET_ALL_PRODUCTS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				products: action.payload,
			};
		case UPLOAD_ALL_PRODUCTS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
			};
		case UPDATE_ALL_PRODUCTS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
			};
		case GET_ALL_PRODUCTS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		default:
			return state;
	}
}

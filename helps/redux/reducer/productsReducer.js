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
	GET_CATEGORY_COLORS,
	GET_CATEGORY_COLORS_EXITO,
	GET_CATEGORY_COLORS_ERROR,
	GET_COLORS_TO_FILTER,
	GET_COLORS_TO_FILTER_EXITO,
	GET_COLORS_TO_FILTER_ERROR,
} from "../types";
const initialState = {
	products: [],
	colorsCategory: [],
	colorsFilter: [],
	msg: "",
	loading: false,
	error: false,
};
export default function productsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CATEGORY_COLORS:
		case UPLOAD_ALL_PRODUCTS:
		case UPDATE_ALL_PRODUCTS:
		case GET_ALL_PRODUCTS:
		case GET_COLORS_TO_FILTER:
			return {
				...state,
				loading: true,
				msg: "",
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
		case GET_CATEGORY_COLORS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				colorsCategory: action.payload,
			};
		case GET_COLORS_TO_FILTER_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				colorsFilter: action.payload,
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
		case GET_CATEGORY_COLORS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_COLORS_TO_FILTER_ERROR:
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

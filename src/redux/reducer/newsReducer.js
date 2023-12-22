import {
	ADD_PRODUCT_TO_NEWS,
	ADD_PRODUCT_TO_NEWS_EXITO,
	ADD_PRODUCT_TO_NEWS_ERROR,
	GET_ALL_NEWS,
	GET_ALL_NEWS_EXITO,
	GET_ALL_NEWS_ERROR,
	DELETE_NEWS,
	DELETE_NEWS_EXITO,
	DELETE_NEWS_ERROR,
} from "../types";
const initialState = {
	news: [],
	msg: "",
	text: "",
	loading: false,
	error: false,
};
export default function productsReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_PRODUCT_TO_NEWS:
		case GET_ALL_NEWS:
		case DELETE_NEWS:
			return {
				...state,
				loading: true,
				msg: "",
			};
		case ADD_PRODUCT_TO_NEWS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: action.payload.msg,
			};
		case GET_ALL_NEWS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				news: action.payload,
				msg: "",
			};
		case DELETE_NEWS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: action.payload.msg,
			};
		case ADD_PRODUCT_TO_NEWS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_ALL_NEWS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
			};
		case DELETE_NEWS_ERROR:
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

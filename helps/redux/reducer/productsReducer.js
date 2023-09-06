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
	GET_IMAGES_SUBCATEGORIES,
	GET_IMAGES_SUBCATEGORIES_EXITO,
	GET_IMAGES_SUBCATEGORIES_ERROR,
	RESET_REQUESTED_VALUES,
	RESET_REQUESTED_VALUES_EXITO,
	RESET_REQUESTED_VALUES_ERROR,
	UPDATE_IMAGES_SUBCATEGORIES,
	UPDATE_IMAGES_SUBCATEGORIES_EXITO,
	UPDATE_IMAGES_SUBCATEGORIES_ERROR,
	GET_CATEGORIES_TO_FILTER,
	GET_CATEGORIES_TO_FILTER_EXITO,
	GET_CATEGORIES_TO_FILTER_ERROR,
	GET_SUBCATEGORIES_TO_FILTER,
	GET_SUBCATEGORIES_TO_FILTER_EXITO,
	GET_SUBCATEGORIES_TO_FILTER_ERROR,
} from "../types";
const initialState = {
	products: [],
	colorsCategory: [],
	colorsFilter: [],
	categoriesToFilter: [],
	subCategoriesToFilter: [],
	imagesOfSubCategory: [],
	msg: "",
	text: "",
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
		case GET_IMAGES_SUBCATEGORIES:
		case RESET_REQUESTED_VALUES:
		case UPDATE_IMAGES_SUBCATEGORIES:
		case GET_CATEGORIES_TO_FILTER:
		case GET_SUBCATEGORIES_TO_FILTER:
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
				msg: action.payload.msg,
				text: action.payload.text,
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
		case GET_CATEGORIES_TO_FILTER_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				categoriesToFilter: action.payload,
			};
		case GET_SUBCATEGORIES_TO_FILTER_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				subCategoriesToFilter: action.payload,
			};
		case GET_IMAGES_SUBCATEGORIES_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				imagesOfSubCategory: action.payload,
			};
		case RESET_REQUESTED_VALUES_EXITO:
			return {
				...state,
				loading: true,
				error: false,
				imagesOfSubCategory: [],
			};
		case UPDATE_IMAGES_SUBCATEGORIES_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: action.payload,
				text: "",
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
		case GET_SUBCATEGORIES_TO_FILTER_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				subCategoriesToFilter: action.payload,
			};
		case GET_COLORS_TO_FILTER_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_CATEGORIES_TO_FILTER_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_IMAGES_SUBCATEGORIES_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case RESET_REQUESTED_VALUES_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		case UPDATE_IMAGES_SUBCATEGORIES_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
				text: "",
			};
		default:
			return state;
	}
}

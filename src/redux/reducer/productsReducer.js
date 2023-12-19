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
	GET_OPTIONS_TO_UPDATE_IMAGES,
	GET_OPTIONS_TO_UPDATE_IMAGES_EXITO,
	GET_OPTIONS_TO_UPDATE_IMAGES_ERROR,
	GET_IMAGES_SUBCATEGORIES,
	GET_IMAGES_SUBCATEGORIES_EXITO,
	GET_IMAGES_SUBCATEGORIES_ERROR,
	RESET_IMAGES_RECEIVED_STORE,
	RESET_IMAGES_RECEIVED_STORE_EXITO,
	RESET_IMAGES_RECEIVED_STORE_ERROR,
	UPDATE_IMAGES_PRODUCT,
	UPDATE_IMAGES_PRODUCT_EXITO,
	UPDATE_IMAGES_PRODUCT_ERROR,
	GET_VALUES_ATTRIBUTES_SELECTS,
	GET_VALUES_ATTRIBUTES_SELECTS_EXITO,
	GET_VALUES_ATTRIBUTES_SELECTS_ERROR,
	ADD_NEW_PRODUCT,
	ADD_NEW_PRODUCT_EXITO,
	ADD_NEW_PRODUCT_ERROR,
	DELETE_ONE_PRODUCT,
	DELETE_ONE_PRODUCT_EXITO,
	DELETE_ONE_PRODUCT_ERROR,
	RESET_RESPONSE_MSGS,
	RESET_RESPONSE_MSGS_EXITO,
	RESET_RESPONSE_MSGS_ERROR,
	RESET_OPTIONS_RECEIVED_STORE,
	RESET_OPTIONS_RECEIVED_STORE_EXITO,
	RESET_OPTIONS_RECEIVED_STORE_ERROR,
} from "../types";
const initialState = {
	products: [],
	optionUpdateImage: { color: [], mark: [], vehiculo: [] },
	valuesFilter: {
		color: [],
		category: [],
		subCategory: [],
		mark: [],
		proveedor: [],
	},
	categories: [],
	subCategories: [],
	imagesProduct: [],
	imagesProductHome: [],
	msg: "",
	text: "",
	loading: false,
	error: false,
};
export default function productsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_OPTIONS_TO_UPDATE_IMAGES:
		case RESET_OPTIONS_RECEIVED_STORE:
		case UPLOAD_ALL_PRODUCTS:
		case UPDATE_ALL_PRODUCTS:
		case ADD_NEW_PRODUCT:
		case GET_ALL_PRODUCTS:
		case DELETE_ONE_PRODUCT:
		case GET_IMAGES_SUBCATEGORIES:
		case RESET_RESPONSE_MSGS:
		case RESET_IMAGES_RECEIVED_STORE:
		case UPDATE_IMAGES_PRODUCT:
		case GET_VALUES_ATTRIBUTES_SELECTS:
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
		case ADD_NEW_PRODUCT_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: action.payload.msg,
				text: action.payload.text,
			};
		case DELETE_ONE_PRODUCT_EXITO:
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
		case GET_OPTIONS_TO_UPDATE_IMAGES_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				optionUpdateImage: {
					...state.optionUpdateImage,
					[action.payload.attribute]: action.payload.data,
				},
			};
		case GET_VALUES_ATTRIBUTES_SELECTS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				valuesFilter: {
					...state.valuesFilter,
					[action.payload.attribute]: action.payload.data,
				},
			};
		case GET_IMAGES_SUBCATEGORIES_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				imagesProduct: action.payload,
			};
		case RESET_IMAGES_RECEIVED_STORE_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				imagesProduct: [],
			};
		case RESET_OPTIONS_RECEIVED_STORE_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				optionUpdateImage: initialState.optionUpdateImage,
			};
		case RESET_RESPONSE_MSGS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: initialState.msg,
				text: initialState.text,
			};
		case UPDATE_IMAGES_PRODUCT_EXITO:
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
		case DELETE_ONE_PRODUCT_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
				text: action.payload.text,
			};
		case ADD_NEW_PRODUCT_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
				text: action.payload.text,
			};
		case GET_ALL_PRODUCTS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_VALUES_ATTRIBUTES_SELECTS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case GET_OPTIONS_TO_UPDATE_IMAGES_ERROR:
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
				msg: action.payload.msg,
				text: action.payload.text,
			};
		case RESET_IMAGES_RECEIVED_STORE_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		case RESET_RESPONSE_MSGS_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		case RESET_OPTIONS_RECEIVED_STORE_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		case UPDATE_IMAGES_PRODUCT_ERROR:
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

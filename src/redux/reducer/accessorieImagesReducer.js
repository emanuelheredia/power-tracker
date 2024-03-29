import {
	ADD_NEW_ACCESSORIE_IMAGE,
	ADD_NEW_ACCESSORIE_IMAGE_EXITO,
	ADD_NEW_ACCESSORIE_IMAGE_ERROR,
	GET_ACCESSORIE_IMAGES,
	GET_ACCESSORIE_IMAGES_ERROR,
	GET_ACCESSORIE_IMAGES_EXITO,
	DELETE_ACCESSORIE_IMAGES,
	DELETE_ACCESSORIE_IMAGES_ERROR,
	DELETE_ACCESSORIE_IMAGES_EXITO,
	GET_ACCESSORIE_CATEGORIES,
	GET_ACCESSORIE_CATEGORIES_EXITO,
	GET_ACCESSORIE_CATEGORIES_ERROR,
	RESET_ACCESSORIE_STATE,
	RESET_ACCESSORIE_STATE_EXITO,
	GET_ACCESSORIE_ATTRIBUTES,
	GET_ACCESSORIE_ATTRIBUTES_EXITO,
	GET_ACCESSORIE_ATTRIBUTES_ERROR,
} from "../types";
const initialState = {
	images: [],
	categoriesImages: [],
	accesoriesAttributes: [],
	msg: "",
	text: "",
	loading: false,
	error: false,
};
export default function accessorieImagesReducer(state = initialState, action) {
	switch (action.type) {
		case RESET_ACCESSORIE_STATE:
		case GET_ACCESSORIE_IMAGES:
		case GET_ACCESSORIE_CATEGORIES:
		case ADD_NEW_ACCESSORIE_IMAGE:
		case DELETE_ACCESSORIE_IMAGES:
		case GET_ACCESSORIE_ATTRIBUTES:
			return {
				...state,
				loading: true,
				msg: "",
			};
		case ADD_NEW_ACCESSORIE_IMAGE_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: action.payload.msg,
				text: action.payload.text,
				images: [...state.images, action.payload.image],
			};
		case GET_ACCESSORIE_IMAGES_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				images: action.payload,
			};
		case DELETE_ACCESSORIE_IMAGES_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				images: state.images.filter(
					(img) => img._id !== action.payload.id,
				),
			};
		case GET_ACCESSORIE_CATEGORIES_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				categoriesImages: action.payload,
			};
		case GET_ACCESSORIE_ATTRIBUTES_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				accesoriesAttributes: action.payload,
			};
		case RESET_ACCESSORIE_STATE_EXITO:
			return {
				initialState,
			};
		case ADD_NEW_ACCESSORIE_IMAGE_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
				text: action.payload.text,
			};
		case GET_ACCESSORIE_IMAGES_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
				text: action.payload.text,
			};
		case DELETE_ACCESSORIE_IMAGES_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
			};
		case GET_ACCESSORIE_CATEGORIES_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload.msg,
			};
		case GET_ACCESSORIE_ATTRIBUTES_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		default:
			return state;
	}
}

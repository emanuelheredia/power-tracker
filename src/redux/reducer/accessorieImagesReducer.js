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
} from "../types";
const initialState = {
	images: [],
	msg: "",
	text: "",
	loading: false,
	error: false,
};
export default function accessorieImagesReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ACCESSORIE_IMAGES:
		case ADD_NEW_ACCESSORIE_IMAGE:
		case DELETE_ACCESSORIE_IMAGES:
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
		default:
			return state;
	}
}

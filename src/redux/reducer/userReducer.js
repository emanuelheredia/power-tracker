import {
	ADD_NEW_USER,
	ADD_NEW_USER_EXITO,
	ADD_NEW_USER_ERROR,
	SIGN_IN_USER,
	SIGN_IN_USER_ERROR,
	SIGN_IN_USER_EXITO,
	LOG_OUT_USER,
	LOG_OUT_USER_ERROR,
	LOG_OUT_USER_EXITO,
} from "../types";
const initialState = {
	user: null,
	msg: "",
	loading: false,
	error: false,
};
export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_NEW_USER:
		case SIGN_IN_USER:
		case LOG_OUT_USER:
			return {
				...state,
				loading: true,
				msg: "",
			};
		case ADD_NEW_USER_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: action.payload,
			};
		case SIGN_IN_USER_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				msg: "",
				user: action.payload,
			};
		case LOG_OUT_USER_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				user: null,
			};
		case ADD_NEW_USER_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case SIGN_IN_USER_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				msg: action.payload,
			};
		case LOG_OUT_USER_ERROR:
			return {
				...state,
				loading: false,
				error: true,
			};
		default:
			return state;
	}
}

import { ADD_NEW_USER, ADD_NEW_USER_EXITO, ADD_NEW_USER_ERROR } from "../types";
const initialState = {
	user: null,
	msg: "",
	loading: false,
	error: false,
};
export default function productsReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_NEW_USER:
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
				msg: "",
			};
		case ADD_NEW_USER_ERROR:
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

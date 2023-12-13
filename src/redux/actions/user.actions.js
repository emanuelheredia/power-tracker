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
} from "../types/index";
import clienteAxios from "../../../src/axios";

//ADD NEW USER
export const addNewUser = (user) => {
	return async (dispatch) => {
		dispatch(addNewUserDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "add-new-user",
				data: user,
			});
			if (resp.status === 203)
				return dispatch(addNewUserDBError(resp.data.msg));
			return dispatch(addNewUserDBExito(resp.data.msg));
		} catch (error) {
			dispatch(addNewUserDBError("Error en el almacenado"));
		}
	};
};

const addNewUserDB = () => ({ type: ADD_NEW_USER });

const addNewUserDBExito = (res) => ({
	payload: res,
	type: ADD_NEW_USER_EXITO,
});
const addNewUserDBError = (res) => ({
	payload: res,
	type: ADD_NEW_USER_ERROR,
});

//SIGN IN USER
export const signInUser = (user) => {
	return async (dispatch) => {
		dispatch(signInUserDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "sign-in-user",
				data: user,
			});
			if (resp.status === 203)
				return dispatch(signInUserDBError(resp.data.msg));
			return dispatch(signInUserDBExito(resp.data));
		} catch (error) {
			dispatch(signInUserDBError("Error de servidor"));
		}
	};
};

const signInUserDB = () => ({ type: SIGN_IN_USER });

const signInUserDBExito = (res) => ({
	payload: res,
	type: SIGN_IN_USER_EXITO,
});
const signInUserDBError = (res) => ({
	payload: res,
	type: SIGN_IN_USER_ERROR,
});

//SIGN IN USER
export const logOutUser = () => {
	return async (dispatch) => {
		dispatch(logOutUserState());
		try {
			return dispatch(logOutUserStateExito());
		} catch (error) {
			dispatch(logOutUserStateError());
		}
	};
};

const logOutUserState = () => ({ type: SIGN_IN_USER });

const logOutUserStateExito = () => ({
	type: SIGN_IN_USER_EXITO,
});
const logOutUserStateError = () => ({
	type: SIGN_IN_USER_ERROR,
});

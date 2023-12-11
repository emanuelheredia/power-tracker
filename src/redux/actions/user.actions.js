import {
	ADD_NEW_USER,
	ADD_NEW_USER_EXITO,
	ADD_NEW_USER_ERROR,
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
			console.log(resp);
			dispatch(
				addNewUserDBExito({
					msg: "Almacenamiento Exitoso",
					text: resp.data.msg,
				}),
			);
		} catch (error) {
			dispatch(
				addNewUserDBError({
					msg: "Error en el almacenado",
					text: error.response.data.msg,
				}),
			);
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

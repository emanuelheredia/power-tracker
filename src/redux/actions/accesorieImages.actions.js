import {
	ADD_NEW_ACCESSORIE_IMAGE,
	ADD_NEW_ACCESSORIE_IMAGE_EXITO,
	ADD_NEW_ACCESSORIE_IMAGE_ERROR,
	GET_ACCESSORIE_IMAGES,
	GET_ACCESSORIE_IMAGES_ERROR,
	GET_ACCESSORIE_IMAGES_EXITO,
} from "../types/index";
import clienteAxios from "../../../src/axios";

//ADD NEW ACCESSORIE IMAGE
export const addNewAccessorieImage = (product) => {
	console.log(product);
	return async (dispatch) => {
		dispatch(addNewAccessorieImageDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "add-new-accessorie-image",
				data: product,
			});
			dispatch(
				addNewAccessorieImageDBExito({
					msg: "Almacenamiento Exitoso",
					text: resp.data.msg,
				}),
			);
		} catch (error) {
			dispatch(
				addNewAccessorieImageDBError({
					msg: "Error en el almacenado",
					text: error.response.data.msg,
				}),
			);
		}
	};
};

const addNewAccessorieImageDB = () => ({ type: ADD_NEW_ACCESSORIE_IMAGE });

const addNewAccessorieImageDBExito = (res) => ({
	payload: res,
	type: ADD_NEW_ACCESSORIE_IMAGE_EXITO,
});
const addNewAccessorieImageDBError = (res) => ({
	payload: res,
	type: ADD_NEW_ACCESSORIE_IMAGE_ERROR,
});

//ADD NEW ACCESSORIE IMAGE
export const getAccessorieImages = (model) => {
	return async (dispatch) => {
		dispatch(getAccessorieImagesDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "get-accessorie-images",
				data: { model: model },
			});
			console.log(resp);
			dispatch(getAccessorieImagesDBExito(resp.data.data));
		} catch (error) {
			dispatch(
				getAccessorieImagesDBError({
					msg: "Error en la obtención",
					text: error.response.data.msg,
				}),
			);
		}
	};
};

const getAccessorieImagesDB = () => ({ type: GET_ACCESSORIE_IMAGES });

const getAccessorieImagesDBExito = (res) => ({
	payload: res,
	type: GET_ACCESSORIE_IMAGES_EXITO,
});
const getAccessorieImagesDBError = (res) => ({
	payload: res,
	type: GET_ACCESSORIE_IMAGES_ERROR,
});

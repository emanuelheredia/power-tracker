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
	RESET_ACCESSORIE_STATE_ERROR,
	RESET_ACCESSORIE_STATE_EXITO,
	GET_ACCESSORIE_ATTRIBUTES,
	GET_ACCESSORIE_ATTRIBUTES_EXITO,
	GET_ACCESSORIE_ATTRIBUTES_ERROR,
} from "../types/index";
import clienteAxios from "../../../src/axios";

//ADD NEW ACCESSORIE IMAGE
export const addNewAccessorieImage = (product) => {
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
					image: resp.data.data[0],
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
export const getAccessorieImages = (query, limit) => {
	return async (dispatch) => {
		dispatch(getAccessorieImagesDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "get-accessorie-images",
				data: { query, limit },
			});
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

//DELETE IMAGE
export const deleteImage = (id) => {
	return async (dispatch) => {
		dispatch(deleteImageDB());
		try {
			let resp = await clienteAxios({
				method: "delete",
				url: "accessorie-image",
				data: { id: id },
			});
			dispatch(
				deleteImageDBExito({
					msg: "Eliminación Exitosa",
					text: resp.data.msg,
					id: id,
				}),
			);
		} catch (error) {
			dispatch(
				deleteImageDBError({
					msg: "Error en la eliminación",
					text: error.response.data.msg,
				}),
			);
		}
	};
};
const deleteImageDB = () => ({ type: DELETE_ACCESSORIE_IMAGES });

const deleteImageDBExito = (res) => ({
	payload: res,
	type: DELETE_ACCESSORIE_IMAGES_EXITO,
});
const deleteImageDBError = (res) => ({
	payload: res,
	type: DELETE_ACCESSORIE_IMAGES_ERROR,
});

//ADD NEW ACCESSORIE IMAGE
export const getAccessorieCategories = (model) => {
	return async (dispatch) => {
		dispatch(getAccessorieCategoriesDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "get-accessories-categories",
				data: { model: model },
			});
			dispatch(getAccessorieCategoriesDBExito(resp.data));
		} catch (error) {
			dispatch(
				getAccessorieCategoriesDBError({
					msg: "Error en la obtención",
					text: error.response.data.msg,
				}),
			);
		}
	};
};

const getAccessorieCategoriesDB = () => ({ type: GET_ACCESSORIE_CATEGORIES });

const getAccessorieCategoriesDBExito = (res) => ({
	payload: res,
	type: GET_ACCESSORIE_CATEGORIES_EXITO,
});
const getAccessorieCategoriesDBError = (res) => ({
	payload: res,
	type: GET_ACCESSORIE_CATEGORIES_ERROR,
});

export const getAccessorieAttributes = (query, attributes) => {
	return async (dispatch) => {
		dispatch(getAccessorieAttributesDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "get-accessories-attributes",
				data: { query, attributes },
			});
			dispatch(getAccessorieAttributesDBExito(resp.data.data));
		} catch (error) {
			dispatch(
				getAccessorieAttributesDBError({
					msg: "Error en la obtención",
					text: error.response.data.msg,
				}),
			);
		}
	};
};

const getAccessorieAttributesDB = () => ({ type: GET_ACCESSORIE_ATTRIBUTES });

const getAccessorieAttributesDBExito = (res) => ({
	payload: res,
	type: GET_ACCESSORIE_ATTRIBUTES_EXITO,
});
const getAccessorieAttributesDBError = (res) => ({
	payload: res,
	type: GET_ACCESSORIE_ATTRIBUTES_ERROR,
});
//RESET ACCESSORIES STATE
export const resetAccessorieState = () => {
	return async (dispatch) => {
		dispatch(resetAccessorieStateDB());
		try {
			dispatch(resetAccessorieStateDBExito());
		} catch (error) {
			dispatch(resetAccessorieStateDBError());
		}
	};
};

const resetAccessorieStateDB = () => ({ type: RESET_ACCESSORIE_STATE });

const resetAccessorieStateDBExito = () => ({
	type: RESET_ACCESSORIE_STATE_EXITO,
});
const resetAccessorieStateDBError = () => ({
	type: RESET_ACCESSORIE_STATE_ERROR,
});

import {
	ADD_PRODUCT_TO_NEWS,
	ADD_PRODUCT_TO_NEWS_EXITO,
	ADD_PRODUCT_TO_NEWS_ERROR,
	GET_ALL_NEWS,
	GET_ALL_NEWS_EXITO,
	GET_ALL_NEWS_ERROR,
	DELETE_NEWS,
	DELETE_NEWS_EXITO,
	DELETE_NEWS_ERROR,
} from "../types";
import clienteAxios from "../../../src/axios";

//GET NEWS
export const getAllNews = () => {
	return async (dispatch) => {
		dispatch(getAllNewsDB());
		try {
			let resp = await clienteAxios({
				method: "get",
				url: "get-all-news",
			});
			dispatch(getAllNewsDBExito(resp.data.data));
		} catch (error) {
			dispatch(
				getAllNewsDBError({
					msg: "Error en la obtención de las novedades",
				}),
			);
		}
	};
};

const getAllNewsDB = () => ({ type: GET_ALL_NEWS });

const getAllNewsDBExito = (res) => ({
	payload: res,
	type: GET_ALL_NEWS_EXITO,
});
const getAllNewsDBError = (res) => ({
	payload: res,
	type: GET_ALL_NEWS_ERROR,
});
//ADD NEW PRODUCT TO NEWS
export const addNewProductToNews = (product) => {
	return async (dispatch) => {
		dispatch(addNewProductToNewsDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "add-new-news",
				data: product,
			});
			dispatch(
				addNewProductToNewsDBExito({
					msg: "Almacenamiento Exitoso",
					text: resp.data.msg,
				}),
			);
		} catch (error) {
			dispatch(
				addNewProductToNewsDBError({
					msg: "Error en el almacenado",
					text: error.response.data.msg,
				}),
			);
		}
	};
};

const addNewProductToNewsDB = () => ({ type: ADD_PRODUCT_TO_NEWS });

const addNewProductToNewsDBExito = (res) => ({
	payload: res,
	type: ADD_PRODUCT_TO_NEWS_EXITO,
});
const addNewProductToNewsDBError = (res) => ({
	payload: res,
	type: ADD_PRODUCT_TO_NEWS_ERROR,
});

//DELETE NEWS
export const deleteNews = (id) => {
	return async (dispatch) => {
		dispatch(deleteNewsDB());
		try {
			let resp = await clienteAxios({
				method: "delete",
				url: "news",
				data: { id: id },
			});
			dispatch(
				deleteNewsDBExito({
					msg: "Eliminación Exitosa",
					text: resp.data.msg,
				}),
			);
		} catch (error) {
			dispatch(
				deleteNewsDBError({
					msg: "Error en la eliminación",
					text: error.response.data.msg,
				}),
			);
		}
	};
};
const deleteNewsDB = () => ({ type: DELETE_NEWS });

const deleteNewsDBExito = (res) => ({
	payload: res,
	type: DELETE_NEWS_EXITO,
});
const deleteNewsDBError = (res) => ({
	payload: res,
	type: DELETE_NEWS_ERROR,
});

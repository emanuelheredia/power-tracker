import {
	UPLOAD_ALL_PRODUCTS,
	UPLOAD_ALL_PRODUCTS_EXITO,
	UPLOAD_ALL_PRODUCTS_ERROR,
	UPDATE_ALL_PRODUCTS,
	UPDATE_ALL_PRODUCTS_EXITO,
	UPDATE_ALL_PRODUCTS_ERROR,
	UPDATE_IMAGES_PRODUCT,
	UPDATE_IMAGES_PRODUCT_EXITO,
	UPDATE_IMAGES_PRODUCT_ERROR,
	GET_ALL_PRODUCTS,
	GET_ALL_PRODUCTS_ERROR,
	GET_ALL_PRODUCTS_EXITO,
	GET_OPTIONS_TO_UPDATE_IMAGES,
	GET_OPTIONS_TO_UPDATE_IMAGES_EXITO,
	GET_OPTIONS_TO_UPDATE_IMAGES_ERROR,
	GET_IMAGES_SUBCATEGORIES,
	GET_IMAGES_SUBCATEGORIES_EXITO,
	GET_IMAGES_SUBCATEGORIES_ERROR,
	RESET_IMAGES_RECEIVED_STORE,
	RESET_IMAGES_RECEIVED_STORE_EXITO,
	RESET_IMAGES_RECEIVED_STORE_ERROR,
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
import clienteAxios from "../../../src/axios";

//UPLOAD NEW PRICES LIST TO DB
export const uploadProducts = (products) => {
	return async (dispatch) => {
		dispatch(uploadAllProducts());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "products",
				body: products,
			});
			dispatch(uploadAllProductsExito("Almacenado exitoso"));
		} catch (error) {
			dispatch(
				uploadAllProductsError(
					"Error en el almacenado de los productos",
				),
				console.log(error),
			);
		}
	};
};

const uploadAllProducts = () => ({ type: UPLOAD_ALL_PRODUCTS });

const uploadAllProductsExito = (res) => ({
	payload: res,
	type: UPLOAD_ALL_PRODUCTS_EXITO,
});
const uploadAllProductsError = (res) => ({
	payload: res,
	type: UPLOAD_ALL_PRODUCTS_ERROR,
});

//ADD NEW PRODUCT
export const addNewProduct = (product) => {
	return async (dispatch) => {
		dispatch(addNewProductDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "add-new-product",
				data: product,
			});
			dispatch(
				addNewProductDBExito({
					msg: "Almacenamiento Exitoso",
					text: resp.data.msg,
				}),
			);
		} catch (error) {
			dispatch(
				addNewProductDBError({
					msg: "Error en el almacenado",
					text: error.response.data.msg,
				}),
			);
		}
	};
};

const addNewProductDB = () => ({ type: ADD_NEW_PRODUCT });

const addNewProductDBExito = (res) => ({
	payload: res,
	type: ADD_NEW_PRODUCT_EXITO,
});
const addNewProductDBError = (res) => ({
	payload: res,
	type: ADD_NEW_PRODUCT_ERROR,
});

//DELETE NEW PRODUCT
export const deleteProduct = (id) => {
	return async (dispatch) => {
		dispatch(deleteProductDB());
		try {
			let resp = await clienteAxios({
				method: "delete",
				url: "products",
				data: { id: id },
			});
			dispatch(
				deleteProductDBExito({
					msg: "Eliminación Exitosa",
					text: resp.data.msg,
				}),
			);
		} catch (error) {
			dispatch(
				deleteProductDBError({
					msg: "Error en la eliminación",
					text: error.response.data.msg,
				}),
			);
		}
	};
};

const deleteProductDB = () => ({ type: DELETE_ONE_PRODUCT });

const deleteProductDBExito = (res) => ({
	payload: res,
	type: DELETE_ONE_PRODUCT_EXITO,
});
const deleteProductDBError = (res) => ({
	payload: res,
	type: DELETE_ONE_PRODUCT_ERROR,
});

// UPDATE PRICES TO DB
export const updateProducts = (products) => {
	return async (dispatch) => {
		dispatch(updateAllProducts());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "update-products",
				data: products,
			});
			dispatch(
				updateAllProductsExito({
					msg: "Actualización Exitosa",
					text: resp.data.msg,
				}),
			);
		} catch (error) {
			dispatch(
				updateAllProductsError(
					"Error en la actualización de los productos",
				),
				console.log(error),
			);
		}
	};
};

const updateAllProducts = () => ({ type: UPDATE_ALL_PRODUCTS });

const updateAllProductsExito = (res) => ({
	payload: res,
	type: UPDATE_ALL_PRODUCTS_EXITO,
});
const updateAllProductsError = (res) => ({
	payload: res,
	type: UPDATE_ALL_PRODUCTS_ERROR,
});

// GET ALL PRODUCTS FROM DB
export const getAllProducts = () => {
	return async (dispatch) => {
		dispatch(getProducts());
		try {
			const allProducts = await clienteAxios({
				url: "products",
			});
			dispatch(getProductsExito(allProducts.data.data));
		} catch (error) {
			dispatch(
				getProductsError("Error en la obtención de los productos"),
				console.log(error),
			);
		}
	};
};

const getProducts = () => ({ type: GET_ALL_PRODUCTS });

const getProductsExito = (res) => ({
	payload: res,
	type: GET_ALL_PRODUCTS_EXITO,
});
const getProductsError = (res) => ({
	payload: res,
	type: GET_ALL_PRODUCTS_ERROR,
});

//GET VALUES OF SOME ATTRIBUTE FROM DB TO SELECTS
export const getValuesAttributeSelects = (attribute, info) => {
	return async (dispatch) => {
		dispatch(getValuesAttributeSelectsDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "values-attribute-select",
				data: { attribute, info },
			});
			dispatch(
				getValuesAttributeSelectsDBExito({
					attribute,
					data: resp.data.data,
				}),
			);
		} catch (error) {
			dispatch(
				getValuesAttributeSelectsDBError(
					"Error en el almacenado de los productos",
				),
				console.log(error),
			);
		}
	};
};

const getValuesAttributeSelectsDB = () => ({
	type: GET_VALUES_ATTRIBUTES_SELECTS,
});

const getValuesAttributeSelectsDBExito = (res) => ({
	payload: res,
	type: GET_VALUES_ATTRIBUTES_SELECTS_EXITO,
});
const getValuesAttributeSelectsDBError = (res) => ({
	payload: res,
	type: GET_VALUES_ATTRIBUTES_SELECTS_ERROR,
});

export const getOptionsSelectToUpdateImage = (query, attribute) => {
	return async (dispatch) => {
		dispatch(getOptionsSelectToUpdateImageDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "options-update-image",
				data: { query: query, attribute },
			});
			dispatch(
				getOptionsSelectToUpdateImageDBExito({
					attribute,
					data: resp.data.data,
				}),
			);
		} catch (error) {
			dispatch(
				getOptionsSelectToUpdateImageDBError(
					"Error en el almacenado de los productos",
				),
				console.log(error),
			);
		}
	};
};

const getOptionsSelectToUpdateImageDB = () => ({
	type: GET_OPTIONS_TO_UPDATE_IMAGES,
});

const getOptionsSelectToUpdateImageDBExito = (res) => ({
	payload: res,
	type: GET_OPTIONS_TO_UPDATE_IMAGES_EXITO,
});
const getOptionsSelectToUpdateImageDBError = (res) => ({
	payload: res,
	type: GET_OPTIONS_TO_UPDATE_IMAGES_ERROR,
});

// Get Images From Sub Category
export const getImagesProduct = (code, subCategory, color, marca, vehiculo) => {
	return async (dispatch) => {
		dispatch(getImagesProductDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "imagesOfSubcategory",
				data: { query: { subCategory, color, marca, code, vehiculo } },
			});
			dispatch(getImagesProductDBExito(resp.data.data));
		} catch (error) {
			console.log(error);
			dispatch(
				getImagesProductDBError({
					msg: "Error en la obtención de las imágenes",
					text: error.response.data.msg,
				}),
				console.log(error),
			);
		}
	};
};

const getImagesProductDB = () => ({ type: GET_IMAGES_SUBCATEGORIES });

const getImagesProductDBExito = (res) => ({
	payload: res,
	type: GET_IMAGES_SUBCATEGORIES_EXITO,
});
const getImagesProductDBError = (res) => ({
	payload: res,
	type: GET_IMAGES_SUBCATEGORIES_ERROR,
});

//Update Images Products By Sub Category
export const updateImagesProduct = (
	code,
	subCategory,
	newImages,
	color,
	marca,
	vehiculo,
) => {
	return async (dispatch) => {
		dispatch(updateImagesProductDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "update-subCategoryImages",
				data: {
					newImages,
					query: { color, marca, subCategory, code, vehiculo },
				},
			});
			dispatch(updateImagesProductDBExito(resp.data.msg));
		} catch (error) {
			dispatch(
				updateImagesProductDBError(
					"Error en la actualización de las imagenes",
				),
				console.log(error),
			);
		}
	};
};

const updateImagesProductDB = () => ({ type: UPDATE_IMAGES_PRODUCT });

const updateImagesProductDBExito = (res) => ({
	payload: res,
	type: UPDATE_IMAGES_PRODUCT_EXITO,
});
const updateImagesProductDBError = (res) => ({
	payload: res,
	type: UPDATE_IMAGES_PRODUCT_ERROR,
});

//Reset Values Images Store
export const resetImagesReceivedStore = () => {
	return async (dispatch) => {
		dispatch(resetImagesReceived());
		try {
			dispatch(resetImagesReceivedExito());
		} catch (error) {
			dispatch(resetImagesReceivedError());
		}
	};
};

const resetImagesReceived = () => ({ type: RESET_IMAGES_RECEIVED_STORE });

const resetImagesReceivedExito = () => ({
	type: RESET_IMAGES_RECEIVED_STORE_EXITO,
});
const resetImagesReceivedError = (res) => ({
	payload: res,
	type: RESET_IMAGES_RECEIVED_STORE_ERROR,
});

export const resetOptionsReceivedStore = () => {
	return async (dispatch) => {
		dispatch(resetOptionsReceived());
		try {
			dispatch(resetOptionsReceivedExito());
		} catch (error) {
			dispatch(resetOptionsReceivedError());
		}
	};
};

const resetOptionsReceived = () => ({ type: RESET_OPTIONS_RECEIVED_STORE });

const resetOptionsReceivedExito = () => ({
	type: RESET_OPTIONS_RECEIVED_STORE_EXITO,
});
const resetOptionsReceivedError = (res) => ({
	payload: res,
	type: RESET_OPTIONS_RECEIVED_STORE_ERROR,
});

//Reset Values Images Store
export const resetResponseMsgsStore = () => {
	return async (dispatch) => {
		dispatch(resetResponseMsgs());
		try {
			dispatch(resetResponseMsgsExito());
		} catch (error) {
			dispatch(resetResponseMsgsError());
		}
	};
};

const resetResponseMsgs = () => ({ type: RESET_RESPONSE_MSGS });

const resetResponseMsgsExito = () => ({
	type: RESET_RESPONSE_MSGS_EXITO,
});
const resetResponseMsgsError = (res) => ({
	payload: res,
	type: RESET_RESPONSE_MSGS_ERROR,
});

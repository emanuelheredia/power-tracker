import {
	UPLOAD_ALL_PRODUCTS,
	UPLOAD_ALL_PRODUCTS_EXITO,
	UPLOAD_ALL_PRODUCTS_ERROR,
	UPDATE_ALL_PRODUCTS,
	UPDATE_ALL_PRODUCTS_EXITO,
	UPDATE_ALL_PRODUCTS_ERROR,
	UPDATE_IMAGES_SUBCATEGORIES,
	UPDATE_IMAGES_SUBCATEGORIES_EXITO,
	UPDATE_IMAGES_SUBCATEGORIES_ERROR,
	GET_ALL_PRODUCTS,
	GET_ALL_PRODUCTS_ERROR,
	GET_ALL_PRODUCTS_EXITO,
	GET_OPTIONS_TO_UPDATE_IMAGES,
	GET_OPTIONS_TO_UPDATE_IMAGES_EXITO,
	GET_OPTIONS_TO_UPDATE_IMAGES_ERROR,
	GET_IMAGES_SUBCATEGORIES,
	GET_IMAGES_SUBCATEGORIES_EXITO,
	GET_IMAGES_SUBCATEGORIES_ERROR,
	RESET_REQUESTED_VALUES,
	RESET_REQUESTED_VALUES_EXITO,
	RESET_REQUESTED_VALUES_ERROR,
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

//ADD NEW PRODUCT
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

// UPDATE PRICES FROM DB
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

export const getOptionsSelectToUpdateImage = (subCategory, attribute) => {
	return async (dispatch) => {
		dispatch(getOptionsSelectToUpdateImageDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "options-update-image",
				data: { subCategory, attribute },
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
export const getImagesOfSubCategories = (subCategory, color, marca) => {
	return async (dispatch) => {
		dispatch(getImagesOfSubCategoriesDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "imagesOfSubcategory",
				data: { subCategory, query: { color, marca } },
			});
			dispatch(getImagesOfSubCategoriesDBExito(resp.data.data));
		} catch (error) {
			dispatch(
				getImagesOfSubCategoriesDBError(
					"Error en la obtención de los colores",
				),
				console.log(error),
			);
		}
	};
};

const getImagesOfSubCategoriesDB = () => ({ type: GET_IMAGES_SUBCATEGORIES });

const getImagesOfSubCategoriesDBExito = (res) => ({
	payload: res,
	type: GET_IMAGES_SUBCATEGORIES_EXITO,
});
const getImagesOfSubCategoriesDBError = (res) => ({
	payload: res,
	type: GET_IMAGES_SUBCATEGORIES_ERROR,
});

//Update Images Products By Sub Category
export const updateImagesSubCategoriesProducts = (
	subCategory,
	newImages,
	color,
	marca,
) => {
	return async (dispatch) => {
		dispatch(updateImagesSubCategories());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "update-subCategoryImages",
				data: { subCategory, newImages, query: { color, marca } },
			});
			dispatch(updateImagesSubCategoriesExito(resp.data.msg));
		} catch (error) {
			dispatch(
				updateImagesSubCategoriesError(
					"Error en la actualización de las imagenes",
				),
				console.log(error),
			);
		}
	};
};

const updateImagesSubCategories = () => ({ type: UPDATE_IMAGES_SUBCATEGORIES });

const updateImagesSubCategoriesExito = (res) => ({
	payload: res,
	type: UPDATE_IMAGES_SUBCATEGORIES_EXITO,
});
const updateImagesSubCategoriesError = (res) => ({
	payload: res,
	type: UPDATE_IMAGES_SUBCATEGORIES_ERROR,
});

//Reset Values Images Store
export const resetRequestedValuesStore = () => {
	return async (dispatch) => {
		dispatch(resetRequestedValues());
		try {
			dispatch(resetRequestedValuesExito());
		} catch (error) {
			dispatch(resetRequestedValuesError());
		}
	};
};

const resetRequestedValues = () => ({ type: RESET_REQUESTED_VALUES });

const resetRequestedValuesExito = () => ({
	type: RESET_REQUESTED_VALUES_EXITO,
});
const resetRequestedValuesError = (res) => ({
	payload: res,
	type: RESET_REQUESTED_VALUES_ERROR,
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

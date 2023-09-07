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
	GET_CATEGORY_COLORS,
	GET_CATEGORY_COLORS_EXITO,
	GET_CATEGORY_COLORS_ERROR,
	GET_IMAGES_SUBCATEGORIES,
	GET_IMAGES_SUBCATEGORIES_EXITO,
	GET_IMAGES_SUBCATEGORIES_ERROR,
	RESET_REQUESTED_VALUES,
	RESET_REQUESTED_VALUES_EXITO,
	RESET_REQUESTED_VALUES_ERROR,
	GET_VALUES_ATTRIBUTES_SELECTS,
	GET_VALUES_ATTRIBUTES_SELECTS_EXITO,
	GET_VALUES_ATTRIBUTES_SELECTS_ERROR,
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

export const getCategoryColors = (category) => {
	return async (dispatch) => {
		dispatch(getCategoryColorsDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "color-category",
				data: { category },
			});
			dispatch(getCategoryColorsDBExito(resp.data.data));
		} catch (error) {
			dispatch(
				getCategoryColorsDBError(
					"Error en el almacenado de los productos",
				),
				console.log(error),
			);
		}
	};
};

const getCategoryColorsDB = () => ({ type: GET_CATEGORY_COLORS });

const getCategoryColorsDBExito = (res) => ({
	payload: res,
	type: GET_CATEGORY_COLORS_EXITO,
});
const getCategoryColorsDBError = (res) => ({
	payload: res,
	type: GET_CATEGORY_COLORS_ERROR,
});

// Get Images From Sub Category
export const getImagesOfSubCategories = (subCategory, color) => {
	return async (dispatch) => {
		dispatch(getImagesOfSubCategoriesDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "imagesOfSubcategory",
				data: { subCategory, color },
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
	color,
	newImages,
) => {
	return async (dispatch) => {
		dispatch(updateImagesSubCategories());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "update-subCategoryImages",
				data: { subCategory, color, newImages },
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

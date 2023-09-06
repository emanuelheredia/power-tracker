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
	GET_COLORS,
	GET_COLORS_EXITO,
	GET_COLORS_ERROR,
	GET_IMAGES_SUBCATEGORIES,
	GET_IMAGES_SUBCATEGORIES_EXITO,
	GET_IMAGES_SUBCATEGORIES_ERROR,
	RESET_REQUESTED_VALUES,
	RESET_REQUESTED_VALUES_EXITO,
	RESET_REQUESTED_VALUES_ERROR,
	GET_CATEGORIES,
	GET_CATEGORIES_EXITO,
	GET_CATEGORIES_ERROR,
	GET_SUBCATEGORIES,
	GET_SUBCATEGORIES_EXITO,
	GET_SUBCATEGORIES_ERROR,
} from "../types";
import clienteAxios from "../../../src/axios";

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
export const getProductsColors = (categories) => {
	return async (dispatch) => {
		dispatch(getProductsColorsDB());
		try {
			let resp = await clienteAxios({
				method: "post",
				url: "color-filter-values",
				data: { categories },
			});
			dispatch(getProductsColorsDBExito(resp.data.data));
		} catch (error) {
			dispatch(
				getProductsColorsDBError(
					"Error en la obtención de los colores",
				),
				console.log(error),
			);
		}
	};
};

const getProductsColorsDB = () => ({ type: GET_COLORS });

const getProductsColorsDBExito = (res) => ({
	payload: res,
	type: GET_COLORS_EXITO,
});
const getProductsColorsDBError = (res) => ({
	payload: res,
	type: GET_COLORS_ERROR,
});

export const getProductsCategories = () => {
	return async (dispatch) => {
		dispatch(getProductsCategoriesDB());
		try {
			let resp = await clienteAxios({
				method: "get",
				url: "categories-filter-values",
			});
			dispatch(getProductsCategoriesDBExito(resp.data.data));
		} catch (error) {
			dispatch(
				getProductsCategoriesDBError(
					"Error en la obtención de las categorias",
				),
				console.log(error),
			);
		}
	};
};

const getProductsCategoriesDB = () => ({
	type: GET_CATEGORIES,
});
const getProductsCategoriesDBExito = (res) => ({
	payload: res,
	type: GET_CATEGORIES_EXITO,
});
const getProductsCategoriesDBError = (res) => ({
	payload: res,
	type: GET_CATEGORIES_ERROR,
});

export const getSubCategories = () => {
	return async (dispatch) => {
		dispatch(getSubCategoriesDB());
		try {
			let resp = await clienteAxios({
				method: "get",
				url: "subCategories-filter-values",
			});
			dispatch(getSubCategoriesDBExito(resp.data.data));
		} catch (error) {
			dispatch(
				getSubCategoriesDBError(
					"Error en la obtención de las sub categorias",
				),
				console.log(error),
			);
		}
	};
};

const getSubCategoriesDB = () => ({
	type: GET_SUBCATEGORIES,
});
const getSubCategoriesDBExito = (res) => ({
	payload: res,
	type: GET_SUBCATEGORIES_EXITO,
});
const getSubCategoriesDBError = (res) => ({
	payload: res,
	type: GET_SUBCATEGORIES_ERROR,
});

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

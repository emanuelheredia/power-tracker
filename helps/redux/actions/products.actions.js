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
} from "../types";
import axios from "axios";

import { collection, addDoc, deleteDoc } from "firebase/firestore";
import {
	db,
	deleteProductByID,
	getAllProductsDB,
	getProductsIDByConsulta,
	queryToDeleteDocs,
} from "../../../firebase/firebase";

export const uploadProducts = (products) => {
	return async (dispatch) => {
		dispatch(uploadAllProducts());
		try {
			let resp = await axios.post(
				"http://localhost:3001/products",
				products,
			);
			console.log(resp);
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

export const uploadOrUpdateProducts = (products, proveedor) => {
	return async (dispatch) => {
		dispatch(updateAllProducts());
		try {
			const query = queryToDeleteDocs(proveedor);
			const productsIDs = await getProductsIDByConsulta(query);
			productsIDs.map((el) => deleteProductByID(el));
			products.forEach(async (element) => {
				let refDoc = collection(db, "productos");
				await addDoc(refDoc, element);
			});
			dispatch(updateAllProductsExito("Actualización exitoso"));
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
			const allProducts = await getAllProductsDB();
			dispatch(getProductsExito(allProducts));
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
			let resp = await axios.post(
				"http://localhost:3001/color-category",
				{ category },
			);
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

export const updateImagesSubCategoriesProducts = () => {
	return async (dispatch) => {
		dispatch(updateImagesSubCategories());
		try {
			const allProducts = await getAllProductsDB();
			dispatch(updateImagesSubCategoriesExito(allProducts));
		} catch (error) {
			dispatch(
				updateImagesSubCategoriesError(
					"Error en la obtención de los productos",
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

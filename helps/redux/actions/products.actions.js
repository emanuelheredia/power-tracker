import {
	UPLOAD_ALL_PRODUCTS,
	UPLOAD_ALL_PRODUCTS_EXITO,
	UPLOAD_ALL_PRODUCTS_ERROR,
	UPDATE_ALL_PRODUCTS,
	UPDATE_ALL_PRODUCTS_EXITO,
	UPDATE_ALL_PRODUCTS_ERROR,
} from "../types";
import { collection, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export const uploadProducts = (products, proveedor) => {
	console.log(products);
	return async (dispatch) => {
		dispatch(uploadAllProducts());
		try {
			products.forEach(async (element) => {
				let refDoc = collection(db, "productos");
				await addDoc(refDoc, element);
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

export const updateProducts = (products, proveedor) => {
	console.log(products);
	return async (dispatch) => {
		dispatch(updateAllProducts());
		try {
			const productosRef = collection(db, "productos");
			await deleteDoc(productosRef.where("proveedor", "==", proveedor));
			products.forEach(async (element) => {
				await addDoc(
					productosRef.where("proveedor", "==", proveedor),
					element,
				);
			});

			dispatch(updateAllProductsExito("Almacenado exitoso"));
		} catch (error) {
			dispatch(
				updateAllProductsError(
					"Error en el almacenado de los productos",
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

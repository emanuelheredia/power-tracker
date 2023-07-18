import {
	UPLOAD_ALL_PRODUCTS,
	UPLOAD_ALL_PRODUCTS_EXITO,
	UPLOAD_ALL_PRODUCTS_ERROR,
	UPDATE_ALL_PRODUCTS,
	UPDATE_ALL_PRODUCTS_EXITO,
	UPDATE_ALL_PRODUCTS_ERROR,
} from "../types";
import { collection, addDoc, deleteDoc } from "firebase/firestore";
import {
	db,
	deleteProductByID,
	getProductsIDByConsulta,
	queryToDeleteDocs,
} from "../../../firebase/firebase";

export const uploadProducts = (products) => {
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

export const uploadOrUpdateProducts = (products, proveedor) => {
	console.log(products);
	return async (dispatch) => {
		dispatch(updateAllProducts());
		try {
			const query = queryToDeleteDocs(proveedor);
			const productsIDs = await getProductsIDByConsulta(query);
			console.log(productsIDs);
			productsIDs.map((el) => deleteProductByID(el));
			products.forEach(async (element) => {
				let refDoc = collection(db, "productos");
				await addDoc(refDoc, element);
			});
			dispatch(uploadAllProductsExito("Actualización exitoso"));
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

import {
	ADD_PTODUCT_TO_CART,
	ADD_PTODUCT_TO_CART_EXITO,
	ADD_PTODUCT_TO_CART_ERROR,
} from "../types";

export const addProductToCart = (cart) => {
	return async (dispatch) => {
		dispatch(addProduct());
		try {
			dispatch(addProductExito(cart));
		} catch (error) {
			dispatch(addProductError());
		}
	};
};

const addProduct = () => ({ type: ADD_PTODUCT_TO_CART });

const addProductExito = (cart) => ({
	type: ADD_PTODUCT_TO_CART_EXITO,
	payload: cart,
});
const addProductError = (res) => ({
	payload: res,
	type: ADD_PTODUCT_TO_CART_ERROR,
});

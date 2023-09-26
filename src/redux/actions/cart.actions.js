import {
	ADD_PRODUCT_TO_CART,
	ADD_PRODUCT_TO_CART_EXITO,
	ADD_PRODUCT_TO_CART_ERROR,
	UPDATE_PRODUCT_AMOUNT_CART,
	UPDATE_PRODUCT_AMOUNT_CART_EXITO,
	UPDATE_PRODUCT_AMOUNT_CART_ERROR,
	RESET_RESPONSE_MSGS_CART,
	RESET_RESPONSE_MSGS_CART_ERROR,
	RESET_RESPONSE_MSGS_CART_EXITO,
	DELETE_PRODUCT_TO_CART,
	DELETE_PRODUCT_TO_CART_EXITO,
	DELETE_PRODUCT_TO_CART_ERROR,
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

const addProduct = () => ({ type: ADD_PRODUCT_TO_CART });

const addProductExito = (cart) => ({
	type: ADD_PRODUCT_TO_CART_EXITO,
	payload: cart,
});
const addProductError = (res) => ({
	payload: res,
	type: ADD_PRODUCT_TO_CART_ERROR,
});

export const deleteProductFromCart = (product) => {
	return async (dispatch) => {
		dispatch(deleteProductCart());
		try {
			dispatch(deleteProductCartExito(product));
		} catch (error) {
			dispatch(deleteProductCartError());
		}
	};
};

const deleteProductCart = () => ({ type: DELETE_PRODUCT_TO_CART });

const deleteProductCartExito = (product) => ({
	type: DELETE_PRODUCT_TO_CART_EXITO,
	payload: product,
});
const deleteProductCartError = (res) => ({
	type: DELETE_PRODUCT_TO_CART_ERROR,
});

export const updateAmountProductCart = (product) => {
	return async (dispatch) => {
		dispatch(updateAmountProduct());
		try {
			dispatch(updateAmountProductExito(product));
		} catch (error) {
			dispatch(updateAmountProductError());
		}
	};
};

const updateAmountProduct = () => ({ type: UPDATE_PRODUCT_AMOUNT_CART });

const updateAmountProductExito = (product) => ({
	type: UPDATE_PRODUCT_AMOUNT_CART_EXITO,
	payload: product,
});
const updateAmountProductError = () => ({
	type: UPDATE_PRODUCT_AMOUNT_CART_ERROR,
});

export const resetResponseMsgsCartStore = () => {
	return async (dispatch) => {
		dispatch(resetResponseMsgsCart());
		try {
			dispatch(resetResponseMsgsCartExito());
		} catch (error) {
			dispatch(resetResponseMsgsCartError());
		}
	};
};

const resetResponseMsgsCart = () => ({ type: RESET_RESPONSE_MSGS_CART });

const resetResponseMsgsCartExito = () => ({
	type: RESET_RESPONSE_MSGS_CART_EXITO,
});
const resetResponseMsgsCartError = () => ({
	type: RESET_RESPONSE_MSGS_CART_ERROR,
});

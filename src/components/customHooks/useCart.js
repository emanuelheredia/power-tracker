import { useEffect, useState } from "react";
import { formatingPrice, formatingTotalPrice } from "../helpers/helpers";
import { useSelector, useDispatch } from "react-redux";
import {
	updateAmountProductCart,
	deleteProductFromCart,
} from "../../redux/actions/cart.actions";
export function useCart(amount) {
	console.log(amount);
	const dispatch = useDispatch();
	const cartInfo = useSelector((state) => state.cart.cart);
	const [totalPriceFormated, setTotalPriceFormated] = useState(0);
	const [amountUpdated, setAmountUpdated] = useState(0);
	console.log(cartInfo);
	useEffect(() => {
		setAmountUpdated(amount);
	}, []);
	useEffect(() => {
		setTotalPriceFormated(
			formatingTotalPrice(
				getTotalPrice(cartInfo).toString().replace(".", ""),
			),
		);
	}, [cartInfo]);
	const handleUpdateProductToCart = (code) => {
		const cartCopy = [...cartInfo];
		cartCopy.map((el) => {
			if (el.product.code === code) {
				dispatch(
					updateAmountProductCart({
						product: el.product,
						amount: amountUpdated,
					}),
				);
			}
		});
	};
	const hanldeDeleteProductCart = (product) => {
		dispatch(deleteProductFromCart(product));
	};
	const precioTotal = (price) => price * amount;
	const getTotalPrice = () => {
		let totalCost = 0;
		cartInfo.map((product) => {
			let costo = formatingPrice(
				product.amount * product.product.price,
				product.product.proveedor,
			);
			let formatedCost = Number(costo.replaceAll(".", ""));
			totalCost += formatedCost;
		});
		return totalCost;
	};

	return {
		cartInfo,
		totalPriceFormated,
		handleUpdateProductToCart,
		hanldeDeleteProductCart,
		precioTotal,
		amountUpdated,
		setAmountUpdated,
	};
}

import React, { useEffect, useState } from "react";
import { formatingPrice } from "../helpers/helpers";
import {
	updateAmountProductCart,
	deleteProductFromCart,
} from "../../redux/actions/cart.actions";
import { useDispatch } from "react-redux";

const ProductCardCart = ({ productInfo, cart }) => {
	const dispatch = useDispatch();
	const { amount, product } = productInfo;
	const { code, images, price, proveedor, vehiculo, subCategory, color } =
		product;
	const precioTotal = price * amount;
	const [amountUpdated, setAmountUpdated] = useState(0);
	useEffect(() => {
		setAmountUpdated(amount);
	}, [cart]);
	const handleUpdateProductToCart = () => {
		const cartCopy = [...cart];
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
	const hanldeDeleteProductCart = () => {
		dispatch(deleteProductFromCart(product));
	};
	const disabledButtonStyle = {
		opacity: 0.2,
		cursor: "default",
	};
	return (
		<div className="productCardCart-container">
			<img src={images[0]} className="productCardCart-image" />
			<div className="productCardCart-infoContainer">
				<p>{code}</p>
				<p style={{ fontWeight: "bolder" }}>{subCategory}</p>
				<p>{vehiculo}</p>
				<p>{color.toUpperCase()}</p>
				<p>{proveedor}</p>
				<p>$ {formatingPrice(price, proveedor)}</p>
			</div>
			<div className="productCardCart-counterContainer">
				<p
					className="productCardCart-btnAmount"
					style={amountUpdated < 1 ? disabledButtonStyle : null}
					onClick={
						amountUpdated > 0
							? () => setAmountUpdated(amountUpdated - 1)
							: null
					}
				>
					-
				</p>
				<p className="productCardCart-amount">{amountUpdated}</p>
				<p
					className="productCardCart-btnAmount"
					onClick={() => setAmountUpdated(amountUpdated + 1)}
				>
					+
				</p>
			</div>
			{amount === amountUpdated && (
				<div className="productCardCart-priceTotalContainer">
					<p>TOTAL</p>
					<p>$ {formatingPrice(precioTotal, proveedor)}</p>
				</div>
			)}
			{amount !== amountUpdated && amountUpdated > 0 && (
				<button
					onClick={handleUpdateProductToCart}
					className="productCardCart-btnAmountChaned"
				>
					Actualizar
				</button>
			)}
			{amountUpdated === 0 && (
				<button
					onClick={hanldeDeleteProductCart}
					className="productCardCart-btnAmountChaned"
				>
					Quitar Producto
				</button>
			)}
		</div>
	);
};

export default ProductCardCart;

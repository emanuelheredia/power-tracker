import React from "react";
import { formatingPrice } from "../helpers/helpers";
import { useCart } from "../customHooks/useCart";

const ProductCardCart = ({ productInfo }) => {
	const { amount, product } = productInfo;
	const { code, images, price, proveedor, vehiculo, subCategory, color } =
		product;
	const {
		amountUpdated,
		setAmountUpdated,
		hanldeDeleteProductCart,
		handleUpdateProductToCart,
		precioTotal,
	} = useCart(amount);
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
					<p>$ {formatingPrice(precioTotal(price), proveedor)}</p>
				</div>
			)}
			{amount !== amountUpdated && amountUpdated > 0 && (
				<button
					onClick={() => handleUpdateProductToCart(code)}
					className="productCardCart-btnAmountChaned"
				>
					Actualizar
				</button>
			)}
			{amountUpdated === 0 && (
				<button
					onClick={() => hanldeDeleteProductCart(product)}
					className="productCardCart-btnAmountChaned"
				>
					Quitar Producto
				</button>
			)}
		</div>
	);
};

export default ProductCardCart;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCardCart from "./ProductCardCart";
import { formatingPrice, formatingTotalPrice } from "../helpers/helpers";

const Cart = () => {
	const cart = useSelector((state) => state.cart.cart);
	const [totalPriceFormated, setTotalPriceFormated] = useState(0);
	const getTotalPrice = (cart) => {
		let totalCost = 0;
		cart.map((product) => {
			let costo = formatingPrice(
				product.amount * product.product.price,
				product.product.proveedor,
			);
			let formatedCost = Number(costo.replaceAll(".", ""));
			totalCost += formatedCost;
		});
		return totalCost;
	};
	useEffect(() => {
		setTotalPriceFormated(
			formatingTotalPrice(
				getTotalPrice(cart).toString().replace(".", ""),
			),
		);
	}, [cart]);
	return (
		<div className="cart-container">
			<h2 className="Cart-title">Carrito</h2>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				}}
			>
				{cart.length > 0 &&
					cart.map((product) => (
						<ProductCardCart
							key={product._id}
							productInfo={product}
							cart={cart}
						/>
					))}
			</div>
			{cart.length > 0 ? (
				<div className="productCardCart-totalPriceContainer">
					<p>COSTO TOTAL</p>
					<p style={{ fontWeight: "bolder" }}>
						{" "}
						${totalPriceFormated}
					</p>
				</div>
			) : (
				<h3>Sin productos en el carrito</h3>
			)}
		</div>
	);
};

export default Cart;

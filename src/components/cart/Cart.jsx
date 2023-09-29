import React from "react";
import ProductCardCart from "./ProductCardCart";
import { useCart } from "../customHooks/useCart";

const Cart = () => {
	const { cartInfo, totalPriceFormated } = useCart();
	return (
		<div className="cart-container">
			<h2 className="Cart-title">Carrito</h2>
			{
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					{cartInfo.length > 0 &&
						cartInfo.map((product) => (
							<ProductCardCart
								key={product._id}
								productInfo={product}
							/>
						))}
				</div>
			}
			{cartInfo.length > 0 ? (
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

import React from "react";
import ProductModal from "./productModal/ProductModal";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/actions/products.actions";
import { formatingPrice } from "../helpers/helpers";
import CartModal from "./productModal/CartModal";

const CardProduct = ({ product, ocultarPrice }) => {
	const auth = useSelector((state) => state.auth);
	const {
		code,
		category,
		proveedor,
		mark,
		moreInfo,
		price,
		subCategory,
		color,
		vehiculo,
	} = product;
	const dispatch = useDispatch();
	const handleDelete = () => {
		if (confirm("Está seguro que desea eliminar este producto?")) {
			dispatch(deleteProduct(product._id));
		} else {
			console.log("no confirmado");
		}
	};
	return (
		<div className="userDashBoard-container-rowTable">
			{auth.login && (
				<FiTrash2
					className="cardProduct-deleteIcon"
					onClick={handleDelete}
				/>
			)}
			{/* 			{!auth.login && <CartModal product={product} />}
			 */}{" "}
			<div className="userDashBoard-item-celdaCode">
				<p>Codigo</p>
				<p>{code ? code : "sin datos"}</p>
			</div>
			<div className="userDashBoard-item-celdaCategory">
				<p>Categoria</p>
				<p>{category}</p>
			</div>
			<ProductModal product={product} />
			<div className="userDashBoard-item-celdaModelo">
				<p>Vehículos</p>
				<p>{vehiculo !== "sin datos" ? vehiculo.toUpperCase() : ""}</p>
			</div>
			<div className="userDashBoard-item-celdaProveedor">
				<p>Marca</p>
				<p>{proveedor !== "sin datos" ? proveedor : ""}</p>
			</div>
			<div className="userDashBoard-item-celdaMarca">
				<p>Marca Auto</p>
				<p>{mark !== "sin datos" ? mark : ""}</p>
			</div>
			<div className="userDashBoard-item-celdaMoreInfo">
				<p>Mas info</p>
				<p>{moreInfo !== "sin datos" ? moreInfo : ""}</p>
			</div>
			<div className="userDashBoard-item-celdaColor">
				<p>Color</p>
				<p>{color?.toLocaleUpperCase()}</p>
			</div>
			<div className="userDashBoard-item-celdaSubCategory">
				<p>SubCategoria</p>
				<p>{subCategory?.toLocaleUpperCase()}</p>
			</div>
			<div className="userDashBoard-item-celdaPrice">
				<p>Precio</p>
				{!ocultarPrice && (
					<p>
						{price !== 0 && !isNaN(price)
							? "$ " + formatingPrice(price, proveedor)
							: ""}
					</p>
				)}
			</div>
		</div>
	);
};

export default CardProduct;

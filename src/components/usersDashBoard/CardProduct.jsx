import React, { useState } from "react";
import ProductModal from "./productModal/ProductModal";
import { FiTrash2, FiEdit3, FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteProduct,
	updateProducts,
	getAllProducts,
} from "../../redux/actions/products.actions";
import { formatingPrice } from "../helpers/helpers";
import CartModal from "./productModal/CartModal";

const CardProduct = ({ product, ocultarPrice }) => {
	const auth = useSelector((state) => state.auth);
	const [editPrice, setEditPrice] = useState(false);
	const [newPrice, setNewPrice] = useState("");
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
		}
	};
	const handleNewPriceEdit = (e) => {
		setNewPrice(Number(e.target.value));
	};
	const handlePriceSubmit = () => {
		setEditPrice(false);
		dispatch(updateProducts([{ code: code, price: newPrice }]));
		dispatch(getAllProducts());
	};
	return (
		<div className="userDashBoard-container-rowTable">
			{auth.login && (
				<FiTrash2
					className="cardProduct-deleteIcon"
					onClick={handleDelete}
				/>
			)}
			{!auth.login && <CartModal product={product} />}
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
				{!ocultarPrice && !editPrice && (
					<p>
						{price !== 0 && !isNaN(price)
							? "$ " + formatingPrice(price, proveedor)
							: ""}
						{auth.login && (
							<FiEdit3
								className="editPrice-icon"
								onClick={() => setEditPrice(true)}
							/>
						)}
					</p>
				)}
				{editPrice && (
					<div className="editPriceInput-container">
						<input type="number" onChange={handleNewPriceEdit} />
						{newPrice > 0 && (
							<FiCheck
								className="editPrice-checkIcon"
								onClick={handlePriceSubmit}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CardProduct;

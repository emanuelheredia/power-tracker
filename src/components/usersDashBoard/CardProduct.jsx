import React from "react";
import ProductModal from "./productModal/ProductModal";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/actions/products.actions";

const CardProduct = ({ product, ocultarPrice }) => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const formatearPrecio = (precio) => {
		if (product.proveedor == "ZIEL TECHNOLOGY") {
			let indexOfPoint = precio.toString().indexOf(".");
			let firstClean = precio.toString().slice(0, indexOfPoint + 4);
			return firstClean;
		}
		let firstClean = precio.toFixed(0).replace(".", ",");
		let cantidadDigitos = firstClean.split("").length;
		let indexToAddPoint1 = cantidadDigitos - 3;
		let indexToAddPoint2 = cantidadDigitos - 6;
		let priceAsArray = firstClean.split("");
		priceAsArray.splice(indexToAddPoint1, 0, ".");
		if (indexToAddPoint2 > 0) {
			priceAsArray.splice(indexToAddPoint2, 0, ".");
		}
		return priceAsArray.join("");
	};
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
			<div className="userDashBoard-item-celdaCode">
				<p>Codigo</p>
				<p>{product.code ? product.code : "sin datos"}</p>
			</div>
			<div className="userDashBoard-item-celdaCategory">
				<p>Categoria</p>
				<p>{product.category}</p>
			</div>
			<ProductModal
				product={product}
				productImage={"hola"}
				categorie={product.category}
			/>
			<div className="userDashBoard-item-celdaModelo">
				<p>Vehículos</p>
				<p>
					{product.vehiculo !== "sin datos"
						? product.vehiculo.toUpperCase()
						: ""}
				</p>
			</div>
			<div className="userDashBoard-item-celdaProveedor">
				<p>Marca</p>
				<p>
					{product.proveedor !== "sin datos" ? product.proveedor : ""}
				</p>
			</div>
			<div className="userDashBoard-item-celdaMarca">
				<p>Marca Auto</p>
				<p>{product.mark !== "sin datos" ? product.mark : ""}</p>
			</div>
			<div className="userDashBoard-item-celdaMoreInfo">
				<p>Mas info</p>
				<p>
					{product.moreInfo !== "sin datos" ? product.moreInfo : ""}
				</p>
			</div>
			<div className="userDashBoard-item-celdaColor">
				<p>Color</p>
				<p>{product.color?.toLocaleUpperCase()}</p>
			</div>
			<div className="userDashBoard-item-celdaSubCategory">
				<p>SubCategoria</p>
				<p>{product.subCategory?.toLocaleUpperCase()}</p>
			</div>
			<div className="userDashBoard-item-celdaPrice">
				<p>Precio</p>
				{!ocultarPrice && (
					<p>
						{product.price !== 0 && !isNaN(product.price)
							? "$ " + formatearPrecio(product.price)
							: ""}
					</p>
				)}
			</div>
		</div>
	);
};

export default CardProduct;

import React from "react";
import ProductModal from "./productModal/ProductModal";
import "./cardProduct.css";
const CardProduct = ({ product, getProductAttribute, ocultarPrice }) => {
	return (
		<div className="userDashBoard-container-rowTable">
			{" "}
			<div className="userDashBoard-item-celdaCode">
				<p>Codigo</p>
				<p>{product.code ? product.code : "sin datos"}</p>
			</div>
			<div className="userDashBoard-item-celdaCategory">
				<p>Categoria</p>
				<p>{getProductAttribute(product.code, "categoria")}</p>
			</div>
			<ProductModal
				product={product}
				productImage={"hola"}
				getProductAttribute={getProductAttribute}
				categorie={getProductAttribute(product.code, "categoria")}
			/>
			<div className="userDashBoard-item-celdaModelo">
				<p>Vehículos</p>
				<p>
					{product.vehiculo !== "sin datos" ? product.vehiculo : ""}
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
				<p>{product.marca !== "sin datos" ? product.marca : ""}</p>
			</div>
			<div className="userDashBoard-item-celdaMoreInfo">
				<p>Mas info</p>
				<p>
					{product.moreInfo !== "sin datos" ? product.moreInfo : ""}
				</p>
			</div>
			<div className="userDashBoard-item-celdaColor">
				<p>Color</p>
				<p>
					{getProductAttribute(
						product.code,
						"color",
					).toLocaleUpperCase()}
				</p>
			</div>
			<div className="userDashBoard-item-celdaSubCategory">
				<p>SubCategoria</p>
				<p>
					{getProductAttribute(
						product.code,
						"subCategoria",
					).toLocaleUpperCase()}
				</p>
			</div>
			<div className="userDashBoard-item-celdaPrice">
				<p>Precio</p>
				{!ocultarPrice && (
					<p>
						{product.price !== "sin datos" && !isNaN(product.price)
							? "$ " + product.price.toFixed(0).replace(".", ",")
							: ""}
					</p>
				)}
			</div>
		</div>
	);
};

export default CardProduct;

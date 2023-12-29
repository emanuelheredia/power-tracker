import React from "react";
import { Link, useParams } from "react-router-dom";
import { imagesProductsHome } from "../../../../helps/guide.js";
const ProductDescripcion = () => {
	console.log(imagesProductsHome);
	const { productDescription: productName } = useParams();
	const getProductImage = () => {
		const element = imagesProductsHome.filter(
			(product) => product.name === productName,
		)[0];
		return element.images;
	};
	console.log(imagesProductsHome[productName]);
	return (
		<div className="productDescriotion_container">
			{" "}
			<Link to="/" className="carAccessories_btnGoBack">
				VOLVER
			</Link>
			<h2>{productName}</h2>
			<div className="productDescription_contentContainer">
				<img src={getProductImage()} alt="" />
			</div>
		</div>
	);
};

export default ProductDescripcion;

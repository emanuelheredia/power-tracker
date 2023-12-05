import React, { useEffect } from "react";
import ProductHomeCard from "./ProductHomeCard";
import { imagesProductsHome } from "../../../../helps/guide";
const ProductsHomeList = () => {
	const products = imagesProductsHome;
	return (
		<div className="brandsList_container">
			{products.map((el) => (
				<ProductHomeCard key={el.name} product={el} />
			))}
		</div>
	);
};

export default ProductsHomeList;

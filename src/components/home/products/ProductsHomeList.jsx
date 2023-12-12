import React, { useEffect, useRef } from "react";
import ProductHomeCard from "./ProductHomeCard";
import { imagesProductsHome } from "../../../../helps/guide";
import useVisibility from "../../customHooks/useVisibility";
const ProductsHomeList = () => {
	const products = imagesProductsHome;
	const containerRef = useRef(null);
	const { isVisible } = useVisibility({
		ref: containerRef,
		marginTop: "100px",
	});

	return (
		<div className="brandsList_container" ref={containerRef}>
			{products.map((el) => (
				<ProductHomeCard
					isVisible={isVisible}
					key={el.name}
					product={el}
				/>
			))}
		</div>
	);
};

export default ProductsHomeList;

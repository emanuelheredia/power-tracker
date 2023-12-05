import React from "react";
import { brands } from "../../../../helps/guide";
import CardBrand from "./CardBrand";

const BrandsList = () => {
	return (
		<div className="brandsList_container">
			{brands.map((el) => (
				<CardBrand key={el.name} brand={el} />
			))}
		</div>
	);
};

export default BrandsList;

import React from "react";

const CardBrand = ({ brand }) => {
	return (
		<div className="cardBrand_container">
			<img className="cardBrand_image" src={brand.img} alt={brand.name} />
			{/* 			<h4>{brand.name.toUpperCase()}</h4>
			 */}{" "}
		</div>
	);
};

export default CardBrand;

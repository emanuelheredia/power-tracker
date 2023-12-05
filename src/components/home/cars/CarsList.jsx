import React from "react";
import { imagesCarBrands, imagesCarModels } from "../../../../helps/guide";
import CarCard from "./CarCard";

const CarsList = () => {
	const brands = imagesCarModels;
	return (
		<div className="carListHome_container">
			{brands.map((el) => (
				<CarCard key={el.name} car={el} />
			))}
		</div>
	);
};

export default CarsList;

import React from "react";
import { imagesCarModels } from "../../../../helps/guide";
import CarCard from "./CarCard";

const CarsList = () => {
	const brands = imagesCarModels;
	console.log(brands);
	return (
		<div className="carListHome_container">
			{brands.map((el) => (
				<CarCard key={el.name} car={el} />
			))}
		</div>
	);
};

export default CarsList;

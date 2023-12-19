import React, { useState, useEffect, useRef } from "react";
import { imagesCarModels } from "../../../../helps/guide";
import CarCard from "./CarCard";
import useVisibility from "../../customHooks/useVisibility";

const CarsList = () => {
	const containerRef = useRef(null);
	const { isVisible } = useVisibility({
		ref: containerRef,
		marginTop: "200px",
	});
	const brands = imagesCarModels;
	return (
		<div className="carListHome_container" ref={containerRef}>
			{brands.map((el) => (
				<CarCard isVisible={isVisible} key={el.name} car={el} />
			))}
		</div>
	);
};

export default CarsList;

import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car, isVisible }) => {
	return (
		<div
			className={`carCardHome_container ${
				isVisible ? "animationGoUp" : ""
			}`}
		>
			<img src={car.img} />
			<h4>{car.name}</h4>
			<Link
				to={`/products/${car.name}`}
				className="carCardHome_backGroundHover"
			>
				<h3>VER ACCESORIOS</h3>
			</Link>
		</div>
	);
};

export default CarCard;

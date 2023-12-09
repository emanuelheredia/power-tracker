import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { imagesPorada } from "../../../helps/guide";
import BrandsList from "./brands/BrandsList";
import ProductsHomeList from "./products/ProductsHomeList";
import CarsList from "./cars/CarsList";

const home = () => {
	const AutoplaySlider = withAutoplay(AwesomeSlider);
	return (
		<div className="home_container">
			<div className="home_slider">
				<AutoplaySlider
					play={true}
					interval={6000}
					cancelOnInteraction={false}
				>
					{imagesPorada.map((img, index) => (
						<div key={index} className="home_imageSliderContainer">
							<img className="home_imageSlider" src={img} />
						</div>
					))}
				</AutoplaySlider>
			</div>
			<div className="home_cars">
				<h2>Vehiculos</h2>
				<CarsList />
			</div>
			<div className="home_products">
				<h2>Algunos de nuestros Productos</h2>
				<ProductsHomeList />
			</div>
			<div className="home_brands">
				<BrandsList />
			</div>
		</div>
	);
};

export default home;

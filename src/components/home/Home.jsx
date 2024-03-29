import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { imagesPorada, imagesProductsHome } from "../../../helps/guide";
import BrandsList from "./brands/BrandsList";
import CarsList from "./cars/CarsList";
import { RiWhatsappFill } from "react-icons/ri";
import Carousel from "./Carousel";
import ProductHomeCard from "./products/ProductHomeCard";
import { Route, Routes } from "react-router-dom";
import ProductDescripcion from "./products/ProductDescripcion";

const home = () => {
	const AutoplaySlider = withAutoplay(AwesomeSlider);
	const products = imagesProductsHome;

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
				<h2>Productos</h2>
				<Carousel amountShowElem={{ xs: 1, md: 2, lg: 3, xl: 4 }}>
					{products.map((el) => (
						<ProductHomeCard key={el.name} product={el} />
					))}
				</Carousel>
			</div>
			<div className="home_brands">
				<BrandsList />
			</div>
			<a
				href={"https://wa.me/5493516537131"}
				target="_blank"
				rel="noreferrer"
				className="home_btnWhatsapp"
			>
				<RiWhatsappFill />
			</a>
		</div>
	);
};

export default home;

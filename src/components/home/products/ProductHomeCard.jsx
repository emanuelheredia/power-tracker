import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";

const ProductHomeCard = ({ product, isVisible }) => {
	return (
		<Link
			to={`/${product.name}`}
			className={`productHomeCard_container ${
				isVisible ? "animationGoUp" : ""
			}`}
		>
			{/* 			<AutoplaySlider
				play={true}
				interval={6000}
				cancelOnInteraction={false}
			>
				{product.images.map((img, index) => (
					<div key={index} className="home_imageSliderContainer">
						<img
							className="productHomeCard_imageSlider"
							src={img}
						/>
					</div>
				))}
			</AutoplaySlider> */}
			<img src={product.images[0]} />
			<div className="productHomeCard_backGroundHover">
				<h3>{product.name}</h3>
			</div>
		</Link>
	);
};

export default ProductHomeCard;

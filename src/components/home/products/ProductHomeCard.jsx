import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const ProductHomeCard = ({ product }) => {
	return (
		<div className="productHomeCard_container">
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
		</div>
	);
};

export default ProductHomeCard;

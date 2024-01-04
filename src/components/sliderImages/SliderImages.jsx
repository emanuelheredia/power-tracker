import React from "react";
import { Spinner } from "../spinner/Spinner";
import { reduceSizeImage } from "../../../helps/helpers";
import { brands } from "../../../helps/guide";
import { FiTrash2 } from "react-icons/fi";

const SliderImages = ({
	images,
	imgSeliderSelected,
	setImgSeliderSelected,
	showLoader,
	anotherCondition,
	handleImageDelete,
	adminLogin,
	setShowLoader,
}) => {
	const handleNextImageClick = (add) => {
		const imagesAccount = images.length - 1;
		if (add === -1 && imgSeliderSelected === 0) return;
		if (add === 1 && imgSeliderSelected === imagesAccount) return;
		const imgActive = imgSeliderSelected + add;
		if (imgActive > imagesAccount) return setImgSeliderSelected(0);
		if (imgActive < 0) return setImgSeliderSelected(imagesAccount);
		return setImgSeliderSelected(imgActive);
	};
	return (
		<div className="sliderImages_slider">
			{showLoader && images?.length > 0 && (
				<div className="sliderImages_shadowBoxContentContainer">
					<Spinner />
				</div>
			)}
			{images?.length > 0 && anotherCondition && !showLoader && (
				<div className="sliderImages_nextPrevContainer">
					<button
						onClick={() => handleNextImageClick(-1)}
						className={
							imgSeliderSelected === 0 ? "buttonDisabled" : ""
						}
					>
						<p>Anterior</p>
						<span>❮</span>
					</button>
					<h3>{images[imgSeliderSelected]?.category}</h3>
					<button
						className={
							imgSeliderSelected === images?.length - 1
								? "buttonDisabled"
								: ""
						}
						onClick={() => handleNextImageClick(1)}
					>
						<p>Siguiente</p>
						<span>❯</span>
					</button>
				</div>
			)}
			{images?.length === 0 && (
				<h3
					style={{
						textAlign: "center",
						paddingTop: "20%",
					}}
				>
					Seleccione una categoría
				</h3>
			)}
			{images?.length > 0 && (
				<div
					key={images[imgSeliderSelected]?.images}
					className="sliderImages_imageSliderContainer"
				>
					{images.map((img, index) => (
						<div key={index}>
							<img
								key={index}
								onLoad={() => setShowLoader(false)}
								className="sliderImages_imageSlider"
								style={{
									display: `${
										index !== imgSeliderSelected && "none"
									}`,
								}}
								src={reduceSizeImage(img.images, true)}
							/>
							<img
								src={
									brands.filter(
										(brand) =>
											brand.name.toLocaleUpperCase() ===
											img.proveedor,
									)[0].img
								}
								className="sliderImages_brandImg"
								style={{
									display: `${
										index !== imgSeliderSelected && "none"
									}`,
								}}
							/>
						</div>
					))}
					{adminLogin && (
						<FiTrash2
							onClick={() =>
								handleImageDelete(
									images[imgSeliderSelected]?._id,
									images[imgSeliderSelected]?.public_id,
								)
							}
							className="sliderImages_btnDelete"
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default SliderImages;

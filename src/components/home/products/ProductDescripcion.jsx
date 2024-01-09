import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { imagesProductsHome } from "../../../../helps/guide.js";
import { useDispatch, useSelector } from "react-redux";
import {
	getAccessorieAttributes,
	getAccessorieImages,
	resetAccessorieState,
} from "../../../redux/actions/accesorieImages.actions.js";
import SliderImages from "../../sliderImages/SliderImages.jsx";
const ProductDescripcion = () => {
	const { productDescription: productName } = useParams();
	const [imgSeliderSelected, setImgSeliderSelected] = useState(0);
	const [showLoader, setShowLoader] = useState(false);
	const [description, setDescription] = useState([]);
	const { accesoriesAttributes, images } = useSelector(
		(state) => state.accesoriesImages,
	);
	const [categSelec, setCategSelec] = useState("");
	const getProductAttribute = (attribute) => {
		const element = imagesProductsHome.filter(
			(product) => product.name === productName,
		)[0];
		return element[attribute];
	};
	const dispatch = useDispatch();
	useEffect(() => {
		return () => dispatch(resetAccessorieState());
	}, []);
	useEffect(() => {
		dispatch(
			getAccessorieAttributes({ superCategory: productName }, "category"),
		);
	}, []);
	useEffect(() => {
		setImgSeliderSelected(0);
		if (accesoriesAttributes?.length > 0)
			dispatch(
				getAccessorieImages(
					{
						category: categSelec,
					},
					10,
				),
			);
		if (accesoriesAttributes?.length === 0)
			dispatch(getAccessorieImages({ superCategory: productName }, 10));
	}, [categSelec, accesoriesAttributes]);
	useEffect(() => {
		const onlyOneDescription = Array.isArray(
			getProductAttribute("description"),
		);
		if (onlyOneDescription)
			setDescription(getProductAttribute("description"));
		if (!onlyOneDescription && categSelec)
			setDescription(getProductAttribute("description")[categSelec]);
		return () => setDescription([]);
	}, [categSelec]);
	console.log(getProductAttribute("video"));
	return (
		<div className="productDescriotion_container">
			{" "}
			<Link to="/" className="carAccessories_btnGoBack">
				VOLVER
			</Link>
			<h2>{productName}</h2>
			<div className="productDescription_contentContainer">
				<div className="productDescription_categoriesContainer">
					{accesoriesAttributes?.map((categ) => (
						<button
							key={categ}
							onClick={() => setCategSelec(categ)}
						>
							{categ}
						</button>
					))}
				</div>

				{getProductAttribute("video") ? (
					<ReactPlayer
						url={getProductAttribute("video")}
						className="productDescription_react-player"
						playing
						height="530px"
					/>
				) : (
					<img
						className="productDescription_mainImage"
						src={getProductAttribute("images")[0]}
					/>
				)}
				<div className="productDescription_sliderContainer">
					<SliderImages
						images={images}
						anotherCondition={true}
						setShowLoader={setShowLoader}
						showLoader={showLoader}
						imgSeliderSelected={imgSeliderSelected}
						setImgSeliderSelected={setImgSeliderSelected}
					/>
				</div>
				<div className="productDescription_description">
					{description.map((linea) => (
						<p className="productDescription_descriptionLine">
							{linea}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductDescripcion;

import React, { useState, useEffect } from "react";
import "./imagesAdministration.css";
import { useDispatch, useSelector } from "react-redux";
import {
	getOptionsSelectToUpdateImage,
	getImagesOfSubCategories,
	resetRequestedValuesStore,
	updateImagesSubCategoriesProducts,
	getValuesAttributeSelects,
} from "../../../src/redux/actions/products.actions";
import Select from "react-select";
import ImageCard from "./ImageCard";
import { structuringSelectValues } from "../helpers/helpers.js";
const ImagesAdministration = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state);
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	const [categorieSelect, setCategoriaSelect] = useState("");
	const [colorSelect, setColorSelect] = useState("");
	const [marcaSelect, setMarcaSelect] = useState("");
	const [showBtnGetImages, setShowBtnGetImages] = useState(false);
	const [showBtnUpdateImages, setShowBtnUpdateImages] = useState(true);
	const [showBtnAddImage, setShowBtnAddImage] = useState(false);
	const [newUrlImages, setNewUrlImages] = useState([]);
	useEffect(() => {
		dispatch(resetRequestedValuesStore());
		if (products.subCategories.length === 0)
			dispatch(getValuesAttributeSelects("subCategory"));
	}, []);
	useEffect(() => {
		setNewUrlImages(products.imagesOfSubCategory);
	}, [products.imagesOfSubCategory]);
	useEffect(() => {
		if (categorieSelect) {
			dispatch(getOptionsSelectToUpdateImage(categorieSelect, "color"));
			dispatch(getOptionsSelectToUpdateImage(categorieSelect, "mark"));
		}
	}, [categorieSelect]);
	useEffect(() => {
		if (newUrlImages !== products.imagesOfSubCategory) {
			setShowBtnUpdateImages(true);
		} else {
			setShowBtnUpdateImages(false);
		}
	}, [newUrlImages]);
	useEffect(() => {
		if (
			categorieSelect &&
			(products.optionUpdateImage.mark.length === 0 || marcaSelect) &&
			((products.optionUpdateImage.color.length > 0 && colorSelect) ||
				products.optionUpdateImage.color.length == 0)
		) {
			setShowBtnGetImages(true);
			console.log("entre");
		} else {
			setShowBtnGetImages(false);
			console.log("entre3");
		}
		if (marcaSelect === "all" || colorSelect === "all") {
			dispatch(resetRequestedValuesStore());
			console.log("entre2");
			setShowBtnGetImages(false);
			setShowBtnAddImage(true);
		}
	}, [
		categorieSelect,
		colorSelect,
		products.optionUpdateImage.color,
		marcaSelect,
	]);
	useEffect(() => {
		if (products.optionUpdateImage.mark.length === 0) setMarcaSelect("");
		if (products.optionUpdateImage.color.length === 0) setColorSelect("");
	}, [products.optionUpdateImage.color, products.optionUpdateImage.mark]);
	const selectStyles = () => ({
		control: (baseStyles) => ({
			...baseStyles,
			fontSize: ".8rem",
		}),
		option: (baseStyles) => ({
			...baseStyles,
			fontSize: ".8rem",
			padding: 0,
			color: "black",
			backgroundColor: "white",
		}),
	});
	const handleClickGetImges = () => {
		dispatch(
			getImagesOfSubCategories(
				categorieSelect,
				colorSelect || "",
				marcaSelect || "",
			),
		);
		setShowBtnAddImage(true);
	};
	const handleSubmitUpdateImages = () => {
		let aplicarTodasMarcas =
			marcaSelect === "all"
				? confirm(
						"Estas seguro de realizar el cambio en todas las marcas? Recordá que perderás las imágenes asignadas específicamente a cada una de ellas",
				  )
				: true;
		let aplicarTodosColores =
			colorSelect === "all"
				? confirm(
						"Estas seguro de realizar el cambio en todos los colores? Recordá que perderás las imágenes asignadas específicamente a cada uno de ellos",
				  )
				: true;

		if (aplicarTodasMarcas && aplicarTodosColores)
			dispatch(
				updateImagesSubCategoriesProducts(
					categorieSelect,
					newUrlImages,
					colorSelect,
					marcaSelect,
				),
			);
		setShowAlertSumbit(true);
	};
	console.log(showBtnAddImage);
	return (
		<div className="imagesAdministration-container">
			<h2 style={{ marginBottom: "0" }}>Administrar Imágenes</h2>
			<div style={{ width: "90%" }}>
				<h5 style={{ marginTop: "0" }}>Categoria</h5>
				<Select
					placeholder=""
					name="categorie"
					className="adminInfo-teamSelect"
					options={structuringSelectValues(
						products.valuesFilter.subCategory,
						false,
					)}
					type="text"
					styles={selectStyles()}
					onChange={(e) => {
						setCategoriaSelect(e.value);
						setColorSelect("");
						dispatch(resetRequestedValuesStore());
						setShowBtnAddImage(false);
					}}
				/>
			</div>
			{products.optionUpdateImage.mark.length > 0 && (
				<div style={{ width: "90%" }}>
					<h5>Marca</h5>
					<Select
						placeholder=""
						name="marca"
						className="adminInfo-teamSelect"
						options={structuringSelectValues(
							products.optionUpdateImage.mark,
							true,
							"--  TODAS  --",
							"all",
						)}
						type="text"
						styles={selectStyles()}
						onChange={(e) => {
							dispatch(resetRequestedValuesStore());
							setMarcaSelect(e.value);
							setShowBtnAddImage(false);
						}}
					/>
				</div>
			)}
			{products.optionUpdateImage.color.length > 0 && (
				<div style={{ width: "90%" }}>
					<h5>Color</h5>
					<Select
						placeholder=""
						name="color"
						className="adminInfo-teamSelect"
						options={structuringSelectValues(
							products.optionUpdateImage.color,
							true,
							"--  APLICAR A TODOS  --",
							"all",
						)}
						type="text"
						styles={selectStyles()}
						onChange={(e) => {
							setColorSelect(e.value);
							dispatch(resetRequestedValuesStore());
							setShowBtnAddImage(false);
						}}
					/>
				</div>
			)}
			{showBtnGetImages && (
				<button
					onClick={handleClickGetImges}
					className="adminDashBoard-btnShowImagesCategory"
				>
					Ver Imagenes Cargadas
				</button>
			)}
			<div className="adminDashBoard-imgOfCategory-container">
				{newUrlImages.length > 0 &&
					newUrlImages.map((img, index) => (
						<ImageCard
							key={index}
							index={index}
							imagesUrl={newUrlImages}
							imgUrl={img}
							setNewUrlImages={setNewUrlImages}
							update={true}
						/>
					))}
				{showBtnAddImage && (
					<ImageCard
						index={newUrlImages.length}
						imagesUrl={newUrlImages}
						imgUrl="https://thumbs.dreamstime.com/b/c%C3%A1mara-agregar-icono-o-logotipo-s%C3%ADmbolo-aislado-vector-ilustraci%C3%B3n-alta-calidad-negro-estilo-iconos-211039809.jpg"
						setNewUrlImages={setNewUrlImages}
						update={false}
					/>
				)}
			</div>
			{showBtnUpdateImages && (
				<button
					onClick={handleSubmitUpdateImages}
					className="adminDashBoard-btnShowImagesCategory"
				>
					Guardar Cambios
				</button>
			)}
		</div>
	);
};

export default ImagesAdministration;

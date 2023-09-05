import React, { useState, useEffect } from "react";
import "./imagesAdministration.css";
import { useDispatch, useSelector } from "react-redux";
import { guiaImageAndCategorie, guiaSubCategories } from "../../../helps/guide";
import {
	getCategoryColors,
	getImagesOfSubCategories,
	resetRequestedValuesStore,
	updateImagesSubCategoriesProducts,
} from "../../../helps/redux/actions/products.actions";
import Select from "react-select";
import ImageCard from "./ImageCard";

const ImagesAdministration = ({ showSpinner, setShowSpinner }) => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state);
	const [msgSwap, setMsgSwap] = useState({});
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	const [categorieSelect, setCategoriaSelect] = useState("");
	const [colorSelect, setColorSelect] = useState("");
	const [showBtnGetImages, setShowBtnGetImages] = useState(false);
	const [showBtnUpdateImages, setShowBtnUpdateImages] = useState(true);
	const [showBtnAddImage, setShowBtnAddImage] = useState(false);
	const [newUrlImages, setNewUrlImages] = useState([]);
	useEffect(() => {
		dispatch(resetRequestedValuesStore());
	}, []);
	useEffect(() => {
		setNewUrlImages(products.imagesOfSubCategory);
	}, [products.imagesOfSubCategory]);
	useEffect(() => {
		if (categorieSelect) {
			dispatch(getCategoryColors(categorieSelect));
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
			categorieSelect !== "- SIN SELECCION -" &&
			((products.colorsCategory.length > 0 && colorSelect) ||
				products.colorsCategory.length == 0)
		) {
			setShowBtnGetImages(true);
		} else {
			setShowBtnGetImages(false);
		}
	}, [categorieSelect, colorSelect, products.colorsCategory]);
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
		dispatch(getImagesOfSubCategories(categorieSelect, colorSelect || ""));
		setShowBtnAddImage(true);
	};
	const handleSubmitUpdateImages = () => {
		dispatch(
			updateImagesSubCategoriesProducts(
				categorieSelect,
				colorSelect,
				newUrlImages,
			),
		);
		setShowAlertSumbit(true);
	};

	return (
		<div className="imagesAdministration-container">
			<h2 style={{ marginBottom: "0" }}>Administrar Imágenes</h2>
			<div style={{ width: "90%" }}>
				<h5 style={{ marginTop: "0" }}>Categoria</h5>
				<Select
					placeholder=""
					name="categorie"
					className="adminInfo-teamSelect"
					options={guiaSubCategories.map((el) => {
						return { label: el.toUpperCase(), value: el };
					})}
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
			{products.colorsCategory.length > 0 && (
				<div style={{ width: "90%" }}>
					<h5>Color</h5>
					<Select
						placeholder=""
						name="color"
						className="adminInfo-teamSelect"
						options={products.colorsCategory.map((el) => {
							return { label: el.toUpperCase(), value: el };
						})}
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

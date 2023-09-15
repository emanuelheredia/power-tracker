import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getOptionsSelectToUpdateImage,
	getImagesProduct,
	resetRequestedValuesStore,
	updateImagesProduct,
	getValuesAttributeSelects,
} from "../../../src/redux/actions/products.actions";
import Select from "react-select";
import ImageCard from "./ImageCard";
import { structuringSelectValues } from "../helpers/helpers.js";
const ImagesAdministration = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const { mark: markOptions, color: colorOptions } =
		products.optionUpdateImage;
	const { subCategories: subCategoryOptions, imagesProduct } = products;
	const [categorieSelect, setCategoriaSelect] = useState("");
	const [colorSelect, setColorSelect] = useState("");
	const [marcaSelect, setMarcaSelect] = useState("");
	const [codeInput, setCodeInput] = useState("");
	const [showBtnGetImages, setShowBtnGetImages] = useState(false);
	const [showBtnUpdateImages, setShowBtnUpdateImages] = useState(true);
	const [showBtnAddImage, setShowBtnAddImage] = useState(false);
	const [newUrl, setNewUrl] = useState([]);
	const [getImagesBy, setGetImagesBy] = useState({
		categorySearch: true,
		codeSearch: false,
	});
	useEffect(() => {
		if (subCategoryOptions.length === 0)
			dispatch(getValuesAttributeSelects("subCategory"));
		dispatch(resetRequestedValuesStore());
	}, []);
	useEffect(() => {
		if (products.error) {
			setShowBtnAddImage(false);
		}
	}, [products.error]);
	useEffect(() => {
		setNewUrl(imagesProduct);
	}, [imagesProduct]);
	useEffect(() => {
		if (categorieSelect) {
			dispatch(getOptionsSelectToUpdateImage(categorieSelect, "color"));
			dispatch(getOptionsSelectToUpdateImage(categorieSelect, "mark"));
		}
	}, [categorieSelect]);
	useEffect(() => {
		if (newUrl !== imagesProduct && newUrl.length !== 0) {
			setShowBtnUpdateImages(true);
		} else {
			setShowBtnUpdateImages(false);
		}
	}, [newUrl]);
	console.log(imagesProduct, colorOptions, markOptions);
	useEffect(() => {
		if (
			categorieSelect &&
			(markOptions.length === 0 || marcaSelect) &&
			((colorOptions.length > 0 && colorSelect) ||
				colorOptions.length == 0)
		) {
			console.log("entre si");
			setShowBtnGetImages(true);
		} else {
			console.log("entre no");
			setShowBtnGetImages(false);
		}
		if (marcaSelect === "all" || colorSelect === "all") {
			dispatch(resetRequestedValuesStore());
			setShowBtnGetImages(false);
			setShowBtnAddImage(true);
		}
	}, [categorieSelect, colorSelect, colorOptions, marcaSelect, markOptions]);
	useEffect(() => {
		if (markOptions.length === 0) setMarcaSelect("");
		if (colorOptions.length === 0) setColorSelect("");
	}, [colorOptions, markOptions]);
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
			getImagesProduct(
				codeInput,
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
				updateImagesProduct(
					codeInput,
					categorieSelect,
					newUrl,
					colorSelect,
					marcaSelect,
				),
			);
	};
	const handleChangeRadio = (e) => {
		let anotherAttribute =
			e.target.value === "codeSearch" ? "categorySearch" : "codeSearch";
		setGetImagesBy({
			...getImagesBy,
			[e.target.value]: true,
			[anotherAttribute]: false,
		});
		if (e.target.value === "categorySearch") setCodeInput("");
		setShowBtnGetImages(false);
		setShowBtnAddImage(false);
		dispatch(resetRequestedValuesStore());
	};
	const handleChangeInput = (e) => {
		setNewUrl([]);
		setShowBtnAddImage(false);
		setCodeInput(e.target.value.toUpperCase());
	};
	return (
		<div className="imagesAdministration-container">
			<h2 style={{ marginBottom: "0" }}>Administrar Imágenes</h2>
			<div style={{ display: "flex", gap: "1rem" }}>
				<div>
					<input
						type="radio"
						name="search"
						id="categorySearch"
						value="categorySearch"
						onClick={handleChangeRadio}
					/>
					<label htmlFor="categorySearch">Por Categoría</label>
				</div>
				<div>
					<input
						type="radio"
						name="search"
						id="codeSearch"
						value="codeSearch"
						onClick={handleChangeRadio}
					/>
					<label htmlFor="codeSearch">Por Código</label>
				</div>
			</div>
			{getImagesBy.categorySearch && (
				<div className="imagesAdministration-container">
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
					{markOptions.length > 0 && (
						<div style={{ width: "90%" }}>
							<h5>Marca</h5>
							<Select
								placeholder=""
								name="marca"
								className="adminInfo-teamSelect"
								options={structuringSelectValues(
									markOptions,
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
					{colorOptions.length > 0 && (
						<div style={{ width: "90%" }}>
							<h5>Color</h5>
							<Select
								placeholder=""
								name="color"
								className="adminInfo-teamSelect"
								options={structuringSelectValues(
									colorOptions,
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
				</div>
			)}
			{getImagesBy.codeSearch && (
				<input
					onChange={handleChangeInput}
					className="imagesAdministratio-codeInput"
				/>
			)}
			{(showBtnGetImages || (getImagesBy.codeSearch && codeInput)) && (
				<button
					onClick={handleClickGetImges}
					className="adminDashBoard-btnShowImagesCategory"
				>
					Ver Imagenes Cargadas
				</button>
			)}
			<div className="adminDashBoard-imgOfCategory-container">
				{newUrl.length > 0 &&
					newUrl.map((img, index) => (
						<ImageCard
							key={index}
							index={index}
							imagesUrl={newUrl}
							imgUrl={img}
							setNewUrl={setNewUrl}
							update={true}
						/>
					))}
				{showBtnAddImage && (
					<ImageCard
						index={newUrl.length}
						imagesUrl={newUrl}
						imgUrl="https://thumbs.dreamstime.com/b/c%C3%A1mara-agregar-icono-o-logotipo-s%C3%ADmbolo-aislado-vector-ilustraci%C3%B3n-alta-calidad-negro-estilo-iconos-211039809.jpg"
						setNewUrl={setNewUrl}
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

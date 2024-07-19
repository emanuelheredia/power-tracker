import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getOptionsSelectToUpdateImage,
	getImagesProduct,
	resetImagesReceivedStore,
	updateImagesProduct,
	getValuesAttributeSelects,
	resetOptionsReceivedStore,
} from "../../../src/redux/actions/products.actions";
import Select from "react-select";
import ImageCard from "./ImageCard";
import { structuringSelectValues } from "../helpers/helpers.js";
const ImagesAdministration = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const {
		mark: markOptions,
		color: colorOptions,
		vehiculo: vehiculoOptions,
	} = products.optionUpdateImage;
	const { subCategories: subCategoryOptions, imagesProduct } = products;
	const [categorieSelect, setCategoriaSelect] = useState("");
	const [colorSelect, setColorSelect] = useState("");
	const [marcaSelect, setMarcaSelect] = useState("");
	const [vehiculoSelect, setVehiculoSelect] = useState("");
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
		dispatch(resetImagesReceivedStore());
		dispatch(resetOptionsReceivedStore());
	}, []);
	useEffect(() => {
		setNewUrl(imagesProduct);
	}, [imagesProduct]);
	useEffect(() => {
		if (categorieSelect) {
			dispatch(
				getOptionsSelectToUpdateImage(
					{ subCategory: categorieSelect },
					"color",
				),
			);
			dispatch(
				getOptionsSelectToUpdateImage(
					{ subCategory: categorieSelect },
					"mark",
				),
			);
			dispatch(
				getOptionsSelectToUpdateImage(
					{ subCategory: categorieSelect, mark: marcaSelect },
					"vehiculo",
				),
			);
		}
	}, [categorieSelect, marcaSelect]);
	useEffect(() => {
		console.log(newUrl);
		if (newUrl !== imagesProduct && newUrl.length !== 0) {
			setShowBtnUpdateImages(true);
		} else {
			setShowBtnUpdateImages(false);
		}
	}, [newUrl]);
	useEffect(() => {
		const isCategorySelected = !!categorieSelect;
		const isMarcaSelected = markOptions.length === 0 || !!marcaSelect;
		const isColorSelected = colorOptions.length === 0 || !!colorSelect;
		const isVehiculoSelected =
			vehiculoOptions.length === 0 || !!vehiculoSelect;

		setShowBtnGetImages(
			isCategorySelected &&
				isMarcaSelected &&
				isColorSelected &&
				isVehiculoSelected,
		);

		if (
			marcaSelect === "all" ||
			colorSelect === "all" ||
			vehiculoSelect === "all"
		) {
			dispatch(resetImagesReceivedStore());
			setShowBtnAddImage(true);
			setShowBtnGetImages(false);
		}
	}, [
		categorieSelect,
		colorSelect,
		colorOptions,
		marcaSelect,
		markOptions,
		vehiculoSelect,
		vehiculoOptions,
	]);

	useEffect(() => {
		if (markOptions.length === 0) setMarcaSelect("");
		if (colorOptions.length === 0) setColorSelect("");
		if (vehiculoOptions.length === 0) setVehiculoSelect("");
	}, [colorOptions, markOptions, vehiculoOptions]);
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
				vehiculoSelect || "",
			),
		);
		setShowBtnAddImage(true);
	};
	const handleSubmitUpdateImages = () => {
		// Comprueba si se aplicarán cambios en todas las marcas
		const aplicarTodasMarcas =
			marcaSelect === "all"
				? window.confirm(
						"¿Estás seguro de realizar el cambio en todas las marcas? Recuerda que perderás las imágenes asignadas específicamente a cada una de ellas.",
				  )
				: true;

		// Comprueba si se aplicarán cambios en todos los colores
		const aplicarTodosColores =
			colorSelect === "all"
				? window.confirm(
						"¿Estás seguro de realizar el cambio en todos los colores? Recuerda que perderás las imágenes asignadas específicamente a cada uno de ellos.",
				  )
				: true;

		// Si ambas confirmaciones son verdaderas, realiza la actualización de imágenes
		if (aplicarTodasMarcas && aplicarTodosColores) {
			dispatch(
				updateImagesProduct(
					codeInput,
					categorieSelect,
					newUrl,
					colorSelect,
					marcaSelect,
					vehiculoSelect,
				),
			);
		}
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
		dispatch(resetImagesReceivedStore());
		dispatch(resetOptionsReceivedStore());
	};
	const handleChangeInput = (e) => {
		setNewUrl([]);
		setShowBtnAddImage(false);
		setCodeInput(e.target.value.toUpperCase());
	};
	const handleSelecChange = (e, setFunction, attribute) => {
		dispatch(resetImagesReceivedStore());
		setFunction(e.value);
		setShowBtnAddImage(false);
		if (attribute === "category") {
			setColorSelect("");
			dispatch(resetOptionsReceivedStore());
		}
		if (attribute === "marca") setVehiculoSelect("");
	};
	const valueSelectConstructor = (value) => {
		return { value, label: value.toUpperCase() };
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
						defaultChecked="true"
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
				<div className="imagesAdministration-categoriesContainer">
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
							value={valueSelectConstructor(categorieSelect)}
							type="text"
							styles={selectStyles()}
							onChange={(e) =>
								handleSelecChange(
									e,
									setCategoriaSelect,
									"category",
								)
							}
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
								value={valueSelectConstructor(marcaSelect)}
								styles={selectStyles()}
								onChange={(e) =>
									handleSelecChange(
										e,
										setMarcaSelect,
										"marca",
									)
								}
							/>
						</div>
					)}
					{vehiculoOptions.length > 0 && (
						<div style={{ width: "90%" }}>
							<h5>Modelo</h5>
							<Select
								placeholder=""
								name="vehiculo"
								className="adminInfo-teamSelect"
								options={structuringSelectValues(
									vehiculoOptions,
									true,
									"--  APLICAR A TODOS  --",
									"all",
								)}
								type="text"
								value={valueSelectConstructor(vehiculoSelect)}
								styles={selectStyles()}
								onChange={(e) =>
									handleSelecChange(e, setVehiculoSelect)
								}
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
								value={valueSelectConstructor(colorSelect)}
								styles={selectStyles()}
								onChange={(e) =>
									handleSelecChange(e, setColorSelect)
								}
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

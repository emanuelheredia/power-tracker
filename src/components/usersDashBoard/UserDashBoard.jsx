import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userDashBoard.css";
import { getAllProducts } from "../../../helps/redux/actions/products.actions";
import { guiaImageAndCategorie } from "../../../helps/guide";
import ProductModal from "./productModal/ProductModal";
import Select from "react-select";
import { FaEye, FaEyeSlash, FaWhatsapp } from "react-icons/fa";

const UserDashBoard = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state);
	const [codeInput, setCodeInput] = useState("");
	const [modeloInput, setModeloInput] = useState("");
	const [marcaInput, setMarcaInput] = useState("");
	const [categoriaSelect, setCategoriaSelect] = useState("");
	const [colorSelect, setColorSelect] = useState("");
	const [productsFiltered, setProductsFiltered] = useState([]);
	const [ocultarPrice, setOcultarPrice] = useState(false);
	useEffect(() => {
		dispatch(getAllProducts());
	}, []);
	useEffect(() => {
		if (products.products?.length > 0) {
			setProductsFiltered(products.products);
		}
	}, [products]);
	useEffect(() => {
		setProductsFiltered(
			products.products.filter(
				(el) =>
					el.code.toString().toLowerCase().includes(codeInput) &&
					el.proveedor
						.toString()
						.toLowerCase()
						.includes(marcaInput) &&
					el.vehiculo
						.toString()
						.toLowerCase()
						.includes(modeloInput) &&
					getProductAttribute(el.code, "categoria").includes(
						categoriaSelect,
					) &&
					getProductAttribute(el.code, "color").includes(colorSelect),
			),
		);
	}, [codeInput, marcaInput, modeloInput, categoriaSelect, colorSelect]);

	const getAttributeValuesFromGuide = (atribute, categoriesToInclude) => {
		let values = [];
		guiaImageAndCategorie.categories.map((el) => {
			if (
				!values.includes(el[0][atribute]) &&
				(!categoriesToInclude
					? true
					: categoriesToInclude.includes(
							el[0].categoria.toLowerCase(),
					  ))
			) {
				values.push(el[0][atribute]);
			}
		});
		const valuesStructured = values.map((el) => {
			return {
				label: el.toUpperCase(),
				value: el,
			};
		});
		const orderedValues = valuesStructured.sort((a, b) =>
			a.label.localeCompare(b.label),
		);
		orderedValues.unshift({ label: "- SIN SELECCION -", value: "" });
		return orderedValues;
	};

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
	const getProductAttribute = (code, attribute) => {
		let value;
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				value = el[0][attribute];
			}
		});
		return value;
	};

	return (
		<div className="userDashBoard-container">
			<h2>Lista de Precios</h2>
			<div className="userDashBoard-container-inputsSearch">
				<div>
					<h5>Categoria</h5>
					<Select
						placeholder=""
						name="categorie"
						className="userInfo-teamSelect"
						options={getAttributeValuesFromGuide("categoria")}
						type="text"
						styles={selectStyles()}
						onChange={(e) => setCategoriaSelect(e.value)}
					/>
				</div>
				<div>
					<h5>Modelo Vehiculo</h5>
					<input
						onChange={(e) =>
							setModeloInput(
								e.target.value.toString().toLowerCase(),
							)
						}
					/>
				</div>
				<div>
					<h5>Marca Producto</h5>
					<input
						onChange={(e) =>
							setMarcaInput(
								e.target.value.toString().toLowerCase(),
							)
						}
					/>
				</div>
				<div>
					<h5>Color Producto</h5>
					<Select
						placeholder=""
						name="color"
						className="userInfo-teamSelect"
						options={getAttributeValuesFromGuide("color", [
							"jaulas antivuelvo",
							"estribos",
							"defensas",
						])}
						type="text"
						styles={selectStyles()}
						onChange={(e) => setColorSelect(e.value)}
					/>
				</div>
				<div>
					<h5>Codigo Producto</h5>
					<input
						onChange={(e) =>
							setCodeInput(
								e.target.value.toString().toLowerCase(),
							)
						}
					/>
				</div>
			</div>
			{productsFiltered.length > 0 &&
				productsFiltered.map((el, index) => (
					<div
						className="userDashBoard-container-rowTable"
						key={index}
					>
						{" "}
						<div className="userDashBoard-item-celdaCode">
							<p>Codigo</p>
							<p>{el.code ? el.code : "sin datos"}</p>
						</div>
						<div className="userDashBoard-item-celdaCategory">
							<p>Categoria</p>
							<p>{getProductAttribute(el.code, "categoria")}</p>
						</div>
						<ProductModal
							product={el}
							productImage={"hola"}
							getProductAttribute={getProductAttribute}
							categorie={getProductAttribute(
								el.code,
								"categoria",
							)}
						/>
						<div className="userDashBoard-item-celdaModelo">
							<p>Vehículos</p>
							<p>
								{el.vehiculo !== "sin datos" ? el.vehiculo : ""}
							</p>
						</div>
						<div className="userDashBoard-item-celdaProveedor">
							<p>Marca</p>
							<p>
								{el.proveedor !== "sin datos"
									? el.proveedor
									: ""}
							</p>
						</div>
						<div className="userDashBoard-item-celdaMarca">
							<p>Marca Auto</p>
							<p>{el.marca !== "sin datos" ? el.marca : ""}</p>
						</div>
						<div className="userDashBoard-item-celdaMoreInfo">
							<p>Mas info</p>
							<p>
								{el.moreInfo !== "sin datos" ? el.moreInfo : ""}
							</p>
						</div>
						<div className="userDashBoard-item-celdaColor">
							<p>Color</p>
							<p>
								{getProductAttribute(
									el.code,
									"color",
								).toLocaleUpperCase()}
							</p>
						</div>
						<div className="userDashBoard-item-celdaSubCategory">
							<p>SubCategoria</p>
							<p>
								{getProductAttribute(
									el.code,
									"subCategoria",
								).toLocaleUpperCase()}
							</p>
						</div>
						<div className="userDashBoard-item-celdaPrice">
							<p>Precio</p>
							{!ocultarPrice && (
								<p>
									{el.price !== "sin datos" &&
									!isNaN(el.price)
										? "$ " +
										  el.price.toFixed(1).replace(".", ",")
										: ""}
								</p>
							)}
						</div>
					</div>
				))}
			<button
				onClick={() => setOcultarPrice(!ocultarPrice)}
				className="btn-ocultarPrice"
			>
				{ocultarPrice && <FaEye />}
				{!ocultarPrice && <FaEyeSlash />}
			</button>
			<a
				href={"https://wa.me/5493516537131"}
				target="_blank"
				rel="noreferrer"
				className="btn-whatsapp"
			>
				<FaWhatsapp />
			</a>
		</div>
	);
};

export default UserDashBoard;

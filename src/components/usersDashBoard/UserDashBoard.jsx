import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userDashBoard.css";
import {
	getAllProducts,
	getProductsColorsToFilter,
} from "../../../helps/redux/actions/products.actions";
import { guiaImageAndCategorie, categories } from "../../../helps/guide";
import Select from "react-select";
import { FaEye, FaEyeSlash, FaWhatsapp, FaArrowUp } from "react-icons/fa";
import CardProduct from "./CardProduct";
import { Spinner } from "../spinner/Spinner";

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
		dispatch(
			getProductsColorsToFilter([
				"defensas",
				"estribos",
				"jaulas antivuelvo",
			]),
		);
	}, []);
	useEffect(() => {
		if (products.products?.length > 0) {
			setProductsFiltered(products.products);
		}
	}, [products]);
	console.log(products);
	useEffect(() => {
		setProductsFiltered(
			products.products.filter(
				(el) =>
					el.code?.toLowerCase().includes(codeInput) &&
					el.proveedor
						.toString()
						.toLowerCase()
						.includes(marcaInput) &&
					el.vehiculo
						.toString()
						.toLowerCase()
						.includes(modeloInput) &&
					el.category.includes(categoriaSelect) &&
					el.color.includes(colorSelect),
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
	const scrollToUp = () => {
		window.scrollTo(0, 0);
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
						options={categories.map((el) => {
							return { label: el, value: el };
						})}
						type="text"
						styles={selectStyles()}
						onChange={(e) => setCategoriaSelect(e.value)}
					/>
				</div>
				<div>
					<h5>Vehiculo</h5>
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
					<h5>Color</h5>
					<Select
						placeholder=""
						name="color"
						className="userInfo-teamSelect"
						options={products.colorsFilter.map((el) => {
							return { label: el.toUpperCase(), value: el };
						})}
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
			{products.loading && <Spinner />}
			{productsFiltered.length > 0 &&
				productsFiltered.map((el, index) => (
					<CardProduct
						product={el}
						key={index}
						getProductAttribute={getProductAttribute}
						ocultarPrice={ocultarPrice}
					/>
				))}
			<button
				onClick={() => setOcultarPrice(!ocultarPrice)}
				className="btn-ocultarPrice"
			>
				{ocultarPrice && <FaEye />}
				{!ocultarPrice && <FaEyeSlash />}
			</button>
			<FaArrowUp onClick={() => scrollToUp()} className="btn-scrollUp" />
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

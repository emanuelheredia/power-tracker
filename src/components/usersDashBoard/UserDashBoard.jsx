import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userDashBoard.css";
import {
	getAllProducts,
	getProductsColorsToFilter,
	getProductsCategoriesToFilter,
} from "../../../helps/redux/actions/products.actions";
import Select from "react-select";
import { FaEye, FaEyeSlash, FaWhatsapp, FaArrowUp } from "react-icons/fa";
import CardProduct from "./CardProduct";
import { Spinner } from "../spinner/Spinner";
import { structuringSelectValues } from "../helpers/helpers.js";

const UserDashBoard = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state);
	const [codeInput, setCodeInput] = useState("");
	const [modeloInput, setModeloInput] = useState("");
	const [marcaInput, setMarcaInput] = useState("");
	const [allCategoriesSelect, setAllCategoriesSelect] = useState([]);
	const [categoriaSelect, setCategoriaSelect] = useState("");
	const [colorSelect, setColorSelect] = useState("");
	const [productsFiltered, setProductsFiltered] = useState([]);
	const [ocultarPrice, setOcultarPrice] = useState(false);
	useEffect(() => {
		dispatch(getAllProducts());
		dispatch(getProductsCategoriesToFilter());
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
	useEffect(() => {
		if (products.categoriesToFilter?.length > 0) {
			setAllCategoriesSelect(
				structuringSelectValues(products.categoriesToFilter),
			);
		}
	}, [products.categoriesToFilter]);
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
						options={allCategoriesSelect}
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

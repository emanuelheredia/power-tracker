import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userDashBoard.css";
import {
	getAllProducts,
	getValuesAttributeSelects,
} from "../../../src/redux/actions/products.actions";
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
	const [proveedorInput, setProveedorInput] = useState("");
	const [categoriaSelect, setCategoriaSelect] = useState("");
	const [marcaSelect, setMarcaSelect] = useState("");
	const [colorSelect, setColorSelect] = useState("");
	const [productsFiltered, setProductsFiltered] = useState([]);
	const [ocultarPrice, setOcultarPrice] = useState(false);
	useEffect(() => {
		if (products.products.length === 0) dispatch(getAllProducts());
		if (products.valuesFilter.category.length === 0)
			dispatch(getValuesAttributeSelects("category"));
		if (products.valuesFilter.mark.length === 0)
			dispatch(getValuesAttributeSelects("mark"));
		if (products.valuesFilter.color.length === 0)
			dispatch(
				getValuesAttributeSelects("color", [
					"defensas",
					"estribos",
					"jaulas antivuelvo",
				]),
			);
	}, []);
	useEffect(() => {
		setProductsFiltered(
			products.products.filter(
				(el) =>
					el.code?.toLowerCase().includes(codeInput) &&
					el.proveedor
						?.toString()
						.toLowerCase()
						.includes(proveedorInput) &&
					el.vehiculo
						?.toString()
						.toLowerCase()
						.includes(modeloInput) &&
					el.category?.includes(categoriaSelect) &&
					el.color?.includes(colorSelect) &&
					el.mark?.includes(marcaSelect),
			),
		);
		if (
			!codeInput &&
			!proveedorInput &&
			!modeloInput &&
			!categoriaSelect &&
			!colorSelect &&
			!marcaSelect
		) {
			setProductsFiltered([]);
		}
	}, [
		codeInput,
		proveedorInput,
		modeloInput,
		categoriaSelect,
		colorSelect,
		marcaSelect,
	]);
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
						options={structuringSelectValues(
							products.valuesFilter.category,
						)}
						type="text"
						styles={selectStyles()}
						onChange={(e) => setCategoriaSelect(e.value)}
					/>
				</div>
				<div>
					<h5>Marca Vehiculo</h5>
					<Select
						placeholder=""
						name="marca"
						className="userInfo-teamSelect"
						options={structuringSelectValues(
							products.valuesFilter.mark,
						)}
						type="text"
						styles={selectStyles()}
						onChange={(e) => setMarcaSelect(e.value)}
					/>
				</div>

				<div>
					<h5>Vehiculo</h5>
					<input
						style={{ color: "black" }}
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
						style={{ color: "black" }}
						onChange={(e) =>
							setProveedorInput(
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
						options={structuringSelectValues(
							products.valuesFilter.color,
						)}
						type="text"
						styles={selectStyles()}
						onChange={(e) => setColorSelect(e.value)}
					/>
				</div>
				<div>
					<h5>Codigo Producto</h5>
					<input
						style={{ color: "black" }}
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

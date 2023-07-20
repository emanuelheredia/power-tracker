import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userDashBoard.css";
import { getAllProducts } from "../../../helps/redux/actions/products.actions";
import { guiaImageAndCategorie } from "../../../helps/guide";
import Select from "react-select";

const UserDashBoard = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state);
	const [codeInput, setCodeInput] = useState("");
	const [modeloInput, setModeloInput] = useState("");
	const [marcaInput, setMarcaInput] = useState("");
	const [categoriaSelect, setCategoriaSelect] = useState("");
	const [productsFiltered, setProductsFiltered] = useState([]);
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
					getProductCategorie(el.code).includes(categoriaSelect),
			),
		);
		console.log(categoriaSelect);
	}, [codeInput, marcaInput, modeloInput, categoriaSelect]);

	const getProductImage = (code) => {
		let images = [];
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				images = el[1];
			}
		});
		return images;
	};
	const getProductCategorie = (code) => {
		let categorie = "";
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				categorie = el[0];
			}
		});
		return categorie;
	};
	const getCategorieFromGuide = () => {
		const categories = guiaImageAndCategorie.categories.map((el) => {
			return {
				label: el[0],
				value: el[0],
			};
		});
		categories.unshift({ label: "Sin categoria", value: "" });
		return categories;
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
		}),
	});
	return (
		<div className="userDashBoard-container">
			<div className="userDashBoard-container-headTable">
				<h4>CODIGO PRODUCTO</h4>
				<h4>CATEGORIA</h4>
				<h4>MODELO VEHICULO</h4>
				<h4>MARCA PRODUCTO</h4>
				<h4>MARCA VEHICULO</h4>
				<h4>MAS DETALLES</h4>
				<h4>PRECIO</h4>
			</div>
			<div className="userDashBoard-container-inputsSearch">
				<input
					onChange={(e) =>
						setCodeInput(e.target.value.toString().toLowerCase())
					}
					placeholder="Ingrese Código"
				/>
				<input
					placeholder="Ingrese Modelo Vehículo"
					onChange={(e) =>
						setModeloInput(e.target.value.toString().toLowerCase())
					}
				/>
				<input
					placeholder="Ingrese Marca Producto"
					onChange={(e) =>
						setMarcaInput(e.target.value.toString().toLowerCase())
					}
				/>
				<Select
					name="categorie"
					className="userInfo-teamSelect"
					placeholder="Seleccione una categoria"
					options={getCategorieFromGuide()}
					type="text"
					styles={selectStyles()}
					onChange={(e) => setCategoriaSelect(e.value)}
				/>
			</div>
			{productsFiltered.length > 0 &&
				productsFiltered.map((el, index) => (
					<div
						className="userDashBoard-container-rowTable"
						key={index}
					>
						<p>{el.code ? el.code : "sin datos"}</p>
						<p title="Ver Imagen">{getProductCategorie(el.code)}</p>
						<p>{el.vehiculo ? el.vehiculo : "sin datos"}</p>
						<p>{el.proveedor ? el.proveedor : "sin datos"}</p>
						<p>{el.marca ? el.marca : "sin datos"}</p>
						<p>{el.moreInfo ? el.moreInfo : "sin datos"}</p>
						<p>
							{el.price && !isNaN(el.price)
								? "$ " + el.price.toFixed(1).replace(".", ",")
								: "sin datos"}
						</p>
					</div>
				))}
		</div>
	);
};

export default UserDashBoard;

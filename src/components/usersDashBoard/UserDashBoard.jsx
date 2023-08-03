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
	const [productsFiltered, setProductsFiltered] = useState([]);
	const [opennModal, setOpennModal] = useState(false);
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
					getProductCategorie(el.code).includes(categoriaSelect),
			),
		);
	}, [codeInput, marcaInput, modeloInput, categoriaSelect]);

	const getProductCategorie = (code) => {
		let categorie = "";
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				categorie = el[0].categoria;
			}
		});
		return categorie;
	};
	const getCategorieFromGuide = () => {
		let categories = [];
		guiaImageAndCategorie.categories.map((el) => {
			if (!categories.includes(el[0].categoria)) {
				categories.push(el[0].categoria);
			}
		});
		const categoriesStructured = categories.map((el) => {
			return {
				label: el,
				value: el,
			};
		});
		const orderedCategoty = categoriesStructured.sort((a, b) =>
			a.label.localeCompare(b.label),
		);
		orderedCategoty.unshift({ label: "Sin categoria", value: "" });
		return orderedCategoty;
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
			color: "red",
		}),
	});
	const getProductImage = (code) => {
		let images = [];
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				images = el[0].imagenes;
			}
		});
		return images;
	};
	const getProductColor = (code) => {
		let color = "";
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				color = el[0].color;
			}
		});
		return color;
	};
	const getProductsubCateg = (code) => {
		let color = "";
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				color = el[0].subCategoria;
			}
		});
		return color;
	};
	return (
		<div className="userDashBoard-container">
			<h2>Lista de Precios</h2>
			<div className="userDashBoard-container-inputsSearch">
				<input
					onChange={(e) =>
						setCodeInput(e.target.value.toString().toLowerCase())
					}
					placeholder="Código"
				/>
				<input
					placeholder="Modelo Vehículo"
					onChange={(e) =>
						setModeloInput(e.target.value.toString().toLowerCase())
					}
				/>
				<input
					placeholder="Marca Producto"
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
						{" "}
						<div className="userDashBoard-item-celdaCode">
							<p>Codigo</p>
							<p>{el.code ? el.code : "sin datos"}</p>
						</div>
						<div className="userDashBoard-item-celdaCategory">
							<p>Categoria</p>
							<ProductModal
								product={el}
								productImage={"hola"}
								opennModal={opennModal}
								setOpennModal={setOpennModal}
								categorie={getProductCategorie(el.code)}
							/>
						</div>
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
								{getProductColor(el.code).toLocaleUpperCase()}
							</p>
						</div>
						<div className="userDashBoard-item-celdaSubCategory">
							<p>SubCategoria</p>
							<p>
								{getProductsubCateg(
									el.code,
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
						<div className="userDashBoard-item-celdaImages">
							<img src={getProductImage(el.code)[0]} />
							{getProductImage(el.code)[1] && (
								<img
									className="productModal-image"
									src={getProductImage(el.code)[1]}
									alt=""
								/>
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

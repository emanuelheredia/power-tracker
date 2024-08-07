import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllProducts,
	getValuesAttributeSelects,
} from "../../../src/redux/actions/products.actions";
import Select from "react-select";
import {
	FaEye,
	FaEyeSlash,
	FaWhatsapp,
	FaArrowUp,
	FaDoorOpen,
} from "react-icons/fa";
import CardProduct from "./CardProduct";
import { Spinner } from "../spinner/Spinner";
import { structuringSelectValues } from "../helpers/helpers.js";
import { useAlert } from "../customHooks/useAlert";
import { getAllNews } from "../../redux/actions/news.actions.js";
import { logOutUser } from "../../redux/actions/user.actions.js";
import { signOutLogin } from "../../redux/actions/auth.actions.js";
import { scrollToUp } from "../../../helps/helpers.js";

const ProductsList = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const {
		showAlertSumbit,
		setMsgSwap,
		setShowAlertSumbit,
		msgSwap,
		showAlert,
	} = useAlert({ state: products });
	const { user } = useSelector((state) => state.users);
	const [codeInput, setCodeInput] = useState("");
	const [modeloInput, setModeloInput] = useState("");
	const [proveedorSelect, setProveedorSelect] = useState("");
	const [categoriaSelect, setCategoriaSelect] = useState("");
	const [marcaSelect, setMarcaSelect] = useState("");
	const [colorSelect, setColorSelect] = useState("");
	const [productsFiltered, setProductsFiltered] = useState([]);
	const [ocultarPrice, setOcultarPrice] = useState(false);
	useEffect(() => {
		/* if (products.products.length === 0)  */ dispatch(getAllProducts());
		dispatch(getAllNews());
		if (products.valuesFilter.category.length === 0)
			dispatch(getValuesAttributeSelects("category"));
		if (products.valuesFilter.mark.length === 0)
			dispatch(getValuesAttributeSelects("mark"));
		if (products.valuesFilter.proveedor.length === 0)
			dispatch(getValuesAttributeSelects("proveedor"));
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
		// Filtra los productos basados en múltiples criterios
		const filteredProducts = products.products.filter((el) => {
			const codeMatch =
				!codeInput ||
				el.code?.toLowerCase().includes(codeInput.toLowerCase());
			const modeloMatch =
				!modeloInput ||
				el.vehiculo?.toString().toLowerCase().includes(modeloInput);
			const categoriaMatch =
				!categoriaSelect || el.category?.includes(categoriaSelect);
			const colorMatch = !colorSelect || el.color?.includes(colorSelect);
			const marcaMatch = !marcaSelect || el.mark?.includes(marcaSelect);
			const proveedorMatch =
				!proveedorSelect || el.proveedor?.includes(proveedorSelect);

			return (
				codeMatch &&
				modeloMatch &&
				categoriaMatch &&
				colorMatch &&
				marcaMatch &&
				proveedorMatch
			);
		});

		// Actualiza el estado con los productos filtrados
		setProductsFiltered(filteredProducts);

		// Si no se aplican filtros, establece el estado como un array vacío
		if (
			!codeInput &&
			!proveedorSelect &&
			!modeloInput &&
			!categoriaSelect &&
			!colorSelect &&
			!marcaSelect
		) {
			setProductsFiltered([]);
		}
	}, [
		codeInput,
		proveedorSelect,
		modeloInput,
		categoriaSelect,
		colorSelect,
		marcaSelect,
		products.products,
	]);
	useEffect(() => {
		if (!products.loading && products.msg) {
			setShowAlertSumbit(true);
		}
		setMsgSwap({
			title: products.msg,
			text: products.text || "",
			icon: products.error ? "error" : "success",
		});
	}, [products.msg, products.error, products.text]);
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
	const handleResetForm = (e) => {
		setColorSelect("");
		setCategoriaSelect("");
		setCodeInput("");
		setMarcaSelect("");
		setModeloInput("");
		setProveedorSelect("");
	};
	const valueSelectConstructor = (value) => {
		return { value, label: value.toUpperCase() };
	};
	const handleLogOut = () => {
		dispatch(logOutUser());
	};
	const logOutAdmin = (e) => {
		dispatch(signOutLogin());
	};
	return (
		<div className="userDashBoard-container">
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "end",
					gap: "5px",
					marginTop: ".8rem",
				}}
			>
				<h4 className="userDashBoard_welcome">
					Bienvenido {user?.name || "Administrador"}!
				</h4>
				<FaDoorOpen
					onClick={user?.name ? handleLogOut : logOutAdmin}
					className="userDashBoard_logOut"
				/>
			</div>
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
							true,
						)}
						value={valueSelectConstructor(categoriaSelect)}
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
							true,
						)}
						type="text"
						value={valueSelectConstructor(marcaSelect)}
						styles={selectStyles()}
						onChange={(e) => setMarcaSelect(e.value)}
					/>
				</div>

				<div>
					<h5>Vehiculo</h5>
					<input
						style={{ color: "black" }}
						value={modeloInput}
						onChange={(e) =>
							setModeloInput(
								e.target.value.toString().toLowerCase(),
							)
						}
					/>
				</div>
				<div>
					<h5>Marca</h5>
					<Select
						placeholder=""
						name="proveedor"
						className="userInfo-teamSelect"
						options={structuringSelectValues(
							products.valuesFilter.proveedor,
							true,
						)}
						value={valueSelectConstructor(proveedorSelect)}
						type="text"
						styles={selectStyles()}
						onChange={(e) => setProveedorSelect(e.value)}
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
							true,
						)}
						type="text"
						value={valueSelectConstructor(colorSelect)}
						styles={selectStyles()}
						onChange={(e) => {
							setColorSelect(e.value);
						}}
					/>
				</div>
				<div>
					<h5>Codigo Producto</h5>
					<input
						style={{ color: "black" }}
						value={codeInput}
						onChange={(e) =>
							setCodeInput(
								e.target.value.toString().toLowerCase(),
							)
						}
					/>
				</div>
				<button
					className="userDashBoard-btnFormReset"
					onClick={() => handleResetForm()}
				>
					Resetear Filtros
				</button>
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
			{showAlertSumbit && showAlert(msgSwap)}
		</div>
	);
};

export default ProductsList;

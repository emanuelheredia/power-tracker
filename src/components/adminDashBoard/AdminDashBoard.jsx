import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import "./adminDashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { estructureTable } from "../../../helps/helpers";
import {
	uploadOrUpdateProducts,
	uploadProducts,
	getCategoryColors,
	getImagesOfSubCategories,
	resetRequestedValuesStore,
} from "../../../helps/redux/actions/products.actions";
import { guiaImageAndCategorie, guiaSubCategories } from "../../../helps/guide";
import Select from "react-select";

import swal from "sweetalert";
import { Spinner } from "../spinner/Spinner";
const AdminDashBoard = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const { products } = useSelector((state) => state);
	const [dataCleaned, setDataCleaned] = useState([]);
	const [showSpinner, setShowSpinner] = useState(false);
	const [showButtonUpload, setShowButtonUpload] = useState(false);
	const [msgSwap, setMsgSwap] = useState({});
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	const [categorieSelect, setCategoriaSelect] = useState("");
	const [colorSelect, setColorSelect] = useState("");
	const [showBtnGetImages, setShowBtnGetImages] = useState(false);
	const handleExcelChange = async (e) => {
		setShowSpinner(true);
		const data = await readXlsxFile(e.target.files[0]);
		setData(data);
		setShowSpinner(false);
		setShowButtonUpload(true);
	};
	useEffect(() => {
		if (data.length > 0) {
			const dataEstructured = estructureTable(data);
			setDataCleaned(dataEstructured);
		}
	}, [data]);
	useEffect(() => {
		setShowSpinner(false);
	}, [products]);
	useEffect(() => {
		if (categorieSelect) {
			dispatch(getCategoryColors(categorieSelect));
		}
	}, [categorieSelect]);
	useEffect(() => {
		if (products.msg !== "" && "Actualización exitoso") {
			setMsgSwap({
				title: "Actualización exitosa",
				text: "La lista de precio se actualizó correctamente",
				icon: "success",
			});
			setShowAlertSumbit(true);
			setShowButtonUpload(false);
		}
		if (products.error) {
			setMsgSwap({
				title: "Error en la actualización",
				text: "La lista de precio no se logró actualizar con exito",
				icon: "danger",
			});
			setShowAlertSumbit(true);
			setShowButtonUpload(false);
		}
	}, [products]);

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

	const handleUpload = () => {
		setShowSpinner(true);
		const dataCleanComplete = dataCleaned.map((el) => {
			el.category = getProductAttribute(el.code, "categoria");
			el.subCategory = getProductAttribute(el.code, "subCategoria");
			el.images = getProductAttribute(el.code, "imagenes");
			el.color = getProductAttribute(el.code, "color");
			if (el.price === "X") {
				el.price = 0;
			}
			return el;
		});
		console.log(dataCleanComplete);
		dispatch(uploadProducts(dataCleanComplete));
		/* 		dispatch(
			uploadOrUpdateProducts(
				dataCleaned,
				dataCleaned[0]?.proveedor || dataCleaned[0][5]?.proveedor,
			),
		);
 */
	};
	const getProductAttribute = (code, attribute) => {
		let value;
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				value = el[0][attribute];
			}
		});
		return value;
	};
	const showAlert = ({ title, text, icon }) => {
		swal({
			title: title,
			text: text,
			icon: icon,
			button: "Aceptar",
		}).then((respuesta) => {
			if (respuesta) {
				setShowAlertSumbit(false);
				setMsgSwap({});
			}
		});
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
	const handleClickGetImges = () => {
		dispatch(getImagesOfSubCategories(categorieSelect, colorSelect || ""));
	};
	return (
		<div className="adminDashBoard-container">
			<h2>Actualización de listas</h2>
			<div className="adminDashBoard-input">
				<input type="file" onChange={(e) => handleExcelChange(e)} />
			</div>
			{showSpinner && <Spinner />}
			{showButtonUpload && (
				<button
					className="adminDachBoard-buttonUpload"
					onClick={handleUpload}
				>
					Subir Lista
				</button>
			)}
			{showAlertSumbit && showAlert(msgSwap)}
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
				{showBtnGetImages &&
					products.imagesOfSubCategory.length > 0 &&
					products.imagesOfSubCategory.map((img, index) => (
						<img
							key={index}
							className="admiDashBoard-imgOfCategories"
							src={img}
						/>
					))}
			</div>
		</div>
	);
};

export default AdminDashBoard;

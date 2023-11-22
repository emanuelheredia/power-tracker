import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FiPlus, FiDelete } from "react-icons/fi";
import { structuringSelectValues } from "../helpers/helpers";
import { useSelector } from "react-redux";

const traducciónToSeccionLabel = {
	category: "Categoria",
	subCategory: "Sub Categoría",
	mark: "Marca Vehículo",
	proveedor: "Marca",
	moreInfo: "Más Información",
	color: "Color",
	vehiculo: "Modelo Vehículo",
	price: "Precio",
	images: "URL Imagen",
	code: "Código",
};
const initialShowInputs = {
	code: true,
	price: true,
	category: false,
	subCategory: false,
	color: false,
	proveedor: false,
	moreInfo: true,
	mark: false,
	vehiculo: true,
	images: [],
};

const AddNewProductSeccions = ({ productInfo, setProductInfo, seccion }) => {
	const [showInputs, setShowInputs] = useState(initialShowInputs);
	const products = useSelector((state) => state.products);
	const seccionName = seccion[0];
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
	const handleShowInputs = (name) => {
		setShowInputs({
			...showInputs,
			[name]: !showInputs[name],
		});
	};
	const handleChangeInput = (e) => {
		setProductInfo({
			...productInfo,
			[e.target.name]:
				seccionName === "code"
					? e.target.value.toUpperCase()
					: e.target.value,
		});
	};
	const handleChangeSelect = (e) => {
		setProductInfo({
			...productInfo,
			[seccionName]: e.value,
		});
	};
	return (
		<div className="addNewProduct-campos-container">
			<label style={{ marginTop: "0" }}>
				{traducciónToSeccionLabel[seccionName]}
			</label>
			{!["code", "price", "images", "moreInfo", "vehiculo"].includes(
				seccionName,
			) &&
				products.valuesFilter[seccionName]?.length > 1 && (
					<div className="addNewProduct-campos">
						{!showInputs[seccionName] && (
							<Select
								placeholder=""
								name={seccionName}
								className="form-campos"
								options={structuringSelectValues(
									products.valuesFilter[seccionName],
									false,
								)}
								type="text"
								styles={selectStyles()}
								onChange={handleChangeSelect}
								onFocus={() =>
									setShowInputs({
										...showInputs,
										[seccion[0]]: false,
									})
								}
								required={
									showInputs[seccionName] ? false : true
								}
							/>
						)}
						{!showInputs[seccionName] && (
							<FiPlus
								className="addNewProduct-IconoPlus"
								name={seccion[0]}
								onClick={() => handleShowInputs(seccionName)}
							/>
						)}
						{showInputs[seccionName] && (
							<FiDelete
								className="addNewProduct-IconoCancel"
								name={seccion[0]}
								onClick={() => handleShowInputs(seccionName)}
							/>
						)}
					</div>
				)}
			{showInputs[seccionName] && (
				<input
					required={seccionName === "moreInfo" ? false : true}
					name={seccionName}
					type={seccionName === "price" ? "number" : "text"}
					id={seccionName}
					onChange={handleChangeInput}
				></input>
			)}
		</div>
	);
};

export default AddNewProductSeccions;

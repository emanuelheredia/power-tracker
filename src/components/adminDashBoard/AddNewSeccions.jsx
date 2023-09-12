import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FiPlus } from "react-icons/fi";

const traducciónToSeccionLabel = {
	category: "Categoria",
	subCategory: "Sub Categoría",
	mark: "Marca Vehículo",
	proveedor: "Marca",
	moreInfo: "Más Información",
	color: "Color",
	price: "Precio",
	images: "Agregar Imagen",
	code: "Código",
};
const initialShowInputs = {
	code: true,
	price: true,
	category: false,
	subCategory: false,
	color: false,
	marca: false,
	masInfo: false,
	marcaAuto: false,
	images: [],
};

const AddNewSeccions = ({ productInfo, setProductInfo, seccion }) => {
	const [showInputs, setShowInputs] = useState(initialShowInputs);
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
	const handleChange = (e) => {
		setProductInfo({ ...producInfo, [e.target.name]: e.target.value });
	};

	return (
		<div className="addNewProduct-campos">
			<label style={{ marginTop: "0" }}>
				{traducciónToSeccionLabel[seccionName]}
			</label>
			<Select
				placeholder=""
				name={seccion[0]}
				className="form-campos"
				/* 					options={structuringSelectValues()}
				 */ type="text"
				styles={selectStyles()}
				onChange={(e) => setProductInfo(e)}
				onFocus={() =>
					setShowInputs({
						...showInputs,
						[seccion[0]]: false,
					})
				}
			/>
			<FiPlus
				className="addNewProduct-IconoPlus"
				name={seccion[0]}
				onClick={() => handleShowInputs(seccion[0])}
			/>
			{showInputs.seccionName && (
				<input
					name="category"
					type="category"
					id="category"
					placeholder={
						"Ingresá " + traducciónToSeccionLabel[seccionName]
					}
					onChange={handleChange}
					required
				/>
			)}
		</div>
	);
};

export default AddNewSeccions;

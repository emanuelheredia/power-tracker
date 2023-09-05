import React, { useState, useEffect } from "react";
import readXlsxFile from "read-excel-file";
import { useDispatch, useSelector } from "react-redux";
import { estructureTable } from "../../../helps/helpers";
import {
	updateProducts,
	uploadProducts,
} from "../../../helps/redux/actions/products.actions";
import { guiaImageAndCategorie, guiaSubCategories } from "../../../helps/guide";
import { Spinner } from "../spinner/Spinner";

import "./filesAdministration.css";

const FilesAdministrator = ({ showSpinner, setShowSpinner }) => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [dataCleaned, setDataCleaned] = useState([]);
	const [showButtonUpload, setShowButtonUpload] = useState(false);
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
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
	const handleUpload = () => {
		setShowAlertSumbit(false);
		setShowSpinner(true);
		const dataCleanComplete = dataCleaned.map((el) => {
			/*
			-- Structuring to Upload new prices list --
			el.category = getProductAttribute(el.code, "categoria");
			el.subCategory = getProductAttribute(el.code, "subCategoria");
			el.images = getProductAttribute(el.code, "imagenes");
			el.color = getProductAttribute(el.code, "color");
 			*/
			if (el.price === "X") {
				el.price = 0;
			}
			return el;
		});
		//console.log(dataCleanComplete);
		/* 		
		-- Upload New Prices List --
		dispatch(uploadProducts(dataCleanComplete));
		 */
		dispatch(updateProducts(dataCleaned));
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

	return (
		<div className="filesAdministration-container">
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
		</div>
	);
};

export default FilesAdministrator;

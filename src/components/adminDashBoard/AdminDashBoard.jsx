import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import "./adminDashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { estructureTable } from "../../../helps/helpers";
import { uploadOrUpdateProducts } from "../../../helps/redux/actions/products.actions";
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

	const handleExcelChange = async (e) => {
		setDataCleaned([]);
		setShowSpinner(true);
		const data = await readXlsxFile(e.target.files[0]);
		setData(data);
		setShowSpinner(false);
		setShowButtonUpload(true);
	};
	useEffect(() => {
		if (data.length > 0) {
			setDataCleaned(estructureTable(data));
		}
	}, [data]);
	useEffect(() => {
		console.log(products.msg);
		setShowSpinner(false);
	}, [products]);
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
	const handleUpload = () => {
		setShowSpinner(true);
		dispatch(
			uploadOrUpdateProducts(
				dataCleaned,
				dataCleaned[0]?.proveedor || dataCleaned[0][5]?.proveedor,
			),
		);
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
	console.log(dataCleaned);
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
		</div>
	);
};

export default AdminDashBoard;

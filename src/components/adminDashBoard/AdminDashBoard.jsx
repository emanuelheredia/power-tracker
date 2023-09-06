import React, { useEffect, useState } from "react";
import "./adminDashBoard.css";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import ImagesAdministration from "./ImagesAdministration";
import FilesAdministrator from "./FilesAdministration";
const AdminDashBoard = () => {
	const { products } = useSelector((state) => state);
	const [showSpinner, setShowSpinner] = useState(false);
	const [msgSwap, setMsgSwap] = useState({});
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	useEffect(() => {
		if (!products.loading && products.msg) {
			setShowSpinner(false);
			setShowAlertSumbit(true);
		}
		setMsgSwap({
			title: products.msg,
			text: products.text || "",
			icon: products.error ? "danger" : "success",
		});
	}, [products.msg]);
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
	return (
		<div className="adminDashBoard-container">
			<FilesAdministrator
				showSpinner={showSpinner}
				setShowSpinner={setShowSpinner}
			/>
			{showAlertSumbit && showAlert(msgSwap)}
			<ImagesAdministration />{" "}
		</div>
	);
};

export default AdminDashBoard;

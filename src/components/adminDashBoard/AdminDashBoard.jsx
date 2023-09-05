import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import "./adminDashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { estructureTable } from "../../../helps/helpers";
import {
	updateProducts,
	uploadProducts,
	getCategoryColors,
	getImagesOfSubCategories,
	resetRequestedValuesStore,
	updateImagesSubCategoriesProducts,
} from "../../../helps/redux/actions/products.actions";
import { guiaImageAndCategorie, guiaSubCategories } from "../../../helps/guide";
import Select from "react-select";
import swal from "sweetalert";
import { Spinner } from "../spinner/Spinner";
import ImageCard from "./ImageCard";
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
			<ImagesAdministration
				showSpinner={showSpinner}
				setShowSpinner={setShowSpinner}
			/>{" "}
		</div>
	);
};

export default AdminDashBoard;

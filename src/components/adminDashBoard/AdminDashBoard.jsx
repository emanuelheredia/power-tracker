import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import ImagesAdministration from "./ImagesAdministration";
import FilesAdministrator from "./FilesAdministration";
import AddNewProduct from "./AddNewProduct";
import { resetResponseMsgsStore } from "../../redux/actions/products.actions";
const AdminDashBoard = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
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
			icon: products.error ? "error" : "success",
		});
	}, [products.msg, products.error, products.text]);
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
				dispatch(resetResponseMsgsStore());
			}
		});
	};
	return (
		<div className="adminDashBoard-container">
			<FilesAdministrator
				showSpinner={showSpinner}
				setShowSpinner={setShowSpinner}
			/>
			<AddNewProduct setShowSpinner={setShowSpinner} />
			<ImagesAdministration />
			{showAlertSumbit && showAlert(msgSwap)}
		</div>
	);
};

export default AdminDashBoard;

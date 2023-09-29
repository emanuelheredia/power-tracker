import { useEffect, useState } from "react";
import swal from "sweetalert";
import { resetResponseMsgsStore } from "../../redux/actions/products.actions";
import { useDispatch, useSelector } from "react-redux";

export function useAlert() {
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
	return {
		showAlert,
		msgSwap,
		showAlertSumbit,
		showSpinner,
		setShowSpinner,
		setShowAlertSumbit,
		setMsgSwap,
	};
}

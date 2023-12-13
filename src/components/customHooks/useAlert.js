import { useEffect, useState } from "react";
import swal from "sweetalert";
import { resetResponseMsgsStore } from "../../redux/actions/products.actions";
import { useDispatch, useSelector } from "react-redux";

export function useAlert({ state }) {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const [showSpinner, setShowSpinner] = useState(false);
	const [msgSwap, setMsgSwap] = useState({});
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
	useEffect(() => {
		if (!state.loading && state.msg) {
			setShowSpinner(false);
			setShowAlertSumbit(true);
		}
		setMsgSwap({
			title: state.msg,
			text: state.text || "",
			icon: state.error ? "error" : "success",
		});
	}, [state.msg, state.error, state.text]);
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

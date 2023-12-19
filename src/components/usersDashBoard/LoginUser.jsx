import React, { useEffect, useState } from "react";
import Form from "../login/Form";
import { useDispatch, useSelector } from "react-redux";
import { encriptar } from "../../../helps/helpers.js";
import { signInUser } from "../../redux/actions/user.actions.js";
import { useAlert } from "../customHooks/useAlert.js";

const LoginUser = ({ setStorageData }) => {
	const users = useSelector((state) => state.users);
	const { showAlert, msgSwap, showAlertSumbit } = useAlert({
		state: users,
	});
	const dispatch = useDispatch();
	const handleSubmit = (user) => {
		dispatch(
			signInUser({
				userID: user.userAccess,
				password: encriptar(user.password),
			}),
		);
	};
	return (
		<div>
			<Form
				setStorageData={setStorageData}
				admin={false}
				handleSubmit={handleSubmit}
			/>
			{showAlertSumbit && showAlert(msgSwap)}
		</div>
	);
};

export default LoginUser;

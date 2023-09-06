import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutLogin } from "../../../src/redux/actions/auth.actions";

const ProtectedRoute = ({ children }) => {
	const { login } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!login) goLogin();
	}, [login]);
	const goLogin = (e) => {
		dispatch(signOutLogin());
		navigate("/login");
	};
	return <>{children}</>;
};
export default ProtectedRoute;

import "./header.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutLogin } from "../../../helps/redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.jpeg";
const Header = () => {
	const [admin, setAdmin] = useState(false);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const goToAdmin = (e) => {
		navigate("/login");
	};
	const logOut = (e) => {
		dispatch(signOutLogin());
		navigate("/");
	};
	const goToList = (e) => {
		navigate("/");
	};

	return (
		<div className="header-container">
			<img className="header-logo" src={logo} alt="" />
			<nav className="header-linksContainer">
				<a onClick={goToList}>Listas</a>
				<a onClick={goToAdmin}>Admin</a>
				{auth.login && <a onClick={logOut}>Log Out</a>}
			</nav>
		</div>
	);
};

export default Header;

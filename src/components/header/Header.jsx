import "./header.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutLogin } from "../../../helps/redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";

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

	console.log(auth);

	return (
		<div className="header-container">
			<img src={Logo} alt="logo" className="header-logo" />
			<nav className="header-linksContainer">
				<a onClick={goToAdmin}>Admin</a>
				{auth.login && <a onClick={logOut}>Log Out</a>}
			</nav>
		</div>
	);
};

export default Header;

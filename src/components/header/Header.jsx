import "./header.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutLogin } from "../../../src/redux/actions/auth.actions";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.jpeg";
const Header = () => {
	const [admin, setAdmin] = useState(false);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const logOut = (e) => {
		dispatch(signOutLogin());
	};

	return (
		<div className="header-container">
			<img className="header-logo" src={logo} alt="" />
			<nav className="header-linksContainer">
				<Link to="/">Listas</Link>
				<Link to="/login">Admin</Link>
				{auth.login && (
					<Link to="/" onClick={logOut}>
						Log Out
					</Link>
				)}
			</nav>
		</div>
	);
};

export default Header;

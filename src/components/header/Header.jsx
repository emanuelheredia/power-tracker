import "./header.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutLogin } from "../../../src/redux/actions/auth.actions";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.jpeg";
import { FaShoppingCart } from "react-icons/fa";
const Header = () => {
	const [admin, setAdmin] = useState(false);
	const auth = useSelector((state) => state.auth);
	const cart = useSelector((state) => state.cart.cart);
	const dispatch = useDispatch();
	const logOut = (e) => {
		dispatch(signOutLogin());
	};

	return (
		<div className="header-container">
			<img className="header-logo" src={logo} alt="" />
			<nav className="header-linksContainer">
				<Link to="/">Inicio</Link>
				<Link to="/news">Novedades</Link>
				<Link to="/lists">Listas</Link>
				<Link to="/login">Admin</Link>
				{auth.login && (
					<Link to="/" onClick={logOut}>
						Log Out
					</Link>
				)}
				{!auth.login && (
					<Link to="/cart">
						<div className="header-cartContainer">
							<FaShoppingCart className="header-cartIcon" />
							{cart.length > 0 && (
								<p className="header-cartCounter">
									{cart.length}
								</p>
							)}
						</div>
					</Link>
				)}
			</nav>
		</div>
	);
};

export default Header;

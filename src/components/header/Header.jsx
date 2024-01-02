import "./header.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutLogin } from "../../../src/redux/actions/auth.actions";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.jpeg";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const cart = useSelector((state) => state.cart.cart);
	const [showMenu, setShowMenu] = useState(false);
	const dispatch = useDispatch();
	const logOut = (e) => {
		dispatch(signOutLogin());
	};
	console.log(showMenu);
	return (
		<div className="header-container">
			<img className="header-logo" src={logo} alt="" />
			<IoMenu
				className="header_menuIcon"
				onClick={() => setShowMenu(!showMenu)}
			/>
			<nav
				className={`header-linksContainer ${
					showMenu ? "show" : "noShow"
				}`}
			>
				<Link onClick={() => setShowMenu(false)} to="/">
					Inicio
				</Link>
				<Link onClick={() => setShowMenu(false)} to="/news">
					Novedades
				</Link>
				<Link onClick={() => setShowMenu(false)} to="/lists">
					Listas
				</Link>
				<Link onClick={() => setShowMenu(false)} to="/login">
					Admin
				</Link>
				{auth.login && (
					<Link to="/" onClick={logOut}>
						Log Out
					</Link>
				)}
				{!auth.login && (
					<Link to="/cart">
						<div
							onClick={() => setShowMenu(false)}
							className="header-cartContainer"
						>
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

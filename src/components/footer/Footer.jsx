import React from "react";
import logo from "../../assets/logo/logo.jpeg";
import "./footer.css";
const Footer = () => {
	return (
		<div className="footer-container">
			<div className="footer_backGroundContainer"></div>
			<h3>BV. LAS HERAS 658 - CÓRDOBA</h3>
			<img className="footer-logo" src={logo} alt="" />
			<h3>TEL: 3516846548</h3>
		</div>
	);
};

export default Footer;

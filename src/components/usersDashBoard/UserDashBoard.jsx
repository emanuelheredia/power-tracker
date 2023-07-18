import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userDashBoard.css";
import { getAllProducts } from "../../../helps/redux/actions/products.actions";
import { guiaImageAndCategorie } from "../../../helps/guide";
const UserDashBoard = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state);
	useEffect(() => {
		dispatch(getAllProducts());
	}, []);
	const getProductImage = (code) => {
		let images = [];
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				images = el[1];
			}
		});
		return images;
	};
	const getProductCategorie = (code) => {
		let categorie = "";
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				categorie = el[0];
			}
		});
		return categorie;
	};
	return (
		<div>
			<div className="userDashBoard-container-headTable">
				<h4>CODIGO PRODUCTO</h4>
				<h4>CATEGORIA</h4>
				<h4>MODELO VEHICULO</h4>
				<h4>MARCA PRODUCTO</h4>
				<h4>MARCA VEHICULO</h4>
				<h4>MAS DETALLES</h4>
				<h4>PRECIO</h4>
			</div>
			{products.products?.length > 0 &&
				products.products.map((el, index) => (
					<div
						className="userDashBoard-container-rowTable"
						key={index}
					>
						<p>{el.code ? el.code : "sin datos"}</p>
						<p title="Ver Imagen">{getProductCategorie(el.code)}</p>
						<p>{el.vehiculo ? el.vehiculo : "sin datos"}</p>
						<p>{el.proveedor ? el.proveedor : "sin datos"}</p>
						<p>{el.marca ? el.marca : "sin datos"}</p>
						<p>{el.moreInfo ? el.moreInfo : "sin datos"}</p>
						<p>
							{el.price && !isNaN(el.price)
								? el.price.toFixed(1)
								: "sin datos"}
						</p>
					</div>
				))}
		</div>
	);
};

export default UserDashBoard;

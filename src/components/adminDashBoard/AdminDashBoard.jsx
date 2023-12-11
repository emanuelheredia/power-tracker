import React from "react";
import ImagesAdministration from "./ImagesAdministration";
import FilesAdministrator from "./FilesAdministration";
import AddNewProduct from "./AddNewProduct";
import { NavLink, Route, Routes } from "react-router-dom";
import { useAlert } from "../customHooks/useAlert";
import AddNewUser from "./AddNewUser";
const AdminDashBoard = () => {
	const { showAlert, msgSwap, showAlertSumbit, showSpinner, setShowSpinner } =
		useAlert();
	return (
		<div className="adminDashBoard-container">
			<div className="adminDashBoard-navContainer">
				<NavLink to="update-product">Actualizar Precios</NavLink>
				<NavLink to="add-newProduct">Agregar Producto</NavLink>
				<NavLink to="update-imagesProduct">Actualizar Imágenes</NavLink>
				<NavLink to="add-user">Agregar Cliente</NavLink>
			</div>
			<Routes>
				<Route
					path="update-product"
					element={
						<FilesAdministrator
							showSpinner={showSpinner}
							setShowSpinner={setShowSpinner}
						/>
					}
				/>
				<Route
					path="add-newProduct"
					element={<AddNewProduct setShowSpinner={setShowSpinner} />}
				/>
				<Route
					path="update-imagesProduct"
					element={<ImagesAdministration />}
				/>
				<Route path="add-user" element={<AddNewUser />} />
			</Routes>
			{showAlertSumbit && showAlert(msgSwap)}
		</div>
	);
};

export default AdminDashBoard;

import React, { useState, useEffect } from "react";
import { structuringSelectValues } from "../helpers/helpers";
import { useSelector } from "react-redux";
import AddNewSeccions from "./AddNewSeccions";

const initialProductInfo = {
	code: "",
	category: "",
	subCategory: "",
	color: "",
	proveedor: "",
	moreInfo: "",
	price: 0,
	mark: "",
	images: [],
};
const AddNewProduct = () => {
	const { products } = useSelector((state) => state.products);
	const [productInfo, setProductInfo] = useState(initialProductInfo);
	/* 	useEffect(() => {
		dispatch(resetRequestedValuesStore());
		if (products.subCategories.length === 0)
			dispatch(getValuesAttributeSelects("subCategory"));
		if (products.subCategories.length === 0)
			dispatch(getValuesAttributeSelects("subCategory"));
	}, []);
 */
	return (
		<form className="addNewProduct-container">
			<h2>Agregar Nuevo Producto</h2>
			<div className="addNewProduct-campos">
				{/* 				<label htmlFor="code">Codigo</label>
				<input
					name="code"
					type="code"
					id="code"
					placeholder="Ingresá tel código del producto"
					onChange={handleChange}
					required
				/>
 */}{" "}
			</div>
			<div className="addNewProduct-campos" style={{ width: "90%" }}>
				{Object.entries(initialProductInfo).map((seccion, index) => (
					<AddNewSeccions
						key={index}
						productInfo={productInfo}
						setProductInfo={setProductInfo}
						seccion={seccion}
					/>
				))}
			</div>
		</form>
	);
};

export default AddNewProduct;

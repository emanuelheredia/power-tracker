import React, { useState, useEffect } from "react";
import { structuringSelectValues } from "../helpers/helpers";
import { useSelector, useDispatch } from "react-redux";
import AddNewProductSeccions from "./AddNewProductSeccions";
import {
	getValuesAttributeSelects,
	addNewProduct,
} from "../../redux/actions/products.actions";

const initialProductInfo = {
	code: "",
	category: "",
	subCategory: "",
	color: "",
	proveedor: "",
	moreInfo: "",
	mark: "",
	vehiculo: "",
	images: [],
	price: 0,
};
const AddNewProduct = () => {
	const products = useSelector((state) => state.products);
	const [productInfo, setProductInfo] = useState(initialProductInfo);
	const dispatch = useDispatch();
	useEffect(() => {
		if (products.valuesFilter.category.length === 0)
			dispatch(getValuesAttributeSelects("category"));
		if (products.valuesFilter.mark.length === 0)
			dispatch(getValuesAttributeSelects("mark"));
		if (products.valuesFilter.proveedor.length === 0)
			dispatch(getValuesAttributeSelects("proveedor"));
		if (products.valuesFilter.color.length < 6)
			dispatch(getValuesAttributeSelects("color"));
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addNewProduct(productInfo));
	};
	return (
		<form className="addNewProduct-container" onSubmit={handleSubmit}>
			<h2>Agregar Nuevo Producto</h2>
			<div className="addNewProduct-seccionsContainer">
				{Object.entries(initialProductInfo).map((seccion, index) => (
					<AddNewProductSeccions
						key={index}
						productInfo={productInfo}
						setProductInfo={setProductInfo}
						seccion={seccion}
					/>
				))}
			</div>
			<button type="submit" className="addNewProduct-btnSubmit">
				Guardar Producto
			</button>
		</form>
	);
};

export default AddNewProduct;

import React, { useState, useEffect } from "react";
import { structuringSelectValues } from "../helpers/helpers";
import { useSelector, useDispatch } from "react-redux";
import AddNewProductSeccions from "./AddNewProductSeccions";
import {
	getValuesAttributeSelects,
	addNewProduct,
} from "../../redux/actions/products.actions";
import { addNewProductToNews } from "../../redux/actions/news.actions";

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
	const [addToNews, setAddToNews] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		if (products.valuesFilter.category.length === 0)
			dispatch(getValuesAttributeSelects("category"));
		if (products.valuesFilter.mark.length === 0)
			dispatch(getValuesAttributeSelects("mark"));
		if (products.valuesFilter.proveedor.length === 0)
			dispatch(getValuesAttributeSelects("proveedor"));
		if (products.valuesFilter.subCategory.length === 0)
			dispatch(getValuesAttributeSelects("subCategory"));
		if (products.valuesFilter.color.length < 6)
			dispatch(getValuesAttributeSelects("color"));
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addNewProduct(productInfo));
		if (addToNews) dispatch(addNewProductToNews(productInfo));
	};
	const handleAddToNews = (e) => {
		setAddToNews(e.target.checked);
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
			<div className="checkbox-container">
				<label htmlFor="addToNews">Agregar a Novedades</label>
				<input
					id="addToNews"
					type="checkbox"
					defaultChecked
					onChange={handleAddToNews}
				/>
			</div>
			<button type="submit" className="addNewProduct-btnSubmit">
				Guardar Producto
			</button>
		</form>
	);
};

export default AddNewProduct;

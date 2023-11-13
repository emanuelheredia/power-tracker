import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getAllNews } from "../../redux/actions/news.actions";
import { FiTrash2 } from "react-icons/fi";
import { formatingPrice } from "../helpers/helpers";
import { structuringDate } from "../../../helps/helpers";

const CardNews = ({ product }) => {
	const { _id: id } = product;
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const handleDelete = () => {
		if (confirm("Estás seguro que deseas eliminar esta novedad?")) {
			dispatch(deleteNews(id));
			setTimeout(() => {
				dispatch(getAllNews());
			}, 1000);
		}
	};
	return (
		<div className="newsCard-container">
			<p className="newsCard-createDate">
				Ingreso : {structuringDate(product.updatedAt)}
			</p>
			{auth.login && (
				<FiTrash2
					onClick={handleDelete}
					className="cardNews-deleteIcon"
				/>
			)}
			<div className="cardNews-imagesContainer">
				{product.images.map((image) => (
					<img className="cardNews-image" src={image} />
				))}
			</div>
			<div className="newsCard-detailContainer vahiculoNews">
				<p>Vehiculo</p>
				<p>{product.vehiculo}</p>
			</div>
			<div className="newsCard-detailContainer subCategoryNews">
				<p>Categoría</p>
				<p>{product.subCategory}</p>
			</div>
			<div className="newsCard-detailContainer markNews">
				<p>Marca</p>
				<p>{product.mark}</p>
			</div>
			<div className="newsCard-detailContainer colorNews">
				<p>Color</p>
				<p>{product.color}</p>
			</div>
			<div className="newsCard-detailContainer proveedorNews">
				<p>Proveedor</p>
				<p>{product.proveedor}</p>
			</div>
			<div className="newsCard-detailContainer codeNews">
				<p>Código</p>
				<p>{product.code}</p>
			</div>
			<div className="newsCard-detailContainer priceNews">
				<p>Precio</p>
				<p style={{ fontWeight: "bolder" }}>
					$ {formatingPrice(product.price, product.proveedor)}
				</p>
			</div>
		</div>
	);
};

export default CardNews;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getAllNews } from "../../redux/actions/news.actions";
import { FiTrash2 } from "react-icons/fi";
import { formatingPrice } from "../helpers/helpers";
import { structuringDate } from "../../../helps/helpers";
import useCloudinary from "../customHooks/useCloudinary";

const CardNews = ({ product }) => {
	const { handleDelete: handleDeleteCloud } = useCloudinary();
	const { _id: id } = product;
	const auth = useSelector((state) => state.auth);
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const handleDelete = () => {
		if (confirm("Estás seguro que deseas eliminar esta novedad?")) {
			dispatch(deleteNews(id));
			if (product.images[0].public_id)
				handleDeleteCloud(product.images[0].public_id);
			setTimeout(() => {
				dispatch(getAllNews());
			}, 1000);
		}
	};
	return (
		<div className="newsCard-container">
			{product.updatedAt && (
				<p className="newsCard-createDate">
					Ingreso : {structuringDate(product.updatedAt)}
				</p>
			)}
			{auth.login && (
				<FiTrash2
					onClick={handleDelete}
					className="cardNews-deleteIcon"
				/>
			)}
			<div className="cardNews-imagesContainer">
				{product.images.map((image, index) => (
					<img
						className="cardNews-image"
						key={index}
						src={image.fileURL || image}
					/>
				))}
			</div>
			{product.vehiculo && (
				<div className="newsCard-detailContainer vahiculoNews">
					<p>Vehiculo</p>
					<p>{product.vehiculo}</p>
				</div>
			)}
			{product.subCategory && (
				<div className="newsCard-detailContainer subCategoryNews">
					<p>Categoría</p>
					<p>{product.subCategory}</p>
				</div>
			)}
			{product.mark && (
				<div className="newsCard-detailContainer markNews">
					<p>Marca</p>
					<p>{product.mark}</p>
				</div>
			)}
			{product.proveedor && (
				<div className="newsCard-detailContainer proveedorNews">
					<p>Proveedor</p>
					<p>{product.proveedor}</p>
				</div>
			)}
			{product.code && (
				<div className="newsCard-detailContainer codeNews">
					<p>Código</p>
					<p>{product.code}</p>
				</div>
			)}
			{(users.user?.token || auth.login) && product.price && (
				<div className="newsCard-detailContainer priceNews">
					<p>Precio</p>
					<p style={{ fontWeight: "bolder" }}>
						$ {formatingPrice(product.price, product.proveedor)}
					</p>
				</div>
			)}
		</div>
	);
};

export default CardNews;

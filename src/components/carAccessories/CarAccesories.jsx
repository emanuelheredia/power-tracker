import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imagesCarModels } from "../../../helps/guide";
import { FiTrash2 } from "react-icons/fi";
import sha1 from "sha1";
import Dropzone from "react-dropzone";
import { FaFolderPlus } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewAccessorieImage,
	deleteImage,
	getAccessorieImages,
} from "../../redux/actions/accesorieImages.actions";
const CarAccesories = () => {
	const carImages = imagesCarModels;
	const { accesoriesImages } = useSelector((state) => state);
	const { car } = useParams();
	const dispatch = useDispatch();
	const [image, setImage] = useState([]);
	const [imageData, setImageData] = useState({});
	const [category, setCategory] = useState("");
	const [imgSeliderSelected, setImgSeliderSelected] = useState(0);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		dispatch(getAccessorieImages(car));
	}, []);
	const getCarImage = (car) => {
		return carImages.filter((el) => el.name === car)[0];
	};
	const handleChange = (e) => {
		setImage(e.target.value);
	};
	const handleDrop = (files) => {
		const uploaders = files.map((file) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("tags", `codeinfuse, medium, gist`);
			formData.append("upload_preset", "power-track");
			formData.append("api_key", "554344367518936");
			formData.append("timestamp", Date.now() / 1000) | 0;
			setLoading(true);
			return axios
				.post(
					"https://api.cloudinary.com/v1_1/daxahjyc9/image/upload",
					formData,
					{ headers: { "X-Requested-With": "XMLHttpRequest" } },
				)
				.then((response) => {
					const data = response.data;
					const public_id = data.public_id;
					const fileURL = data.secure_url;
					setImageData({ fileURL, public_id });
				});
		});
		axios.all(uploaders).then(() => {
			setLoading(false);
		});
	};
	const handleDelete = async (id) => {
		const timestamp = new Date().getTime();
		const string = `public_id=${id}&timestamp=${timestamp}A00Golz5STHgRO2aGF4xbN3k17o`;
		const signature = await sha1(string);
		const formData = new FormData();
		formData.append("public_id", id);
		formData.append("signature", signature);
		formData.append("upload_preset", "power-track");
		formData.append("api_key", "554344367518936");
		formData.append("timestamp", timestamp);
		setLoading(true);
		return axios
			.post(
				"https://api.cloudinary.com/v1_1/daxahjyc9/image/destroy",
				formData,
				{ headers: { "X-Requested-With": "XMLHttpRequest" } },
			)
			.then((response) => {
				console.log(response);
				const data = response.data;
				console.log(data);
			});
	};
	const handleCategory = (e) => {
		setCategory(e.target.value.toUpperCase());
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addNewAccessorieImage({
				model: car,
				category,
				images: imageData.fileURL,
				public_id: imageData.public_id,
			}),
		);
		alert(imageData.fileURL);
		setImageData({});
		setCategory("");
	};
	const handleNextImageClick = (add) => {
		const imagesAccount = accesoriesImages.images.length - 1;
		const imgActive = imgSeliderSelected + add;
		if (imgActive > imagesAccount) return setImgSeliderSelected(0);
		if (imgActive < 0) return setImgSeliderSelected(imagesAccount);
		return setImgSeliderSelected(imgActive);
	};
	const handleImageDelete = (id, public_id) => {
		if (confirm("Estás seguro que desea eliminar la imágen")) {
			dispatch(deleteImage(id));
			setImgSeliderSelected(0);
			handleDelete(public_id);
		}
	};
	return (
		<div className="carAccessories_container">
			<Link to="/" className="carAccessories_btnGoBack">
				VOLVER
			</Link>
			<h3 className="carAccessories_title">{car}</h3>
			<div className="carAccessories_contenContainer">
				<img
					className="carAccessories_mainImage"
					src={getCarImage(car).img}
					alt=""
				/>
				<div className="carAccesories_contentAccessoriesContainer">
					<h3>{getCarImage(car).category}</h3>
					<div className="carAccessories_slider">
						{accesoriesImages.images.length > 0 && (
							<div className="carAccessoriesSlider_nextPrevContainer">
								<button
									onClick={() => handleNextImageClick(-1)}
								>
									Anterior
								</button>
								<h3>
									{
										accesoriesImages.images[
											imgSeliderSelected
										]?.category
									}
								</h3>
								<button onClick={() => handleNextImageClick(1)}>
									Siguiente
								</button>
							</div>
						)}
						{accesoriesImages.images.length > 0 && (
							<div
								key={
									accesoriesImages.images[imgSeliderSelected]
										?.images
								}
								className="carAccessories_imageSliderContainer"
							>
								<img
									className="carAccessories_imageSlider"
									src={
										accesoriesImages.images[
											imgSeliderSelected
										]?.images
									}
								/>
								<FiTrash2
									onClick={() =>
										handleImageDelete(
											accesoriesImages.images[
												imgSeliderSelected
											]?._id,
											accesoriesImages.images[
												imgSeliderSelected
											]?.public_id,
										)
									}
									className="carAccessoriesSlider_btnDelete"
								/>
							</div>
						)}
						{accesoriesImages.images.length > 0 && (
							<div className="carAccessoriesSlider_prevImagesContainer">
								{accesoriesImages.images.map((el, index) => (
									<img
										className={
											index === imgSeliderSelected &&
											"activeImgSlider"
										}
										onClick={() =>
											setImgSeliderSelected(index)
										}
										key={el.public_id}
										src={el.images}
									/>
								))}
							</div>
						)}
					</div>
					{
						<form action="" onSubmit={handleSubmit}>
							<h3>Agregá una imágen de accesorios al modelo</h3>
							<div className="carAccessories-inputAddImageContainer">
								<label htmlFor="category">Modelo</label>
								<input
									disabled
									id="category"
									type="text"
									value={car}
								/>
							</div>
							<div className="carAccessories-inputAddImageContainer">
								<label htmlFor="category">
									Ingresa la categoría
								</label>
								<input
									id="category"
									type="text"
									onChange={handleCategory}
									required
									value={category}
								/>
							</div>
							<Dropzone
								className="dropzone"
								onChange={handleChange}
								onDrop={handleDrop}
								value={image}
							>
								{({ getRootProps, getInputProps }) => (
									<section>
										<div
											{...getRootProps({
												className: "dropzone",
											})}
										>
											<input {...getInputProps()} />
											<span>
												<FaFolderPlus />
											</span>
											<p>
												Coloca la imágen aquí, o clickea
												para seleccionar
											</p>
										</div>
									</section>
								)}
							</Dropzone>
							<img
								style={{ width: "100px", display: "block" }}
								src={imageData.fileURL}
							/>
							{imageData.fileURL && (
								<button
									type="submit"
									className="addNewProduct-btnSubmit"
								>
									Guardar Imágen
								</button>
							)}
						</form>
					}
				</div>
			</div>
		</div>
	);
};

export default CarAccesories;

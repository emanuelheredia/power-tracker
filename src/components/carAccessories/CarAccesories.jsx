import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imagesCarModels } from "../../../helps/guide";
import { FiTrash2 } from "react-icons/fi";
import sha1 from "sha1";
import { Spinner } from "../spinner/Spinner";
import Dropzone from "react-dropzone";
import { FaFolderPlus } from "react-icons/fa";
import axios from "axios";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewAccessorieImage,
	deleteImage,
	getAccessorieImages,
} from "../../redux/actions/accesorieImages.actions";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "350px",
		height: "380px",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "rgb(238, 165, 29)",
	},
};
Modal.setAppElement("*");
const CarAccesories = () => {
	const carImages = imagesCarModels;
	const { accesoriesImages } = useSelector((state) => state);
	const auth = useSelector((state) => state.auth);
	const [modalIsOpen, setIsOpen] = React.useState(false);
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
	function openModal() {
		setIsOpen(true);
		setLoading(false);
	}
	function closeModal() {
		setIsOpen(false);
		setImageData({});
		setCategory("");
	}
	const getCarImage = (car) => {
		return carImages.filter((el) => el.name === car)[0];
	};
	const handleChange = (e) => {
		setImage(e.target.value);
	};
	const handleDrop = (files) => {
		const uploaders = files.map((file) => {
			setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("tags", `codeinfuse, medium, gist`);
			formData.append("upload_preset", "power-track");
			formData.append("api_key", "554344367518936");
			formData.append("timestamp", Date.now() / 1000) | 0;
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
				const data = response.data;
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
		setImageData({});
		setCategory("");
		closeModal();
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
						{accesoriesImages.images.length === 0 && (
							<h3>Sin accesorios por el momento</h3>
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
								{auth.login && (
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
								)}
							</div>
						)}
					</div>
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						style={customStyles}
						contentLabel="Example Modal"
					>
						<button
							style={{
								textAlign: "end",
								padding: "0",
								backgroundColor: "inherit",
							}}
							onClick={closeModal}
						>
							X
						</button>
						<form
							action=""
							className="carAccessories_formContainer"
							onSubmit={handleSubmit}
						>
							<h3>Agregá una imágen de accesorio</h3>
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
									<section
										onClick={() => {
											setLoading(true);
											setImageData({});
										}}
									>
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
							{loading && <Spinner />}
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
					</Modal>
				</div>
				{accesoriesImages.images.length > 0 && (
					<div className="carAccessoriesSlider_prevImagesContainer">
						{accesoriesImages.images.map((el, index) => (
							<img
								className={
									index === imgSeliderSelected &&
									"activeImgSlider"
								}
								onClick={() => setImgSeliderSelected(index)}
								key={el.public_id}
								src={el.images}
							/>
						))}
					</div>
				)}
				{auth.login && (
					<button
						onClick={openModal}
						className="carAccessories_btnAddImage"
					>
						Agregar Imagen
					</button>
				)}
			</div>
		</div>
	);
};

export default CarAccesories;

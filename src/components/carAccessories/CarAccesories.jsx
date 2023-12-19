import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imagesCarModels, imagesProductsHome } from "../../../helps/guide";
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
	getAccessorieCategories,
	getAccessorieImages,
} from "../../redux/actions/accesorieImages.actions";
import Select from "react-select";

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
		zIndex: "1000",
	},
};
const selectStyles = () => ({
	control: (baseStyles) => ({
		...baseStyles,
		fontSize: ".9rem",
	}),
	option: (baseStyles) => ({
		...baseStyles,
		textAlign: "center",
		fontSize: ".9rem",
		padding: 0,
		color: "black",
		backgroundColor: "white",
	}),
});

Modal.setAppElement("*");
const CarAccesories = () => {
	const carImages = imagesCarModels;
	const { accesoriesImages } = useSelector((state) => state);
	const auth = useSelector((state) => state.auth);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const { car } = useParams();
	const dispatch = useDispatch();
	const [image, setImage] = useState([]);
	const [erroUpload, setErroUpload] = useState(false);
	const [imageData, setImageData] = useState({});
	const [category, setCategory] = useState("");
	const [superCategory, setSuperCategory] = useState("");
	const [categorySelected, setCategorySelected] = useState("");
	const [imgSeliderSelected, setImgSeliderSelected] = useState(0);
	const [showLoader, setShowLoader] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		dispatch(getAccessorieCategories(car));
		dispatch(getAccessorieImages(car, categorySelected));
	}, [categorySelected]);
	function openModal() {
		setIsOpen(true);
		setLoading(false);
		setSuperCategory("");
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
				})
				.catch((error) => {
					setErroUpload(true);
					setLoading(false);
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
				superCategory,
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
		if (confirm("Estás seguro que desea eliminar la imágen?")) {
			dispatch(deleteImage(id));
			setImgSeliderSelected(0);
			handleDelete(public_id);
		}
	};
	const getCategoryImageFromGuide = (category) => {
		for (let categ of imagesProductsHome) {
			if (categ.name === category) return categ.images;
		}
	};
	const reduceSizeImage = (imageUrl, main) => {
		let firstCut = imageUrl.replace(
			"upload/",
			`upload/c_scale,${main ? "w_550" : "w_80"}/`,
		);
		return firstCut;
	};
	console.log(showLoader);
	return (
		<div className="carAccessories_container">
			<Link to="/" className="carAccessories_btnGoBack">
				VOLVER
			</Link>
			<h3 className="carAccessories_title">{car}</h3>
			<div className="carAccessories_contenContainer">
				<div className="carAccessories_categoriesContainer">
					{accesoriesImages.categoriesImages.map((categ) => (
						<div
							onClick={() => {
								setCategorySelected(categ);
								setImgSeliderSelected(0);
								setShowLoader(true);
							}}
							key={categ}
						>
							<button
								className={
									categ === categorySelected &&
									"activeButtonCategory"
								}
							>
								{categ}
							</button>
							<img
								src={getCategoryImageFromGuide(categ)}
								className={
									categ === categorySelected &&
									"activeImgSlider"
								}
							/>
							<h5 className="carAccessories_categName">
								{categ}
							</h5>
						</div>
					))}
				</div>
				<img
					className="carAccessories_mainImage"
					src={getCarImage(car).img}
					alt=""
				/>
				<div className="carAccesories_contentAccessoriesContainer">
					<div className="carAccessories_slider">
						{accesoriesImages.images.length > 0 &&
							!modalIsOpen &&
							!showLoader && (
								<div className="carAccessoriesSlider_nextPrevContainer">
									<button
										onClick={() => handleNextImageClick(-1)}
									>
										<p>Anterior</p>
										<span>❮</span>
									</button>
									<h3>
										{
											accesoriesImages.images[
												imgSeliderSelected
											]?.category
										}
									</h3>
									<button
										onClick={() => handleNextImageClick(1)}
									>
										<p>Siguiente</p>
										<span>❯</span>
									</button>
								</div>
							)}
						{accesoriesImages.images.length === 0 && (
							<h3
								style={{
									textAlign: "center",
									paddingTop: "20%",
								}}
							>
								Seleccione una categoría
							</h3>
						)}
						{accesoriesImages.images.length > 0 && (
							<div
								key={
									accesoriesImages.images[imgSeliderSelected]
										?.images
								}
								className="carAccessories_imageSliderContainer"
							>
								{showLoader && <Spinner />}
								{accesoriesImages.images.map((img, index) => (
									<img
										onLoad={() => setShowLoader(false)}
										className="carAccessories_imageSlider"
										style={{
											display: `${
												index !== imgSeliderSelected &&
												"none"
											}`,
										}}
										src={reduceSizeImage(img.images, true)}
									/>
								))}
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
								<Select
									placeholder="Selecioná la Categoría"
									name="superCategory"
									style={{ minWidth: "100%" }}
									options={imagesProductsHome.map((categ) => {
										return {
											label: categ.name,
											value: categ.name,
										};
									})}
									value={superCategory.value}
									type="text"
									styles={selectStyles()}
									onChange={(e) => setSuperCategory(e.value)}
								/>
								<label htmlFor="category">Modelo</label>
								<input
									disabled
									id="category"
									type="text"
									value={car}
								/>
								<label htmlFor="category">
									Ingresa la subCategoría
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
							{erroUpload && (
								<h3
									style={{
										backgroundColor: "red",
										padding: "20px 10px",
										borderRadius: "5px",
										color: "whitesmoke",
										textAlign: "center",
										position: "relative",
									}}
								>
									Error en la carga, puede deberse al tamaño
									de la imágen, reintentá con otro formato o
									tamaño
									<span
										onClick={() => setErroUpload(false)}
										style={{
											position: "absolute",
											top: "5px",
											right: "5px",
											backgroundColor: "whitesmoke",
											borderRadius: "50%",
											width: "25px",
											color: "red",
											cursor: "pointer",
										}}
									>
										X
									</span>
								</h3>
							)}
							{loading && <Spinner />}
							<img
								style={{ width: "100px", display: "block" }}
								src={imageData.fileURL}
							/>
							{imageData.fileURL && superCategory && (
								<button
									type="submit"
									className="addNewAccessorie-btnSubmit"
								>
									Guardar Imágen
								</button>
							)}
						</form>
					</Modal>
				</div>
				{auth.login && (
					<button
						onClick={openModal}
						className="carAccessories_btnAddImage"
					>
						Agregar Imagen
					</button>
				)}
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
								src={reduceSizeImage(el.images, false)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default CarAccesories;

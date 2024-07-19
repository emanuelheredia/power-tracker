import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	imagesCarModels,
	imagesProductsHome,
	brands,
} from "../../../helps/guide";
import { Spinner } from "../spinner/Spinner";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewAccessorieImage,
	deleteImage,
	getAccessorieCategories,
	getAccessorieImages,
	resetAccessorieState,
} from "../../redux/actions/accesorieImages.actions";
import Select from "react-select";
import useCloudinary from "../customHooks/useCloudinary";
import { reduceSizeImage } from "../../../helps/helpers";
import SliderImages from "../sliderImages/SliderImages";
import { DropImages } from "./DropImages";

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
	const [erroUpload, setErroUpload] = useState(false);
	const [imageData, setImageData] = useState({});
	const [category, setCategory] = useState("");
	const [superCategory, setSuperCategory] = useState("");
	const [brand, setBrand] = useState("");
	const [categorySelected, setCategorySelected] = useState("");
	const [imgSeliderSelected, setImgSeliderSelected] = useState(0);
	const [showLoader, setShowLoader] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		dispatch(getAccessorieCategories(car));
		dispatch(
			getAccessorieImages(
				{
					model: car,
					superCategory: categorySelected,
				},
				100,
			),
		);
	}, [categorySelected]);
	useEffect(() => {
		return () => dispatch(resetAccessorieState());
	}, []);
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

	const { handleDrop, handleDelete } = useCloudinary();
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
				proveedor: brand,
				images: imageData.fileURL,
				public_id: imageData.public_id,
			}),
		);
		setImageData({});
		setCategory("");
		closeModal();
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
	return (
		<div className="carAccessories_container">
			<Link to="/" className="carAccessories_btnGoBack">
				VOLVER
			</Link>
			<h3 className="carAccessories_title">{car}</h3>
			<div className="carAccessories_contenContainer">
				<div className="carAccessories_categoriesContainer">
					{accesoriesImages.categoriesImages?.map((categ) => (
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
									categ === categorySelected
										? "activeButtonCategory"
										: ""
								}
							>
								{categ}
							</button>
							<img
								src={getCategoryImageFromGuide(categ)}
								className={
									categ === categorySelected
										? "activeImgSlider"
										: ""
								}
							/>
							<h5 className="carAccessories_categName">
								{categ}
							</h5>
						</div>
					))}
				</div>
				{showLoader && accesoriesImages.images?.length === 0 && (
					<div className="carAccessories_spinnerContainer">
						<Spinner />
					</div>
				)}
				<img
					className="carAccessories_mainImage"
					src={getCarImage(car).img}
					alt=""
				/>
				<div className="carAccesories_contentAccessoriesContainer">
					<SliderImages
						images={accesoriesImages.images}
						adminLogin={auth.login}
						setShowLoader={setShowLoader}
						showLoader={showLoader}
						imgSeliderSelected={imgSeliderSelected}
						setImgSeliderSelected={setImgSeliderSelected}
						handleImageDelete={handleImageDelete}
						anotherCondition={!modalIsOpen}
					/>
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
							<input
								disabled
								id="category"
								type="text"
								value={car}
							/>
							<Select
								placeholder="Selecioná la Categoría"
								name="superCategory"
								style={{
									minWidth: "100%",
								}}
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
							<Select
								placeholder="Selecioná la Marca"
								name="superCategory"
								style={{ minWidth: "100%" }}
								options={brands.map((brand) => {
									return {
										label: brand.name.toUpperCase(),
										value: brand.name.toUpperCase(),
									};
								})}
								value={brand.value}
								type="text"
								styles={selectStyles()}
								onChange={(e) => setBrand(e.value)}
								required
							/>
							<input
								id="category"
								type="text"
								onChange={handleCategory}
								placeholder="Ingresá la Sub Categoría"
								required
								value={category}
							/>
						</div>
						<DropImages
							setImageData={setImageData}
							setLoading={setLoading}
							handleDrop={handleDrop}
						/>
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
								Error en la carga, puede deberse al tamaño de la
								imágen, reintentá con otro formato o tamaño
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
				{auth.login && (
					<button
						onClick={openModal}
						className="carAccessories_btnAddImage"
					>
						Agregar Imagen
					</button>
				)}
				{accesoriesImages.images?.length > 0 && (
					<div className="carAccessoriesSlider_prevImagesContainer">
						{accesoriesImages.images.map((el, index) => (
							<img
								className={
									index === imgSeliderSelected
										? "activeImgSlider"
										: ""
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

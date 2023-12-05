import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imagesCarModels } from "../../../helps/guide";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import Dropzone from "react-dropzone";
import { FaFolderPlus } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewAccessorieImage,
	getAccessorieImages,
} from "../../redux/actions/accesorieImages.actions";
const CarAccesories = () => {
	const carImages = imagesCarModels;
	const { accesoriesImages } = useSelector((state) => state);
	const { car } = useParams();
	const dispatch = useDispatch();
	const [image, setImage] = useState([]);
	const [urlImage, setUrlImage] = useState("");
	const [category, setCategory] = useState("");
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
	const AutoplaySlider = withAutoplay(AwesomeSlider);
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
					const fileURL = data.secure_url;
					setUrlImage(fileURL);
				});
		});
		axios.all(uploaders).then(() => {
			setLoading(false);
		});
	};
	const handleCategory = (e) => {
		setCategory(e.target.value.toUpperCase());
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addNewAccessorieImage({ model: car, category, images: urlImage }),
		);
		alert(urlImage);
		setUrlImage("");
		setCategory("");
	};
	console.log(getCarImage(car));
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
						<AutoplaySlider
							play={true}
							interval={6000}
							cancelOnInteraction={false}
						>
							{accesoriesImages.images.map((el) => (
								<div
									key={el.images}
									className="carAccessories_imageSliderContainer"
								>
									<img
										className="carAccessories_imageSlider"
										src={el.images}
									/>
									<h3>{el.category}</h3>
								</div>
							))}
						</AutoplaySlider>
					</div>
					{/* 					<form action="" onSubmit={handleSubmit}>
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
							src={urlImage}
						/>
						{urlImage !== "" && (
							<button
								type="submit"
								className="addNewProduct-btnSubmit"
							>
								Guardar Imágen
							</button>
						)}
					</form>
 */}{" "}
				</div>
			</div>
		</div>
	);
};

export default CarAccesories;

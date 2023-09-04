import React, { useEffect, useState } from "react";
import "./imageCard.css";
import { FiEdit3, FiCheck, FiX, FiTrash2 } from "react-icons/fi";

const ImageCard = ({ imgUrl, imagesUrl, index, setNewUrlImages, update }) => {
	const [showInput, setShowInput] = useState(false);
	const [showBtnSucces, setShowBtnSucces] = useState(false);
	const [urlInput, setUrlInput] = useState("");
	const handleBtnEdit = (e) => {
		setShowInput(!showInput);
		setUrlInput("");
	};
	useEffect(() => {
		if (urlInput && urlInput.includes("https://")) {
			setShowBtnSucces(true);
		} else {
			setShowBtnSucces(false);
		}
	}, [urlInput]);

	const handleOnclickBtnSucces = () => {
		if (urlInput && update) {
			const copyArrayImagesDB = [...imagesUrl];
			copyArrayImagesDB[index] = urlInput;
			setNewUrlImages(copyArrayImagesDB);
		}
		if (urlInput && !update) {
			const copyArrayImagesDB = [...imagesUrl];
			copyArrayImagesDB.push(urlInput);
			setNewUrlImages(copyArrayImagesDB);
		}
		setShowInput(false);
		setShowBtnSucces(false);
	};
	const handleAddImage = () => {
		setShowInput(true);
		setUrlInput("");
	};
	const handleBtnDelete = (e) => {
		const copyArrayImagesDB = [...imagesUrl];
		copyArrayImagesDB.splice(index, 1);
		console.log(copyArrayImagesDB);
		setNewUrlImages(copyArrayImagesDB);
	};

	return (
		<div className="imageCard-container">
			<img
				className="admiDashBoard-imgOfCategories"
				src={update ? urlInput || imgUrl : imgUrl}
				onClick={!update ? handleAddImage : undefined}
			/>
			{update && (
				<FiEdit3
					onClick={() => handleBtnEdit()}
					className="ImageCard-editIcon"
				/>
			)}
			{update && (
				<FiTrash2
					onClick={() => handleBtnDelete()}
					className="ImageCard-deleteIcon"
				/>
			)}

			{showInput && (
				<input
					type="text"
					placeholder="Ingrese Url de la imagen"
					className="imageCard-inputEdit"
					onChange={(e) => setUrlInput(e.target.value)}
				/>
			)}
			{showInput && (
				<FiX
					onClick={() => handleBtnEdit()}
					className="imageCard-btnCancel"
				/>
			)}
			{showBtnSucces && (
				<FiCheck
					onClick={() => handleOnclickBtnSucces()}
					className="imageCard-btnSuccess"
				/>
			)}
		</div>
	);
};

export default ImageCard;

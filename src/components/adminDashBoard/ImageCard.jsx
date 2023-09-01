import React, { useEffect, useState } from "react";
import "./imageCard.css";
import { FiEdit3, FiCheck, FiX } from "react-icons/fi";

const ImageCard = ({ imgUrl, imagesUrl, setShowBtnUpdateImages, index }) => {
	const [showInput, setShowInput] = useState(false);
	const [showBtnSucces, setShowBtnSucces] = useState(false);
	const [urlInput, setUrlInput] = useState("");
	const [urlNewImage, setUrlNewImage] = useState("");
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
		setUrlNewImage(urlInput);
		setShowInput(false);
		setShowBtnSucces(false);
	};
	return (
		<div className="imageCard-container">
			<img
				className="admiDashBoard-imgOfCategories"
				src={urlNewImage || imgUrl}
			/>
			<FiEdit3 onClick={handleBtnEdit} className="ImageCard-editIcon" />
			{showInput && (
				<input
					type="text"
					placeholder="Ingrese Url de la imagen"
					className="imageCard-inputEdit"
					onChange={(e) => setUrlInput(e.target.value)}
				/>
			)}
			{showInput && (
				<FiX onClick={handleBtnEdit} className="imageCard-btnCancel" />
			)}
			{showBtnSucces && (
				<FiCheck
					onClick={handleOnclickBtnSucces}
					className="imageCard-btnSuccess"
				/>
			)}
		</div>
	);
};

export default ImageCard;

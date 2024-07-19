import React, { useEffect, useState } from "react";
import { FiEdit3, FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import { DropImages } from "../carAccessories/DropImages";
import useCloudinary from "../customHooks/useCloudinary";

const ImageCard = ({ imgUrl, imagesUrl, index, setNewUrl, update }) => {
	const [showInput, setShowInput] = useState(false);
	const [imageData, setImageData] = useState({});
	const [loading, setLoading] = useState(false);
	const [showBtnSucces, setShowBtnSucces] = useState(false);
	const [urlInput, setUrlInput] = useState("");
	const { handleDrop, handleDelete } = useCloudinary();
	console.log(index);
	const handleBtnEdit = (e) => {
		setShowInput(!showInput);
		setUrlInput("");
	};
	useEffect(() => {
		if (imageData?.fileURL && imageData?.fileURL.includes("https://")) {
			setShowBtnSucces(true);
		} else {
			setShowBtnSucces(false);
		}
	}, [imageData]);
	const handleImageDelete = (id, public_id) => {
		if (confirm("Estás seguro que desea eliminar la imágen?")) {
			//dispatch(deleteImage(id));
			handleDelete(public_id);
		}
	};
	const handleOnclickBtnSucces = () => {
		if (imageData?.fileURL && update) {
			const copyArrayImagesDB = [...imagesUrl];
			copyArrayImagesDB[index] = imageData?.fileURL;
			setNewUrl(copyArrayImagesDB);
		}
		if (imageData?.fileURL && !update) {
			const copyArrayImagesDB = [...imagesUrl];
			copyArrayImagesDB.push(imageData?.fileURL);
			console.log(copyArrayImagesDB);
			setNewUrl(copyArrayImagesDB);
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
		setNewUrl(copyArrayImagesDB);
	};
	console.log(urlInput);
	return (
		<div
			className="imageCard-container"
			style={{ cursor: !update ? "pointer" : "" }}
		>
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
				<div style={{ position: "absolute", top: "5px" }}>
					<DropImages
						setImageData={setImageData}
						setLoading={setLoading}
						handleDrop={handleDrop}
					/>
				</div>
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

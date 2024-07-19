import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FaFolderPlus } from "react-icons/fa";

export const DropImages = ({
	setImageData,
	setLoading,
	handleDrop,
	setErroUpload,
}) => {
	const [image, setImage] = useState([]);
	const handleDropFile = (files) => {
		handleDrop(files, setImageData, setErroUpload, setLoading);
	};
	const handleChange = (e) => {
		setImage(e.target.value);
	};
	return (
		<Dropzone
			className="dropzone"
			onChange={handleChange}
			onDrop={handleDropFile}
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
						<p>Coloca la imágen aquí, o clickea para seleccionar</p>
					</div>
				</section>
			)}
		</Dropzone>
	);
};

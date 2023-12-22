import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Dropzone from "react-dropzone";
import { FaFolderPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewProductToNews,
	getAllNews,
} from "../../redux/actions/news.actions";
import useCloudinary from "../customHooks/useCloudinary";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "350px",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "rgb(238, 165, 29)",
	},
};

Modal.setAppElement("*");
const AddNewNewsModal = ({ open, setShowModal }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [newData, setNewData] = useState({});
	const [image, setImage] = useState("");
	const [imageData, setImageData] = useState({});
	const [errorUpload, setErroUpload] = useState(false);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { handleDrop, handleDelete } = useCloudinary();
	const { news } = useSelector((state) => state);
	useEffect(() => {
		setIsOpen(open);
	}, [open]);
	function closeModal() {
		setIsOpen(false);
		setNewData({});
		setImageData({});
		setShowModal(false);
	}
	useEffect(() => {
		if (news.msg === "Almacenamiento Exitoso") closeModal();
		dispatch(getAllNews());
	}, [news.msg]);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addNewProductToNews({ ...newData, images: imageData }));
	};
	const handleChange = (e) => {
		setImage(e.target.value);
	};
	const handleDropFile = (files) => {
		handleDrop(files, setImageData, setErroUpload, setLoading);
	};
	const handleChangeNewsData = (e) => {
		setNewData({ ...newData, [e.target.id]: e.target.value });
	};
	return (
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
			<div className="addNewNewsModal_bodyContainer">
				<form onSubmit={handleSubmit}>
					<h3 className="addNewNewsModal_title">Agregar Novedad</h3>
					<div>
						<label htmlFor="vehiculo">Vehículo</label>
						<input
							id="vehiculo"
							onChange={handleChangeNewsData}
							type="text"
						/>
					</div>
					<div>
						<label htmlFor="subCategory">Categoría</label>
						<input
							id="subCategory"
							onChange={handleChangeNewsData}
							type="text"
						/>
					</div>
					<div>
						<label htmlFor="mark">Marca</label>
						<input
							id="mark"
							onChange={handleChangeNewsData}
							type="text"
						/>
					</div>
					<div>
						<label htmlFor="proveedor">Proveedor</label>
						<input
							id="proveedor"
							onChange={handleChangeNewsData}
							type="text"
						/>
					</div>
					<div>
						<label htmlFor="code">Código</label>
						<input
							id="code"
							onChange={handleChangeNewsData}
							type="text"
						/>
					</div>
					<div>
						<label htmlFor="price">Precio</label>
						<input
							id="price"
							onChange={handleChangeNewsData}
							type="number"
						/>
					</div>
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
									<p>
										Coloca la imágen aquí, o clickea para
										seleccionar
									</p>
								</div>
							</section>
						)}
					</Dropzone>
					{imageData.fileURL && <button>Agregar</button>}
					{imageData.fileURL && <img src={imageData.fileURL} />}
				</form>
			</div>
		</Modal>
	);
};

export default AddNewNewsModal;

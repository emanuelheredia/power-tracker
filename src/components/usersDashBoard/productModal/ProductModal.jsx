import React from "react";
import Modal from "react-modal";
import { guiaImageAndCategorie } from "../../../../helps/guide";
import { FaImage } from "react-icons/fa";
import "./productModal.css";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "85%",
		height: "auto",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "rgb(238, 165, 29)",
	},
};
Modal.setAppElement("*");
const ProductModal = ({ product, setOpennModal, categorie }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
		setOpennModal(false);
	}
	const getProductImage = (code) => {
		let images = [];
		guiaImageAndCategorie.categories.map((el) => {
			if (el.includes(code)) {
				images = el[1];
			}
		});
		return images;
	};

	return (
		<p
			style={{
				width: "80%",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<p style={{ margin: "0px" }}>{categorie}</p>
			<FaImage
				style={{
					padding: "0 1rem 0 0",
					fontSize: "20px",
					cursor: "pointer",
				}}
				onClick={openModal}
				title="Ver Imagen"
			/>
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
				<div className="productModal-text-container">
					<h4 className="productModal-title">{categorie}</h4>
					<div className="productModal-image-coontainer">
						<img
							className="productModal-image"
							src={getProductImage(product.code)[0]}
							alt=""
						/>
						{getProductImage(product.code)[1] && (
							<img
								className="productModal-image"
								src={getProductImage(product.code)[1]}
								alt=""
							/>
						)}
					</div>
				</div>
			</Modal>
		</p>
	);
};
export default ProductModal;

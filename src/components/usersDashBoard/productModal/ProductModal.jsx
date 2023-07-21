import React from "react";
import Modal from "react-modal";
import { guiaImageAndCategorie } from "../../../../helps/guide";
import "./productModal.css";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "80%",
		heigth: "50%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "rgb(238, 165, 29)",
	},
};
Modal.setAppElement("*");
const ProductModal = ({ openModal, product, setOpennModal, categorie }) => {
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
		<p>
			<p style={{ margin: "0px" }} onClick={openModal}>
				{categorie}
			</p>
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
					<h4 className="productModal-title">
						Codigo : {product.code}
					</h4>
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
					<h2 style={{ textAlign: "center" }}>Power Track</h2>
				</div>
			</Modal>
		</p>
	);
};
export default ProductModal;

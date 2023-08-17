import React from "react";
import Modal from "react-modal";
import "./productModal.css";
import "../userDashBoard.css";
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
const ProductModal = ({
	product,
	setOpennModal,
	categorie,
	getProductAttribute,
}) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div className="userDashBoard-item-celdaImages">
			<img
				onClick={openModal}
				src={getProductAttribute(product.code, "imagenes")[0]}
			/>
			{getProductAttribute(product.code, "imagenes")[1] && (
				<img
					onClick={openModal}
					className="productModal-image"
					src={getProductAttribute(product.code, "imagenes")[1]}
					alt=""
				/>
			)}
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
							src={
								getProductAttribute(product.code, "imagenes")[0]
							}
							alt=""
						/>
						{getProductAttribute(product.code, "imagenes")[1] && (
							<img
								className="productModal-image"
								src={
									getProductAttribute(
										product.code,
										"imagenes",
									)[1]
								}
								alt=""
							/>
						)}
					</div>
				</div>
			</Modal>
		</div>
	);
};
export default ProductModal;

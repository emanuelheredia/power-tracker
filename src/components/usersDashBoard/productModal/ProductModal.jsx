import React from "react";
import Modal from "react-modal";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "350px",
		height: "350px",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "rgb(238, 165, 29)",
	},
};
Modal.setAppElement("*");
const ProductModal = ({ product }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const { images, category, code } = product;
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
				style={{ cursor: "pointer", borderRadius: "5px" }}
				src={images[0] || ""}
			/>
			{code !== "sin datos" && images[1] && (
				<img
					onClick={openModal}
					className="productModal-image"
					src={images[1]}
					alt=""
				/>
			)}{" "}
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
					<h4 className="productModal-title">{category}</h4>
					<div className="productModal-image-coontainer">
						{images.length > 0 && (
							<AwesomeSlider>
								{images.map((image, index) => (
									<div key={index}>
										<img
											key={index}
											src={image}
											className="productModal-image"
										/>
									</div>
								))}
							</AwesomeSlider>
						)}
					</div>
				</div>
			</Modal>
		</div>
	);
};
export default ProductModal;

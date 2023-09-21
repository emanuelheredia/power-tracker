import React from "react";
import Modal from "react-modal";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { FaCartPlus } from "react-icons/fa";
import { formatingPrice } from "../../helpers/helpers";

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
const CartModal = ({ product }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const {
		category,
		code,
		subCategory,
		price,
		vehiculo,
		proveedor,
		images,
		color,
	} = product;

	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}
	const handleAddToCart = () => {};

	return (
		<div className="userDashBoard-item-celdaImages">
			<FaCartPlus
				className="cardProduct-addToCartIcon"
				onClick={openModal}
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
				<div className="productModal-bodyContainer">
					<h2 className="cartModal-title">Agregar Producto</h2>
					<div className="cartModal-imagesContainer">
						{images.map(
							(image, index) =>
								index < 2 && (
									<img
										key={index}
										className="cartModal-image"
										src={image}
									/>
								),
						)}
					</div>
					<div className="cartModal-productInfo">
						<div className="cartModal-productInfo-seccionContainer">
							<p>CODIGO :</p>
							<p>{code}</p>
						</div>
						<div className="cartModal-productInfo-seccionContainer">
							<p>VEHICULOS :</p>
							<p>{vehiculo}</p>
						</div>
						<div className="cartModal-productInfo-seccionContainer">
							<p>CATEGORÍA :</p>
							<p>{category}</p>
						</div>
						<div className="cartModal-productInfo-seccionContainer">
							<p>SUB CATEORÍA :</p>
							<p>{subCategory}</p>
						</div>
						{!color === "sin datos" && (
							<div className="cartModal-productInfo-seccionContainer">
								<p>Color :</p>
								<p>{color}</p>
							</div>
						)}
						<div className="cartModal-productInfo-seccionContainer">
							<p>MARCA :</p>
							<p>{proveedor}</p>
						</div>
						<div className="cartModal-productInfo-seccionContainer">
							<p>PRECIO :</p>
							<p style={{ fontWeight: "bolder" }}>
								$ {formatingPrice(price, proveedor)}
							</p>
						</div>
					</div>
					<div className="cartModal-counterContainer">
						<p className="cartModal-symbolsCunter">-</p>
						<p>0</p>
						<p className="cartModal-symbolsCunter">+</p>
					</div>
					<div className="cartModal-buttonsContainer">
						<button>Agregar al Carrito</button>
						<button>Cancelar</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};
export default CartModal;

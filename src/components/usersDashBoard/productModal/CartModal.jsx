import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import swal from "sweetalert";
import "react-awesome-slider/dist/styles.css";
import { FaCartPlus } from "react-icons/fa";
import { formatingPrice } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductToCart,
	updateAmountProductCart,
	resetResponseMsgsCartStore,
	deleteProductFromCart,
} from "../../../redux/actions/cart.actions";

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
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart);
	const { msg, error } = useSelector((state) => state.cart);
	const [msgSwap, setMsgSwap] = useState({});
	const [showAlertSumbit, setShowAlertSumbit] = useState(false);
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
	const isPoductIncart = () => {
		let isInCart = cart.filter((el) => {
			if (product.code === el.product.code) {
				return true;
			} else {
				return false;
			}
		});
		if (isInCart.length > 0) return isInCart[0];
		else return false;
	};
	const [amount, setAmount] = useState(
		isPoductIncart() ? isPoductIncart().amount : 0,
	);
	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}
	const handlePlusAmount = () => {
		setAmount(amount + 1);
	};
	const handleMinusAmount = () => {
		setAmount(amount - 1);
	};
	useEffect(() => {
		setAmount(isPoductIncart() ? isPoductIncart().amount : 0);
	}, [modalIsOpen]);
	const handleAddToCart = () => {
		const cartCopy = [...cart];
		if (isPoductIncart()) {
			cartCopy.map((el, index) => {
				if (el.product.code === product.code) {
					dispatch(
						updateAmountProductCart({ product, amount, index }),
					);
				}
			});
		} else {
			cartCopy.push({ product, amount });
			dispatch(addProductToCart(cartCopy));
		}
		setShowAlertSumbit(true);
	};
	const disabledButtonStyle = {
		opacity: 0.2,
		cursor: "default",
	};
	useEffect(() => {
		setMsgSwap({
			title: msg,
			icon: error ? "error" : "success",
		});
	}, [msg, error]);
	const showAlert = ({ title, icon }) => {
		swal({
			title: title,
			icon: icon,
			button: "Aceptar",
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(resetResponseMsgsCartStore());
				closeModal();
				setShowAlertSumbit(false);
			}
		});
	};
	const hanldeDeleteProductCart = () => {
		dispatch(deleteProductFromCart(product));
		setShowAlertSumbit(true);
	};
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
					<div className={"cartModal-counterContainer"}>
						<p
							className={"cartModal-symbolsCunter"}
							onClick={amount > 0 ? handleMinusAmount : null}
							style={amount < 1 ? disabledButtonStyle : null}
						>
							-
						</p>
						<p>{amount}</p>
						<p
							className="cartModal-symbolsCunter"
							onClick={handlePlusAmount}
						>
							+
						</p>
						{isPoductIncart() && amount === 0 && (
							<button
								onClick={hanldeDeleteProductCart}
								className="cartModal-btnDeleteToCart"
							>
								Quitar del Carrito
							</button>
						)}
					</div>
					<div className="cartModal-buttonsContainer">
						<button
							style={amount < 1 ? disabledButtonStyle : null}
							onClick={amount > 0 ? handleAddToCart : null}
						>
							{isPoductIncart()
								? "Actualizar Carrito"
								: "Agregar al Carrito"}
						</button>
						<button onClick={closeModal}>Cancelar</button>
					</div>
				</div>
			</Modal>
			{showAlertSumbit && showAlert(msgSwap)}
		</div>
	);
};
export default CartModal;

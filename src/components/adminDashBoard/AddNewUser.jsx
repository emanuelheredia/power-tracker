import React, { useState, useEffect } from "react";
import cryptoJs from "crypto-js";
import config from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "../../redux/actions/user.actions";
const initialUser = {
	email: "",
	password: "",
};
const initialError = {
	thereIsError: false,
	msg: "",
};
const AddNewUser = () => {
	const [userData, setuserData] = useState(initialUser);
	const { users } = useSelector((state) => state);
	const [rePass, setRePass] = useState("");
	const [error, setError] = useState(initialError);
	const [backResponse, setBackResponse] = useState("");
	const { thereIsError } = error;
	const dispatch = useDispatch();
	const handleInputs = (e) => {
		setError(initialError);
		setuserData({ ...userData, [e.target.id]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setBackResponse("");
		setError(initialError);
		if (!userData.email.includes("@") || !userData.email.includes(".c"))
			return setError({
				thereIsError: true,
				msg: "Formato de Email inválido",
			});
		if (userData.password.includes(" "))
			return setError({
				thereIsError: true,
				msg: "La contraseña no debe incluir espacios",
			});
		if (userData.password.length < 6)
			return setError({
				thereIsError: true,
				msg: "La contraseña debe tener más de 5 dígitos",
			});
		if (userData.password.trim() !== rePass.trim())
			return setError({
				thereIsError: true,
				msg: "Las contraseñas no coinciden",
			});
		setError(initialError);
		dispatch(
			addNewUser({ ...userData, password: encriptar(userData.password) }),
		);
	};

	function encriptar(string) {
		const secretKey = config.secretKey;
		return cryptoJs.AES.encrypt(string, secretKey).toString();
	}
	useEffect(() => {
		if (users.error)
			return setError({ thereIsError: true, msg: users.msg });
		if (users.msg.includes("creado")) {
			setError(initialError);
			setBackResponse(users.msg);
			setTimeout(() => {
				setError(initialError);
				setuserData(initialUser);
				setRePass("");
				setBackResponse("");
			}, 2000);
			return;
		}
	}, [users.loading]);
	return (
		<div className="addUser_container">
			<form onSubmit={handleSubmit}>
				<h3>Ingresa los datos del cliente</h3>
				<div className="addUser_emailInputContainer">
					<label htmlFor="email">Email</label>
					<input
						value={userData.email}
						required
						onChange={handleInputs}
						id="email"
					/>
				</div>
				<div className="addUser_passInputContainer">
					<label htmlFor="password">Password</label>
					<input
						value={userData.password}
						required
						onChange={handleInputs}
						id="password"
					/>
				</div>
				<div className="addUser_rePassInputContainer">
					<label htmlFor="re-password">Repita Password</label>
					<input
						required
						onChange={(e) => {
							setRePass(e.target.value);
							setError(initialError);
						}}
						id="re-password"
						value={rePass}
					/>
				</div>
				{thereIsError && (
					<h4 className="addUser_msg error">{error.msg}</h4>
				)}
				{backResponse !== "" && (
					<h4 className="addUser_msg success">{backResponse}</h4>
				)}
				<button>Agregar</button>
			</form>
		</div>
	);
};

export default AddNewUser;

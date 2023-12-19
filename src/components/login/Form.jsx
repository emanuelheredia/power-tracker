import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../spinner/Spinner";

const initialState = {
	userAccess: "",
	password: "",
};
const Form = ({
	handleSubmit,
	register,
	showSpinner,
	setStorageData,
	admin,
}) => {
	const [user, setUser] = useState(
		JSON.parse(
			localStorage.getItem(`${admin ? "adminData" : "userData"}`),
		) || initialState,
	);
	const [checkRememberme, setCheckRememberme] = useState(false);
	const navigate = useNavigate();
	const handleSubmitForm = (e) => {
		e.preventDefault();
		handleSubmit(user);
	};

	const handleChange = (e) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const goToLogin = () => {
		navigate("/login");
	};
	useEffect(() => {
		if (checkRememberme) {
			setStorageData(user);
		} else {
			setStorageData(null);
		}
	}, [checkRememberme]);
	return (
		<form className="form" onSubmit={handleSubmitForm}>
			<div className="form-container">
				<h2 style={{ color: "orange", fontSize: "40px" }}>
					{register
						? "Registro"
						: `${admin ? "Login Admin" : "Login Cliente"}`}
				</h2>
				<div className="form_background"></div>
				<div className="form-campos">
					<label htmlFor="email">{`${
						admin ? "Email" : "Número de cliente"
					}`}</label>
					<input
						name="userAccess"
						type={`${admin ? "email" : "number"}`}
						id="userAccess"
						value={user.userAccess}
						placeholder={`${
							admin
								? "Ingresá tu email"
								: "Ingresá tu número de cliente"
						}`}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-campos">
					<label htmlFor="password">Password</label>
					<input
						required
						id="password"
						name="password"
						type="password"
						value={user.password}
						placeholder={
							register
								? "Ingresá un password"
								: "Ingresá tu password"
						}
						onChange={handleChange}
					/>
				</div>
				<button className="form-boton">
					{register ? "Registrar" : "Loguear"}
				</button>
				{register && (
					<p
						onClick={admin ? goToLogin : null}
						className="form-linkToRegistrer"
					>
						Para loguearte click acá
					</p>
				)}
				<div className="form-spinnerContainer">
					{showSpinner && <Spinner />}
				</div>
				<div
					style={{
						display: "flex",
						gap: "1rem",
						marginTop: "1rem",
						marginBottom: ".5rem",
					}}
				>
					<label htmlFor="rememberme">Recordarme</label>
					<input
						type="checkbox"
						id="rememberme"
						onClick={(e) => setCheckRememberme(e.target.checked)}
					/>
				</div>
			</div>
		</form>
	);
};

export default Form;

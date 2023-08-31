import React, { useEffect, useState } from "react";
import "./form.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../spinner/Spinner";

const initialState = {
	email: "",
	password: "",
};
const Form = ({ handleSubmit, register, showSpinner, setStorageData }) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("userData")) || initialState,
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
				<h2 style={{ color: "orange" }}>
					{register ? "Registro" : "Login"}
				</h2>
				<div className="form_background"></div>
				<div className="form-campos">
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="email"
						id="email"
						value={user.email}
						placeholder="Ingresá tu email"
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
					<p onClick={goToLogin} className="form-linkToRegistrer">
						Para loguearte click acá
					</p>
				)}
				{showSpinner && <Spinner />}
				<div
					style={{
						display: "flex",
						gap: "1rem",
						marginTop: "1rem",
						marginBottom: ".5rem",
					}}
				>
					<label style={{ color: "white" }} htmlFor="rememberme">
						Recordarme
					</label>
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

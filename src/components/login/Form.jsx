import React, { useState } from "react";
import "./form.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../spinner/Spinner";

const initialState = {
	email: "",
	password: "",
};
const Form = ({ handleSubmit, register, showSpinner, setResetPass }) => {
	const [user, setUser] = useState(initialState);
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
			</div>
		</form>
	);
};

export default Form;

import axios from "axios";

const clienteAxios = axios.create({
	baseURL:
		"http://localhost:3001/" || "https://power-track-server.onrender.com",
});

export default clienteAxios;

import axios from "axios";

const clienteAxios = axios.create({
	baseURL: "https://power-track-server.onrender.com",
});

export default clienteAxios;

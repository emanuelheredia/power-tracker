import axios from "axios";

const clienteAxios = axios.create({
	/* 	
	baseURL: "https://power-track-server.onrender.com",
	*/
	baseURL: "http://localhost:3001",
});

export default clienteAxios;

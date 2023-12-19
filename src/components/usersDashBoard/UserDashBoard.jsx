import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductsList from "./ProductsList.jsx";
import LoginUser from "./LoginUser.jsx";
const UserDashBoard = () => {
	const [storageData, setStorageData] = useState(null);
	const { user } = useSelector((state) => state.users);
	const auth = useSelector((state) => state.auth);
	useEffect(() => {
		if (user?.token) {
			if (storageData) {
				localStorage.setItem("userData", JSON.stringify(storageData));
			}
		}
	}, [user]);
	const users = useSelector((state) => state.users);
	return users.user || auth.login ? (
		<ProductsList />
	) : (
		<LoginUser setStorageData={setStorageData} />
	);
};

export default UserDashBoard;

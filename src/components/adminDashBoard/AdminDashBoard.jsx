import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import "./adminDashBoard.css";
import { useDispatch } from "react-redux";
import { estructureTable } from "../../../helps/helpers";
import { uploadOrUpdateProducts } from "../../../helps/redux/actions/products.actions";
const AdminDashBoard = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [dataCleaned, setDataCleaned] = useState([]);
	const handleExcelChange = async (e) => {
		const data = await readXlsxFile(e.target.files[0]);
		setData(data);
	};
	useEffect(() => {
		if (data.length > 0) {
			setDataCleaned(estructureTable(data));
		}
	}, [data]);

	const handleUpload = () => {
		dispatch(
			uploadOrUpdateProducts(dataCleaned, dataCleaned[0]?.proveedor),
		);
	};

	return (
		<div>
			<input type="file" onChange={(e) => handleExcelChange(e)} />
			<button onClick={handleUpload}>Upload</button>
		</div>
	);
};

export default AdminDashBoard;

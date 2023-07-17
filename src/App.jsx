import { useEffect, useState } from "react";
import "./App.css";
import readXlsxFile from "read-excel-file";
import { estructureTable } from "../helps/helpers";
import { useDispatch } from "react-redux";
import { uploadProducts } from "../helps/redux/actions/products.actions";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
function App() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	console.log(state);
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
		console.log(collection(db, "productos"));
	}, [data]);
	const handleUpload = () => {
		console.log("guardando...");
		dispatch(uploadProducts(dataCleaned));
	};
	return (
		<>
			<div>
				<input type="file" onChange={(e) => handleExcelChange(e)} />
				{dataCleaned.length > 0 &&
					dataCleaned.map((el, index) => (
						<div
							key={index}
							style={{ display: "flex", gap: "2rem" }}
						>
							<p>{el.code ? el.code : "sin datos"}</p>
							<p>{el.vehiculo ? el.vehiculo : "sin datos"}</p>
							<p>
								{el.price && !isNaN(el.price)
									? el.price.toFixed(1)
									: "sin datos"}
							</p>
							<p>{el.moreInfo ? el.moreInfo : "sin datos"}</p>
							<p>{el.marca ? el.marca : "sin datos"}</p>
						</div>
					))}
				<button onClick={handleUpload}>Upload</button>
			</div>
		</>
	);
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import readXlsxFile from "read-excel-file";
import { estructureTable } from "../helps/helpers";
function App() {
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
	return (
		<>
			<div>
				<input type="file" onChange={(e) => handleExcelChange(e)} />
				{dataCleaned.length > 0 &&
					dataCleaned.map((el) => (
						<div style={{ display: "flex", gap: "2rem" }}>
							<p>{el[0].code ? el[0].code : "sin datos"}</p>
							<p>
								{el[1].vehiculo ? el[1].vehiculo : "sin datos"}
							</p>
							<p>
								{el[2].price && !isNaN(el[2].price)
									? el[2].price.toFixed(1)
									: "sin datos"}
							</p>
							<p>
								{el[3].moreInfo ? el[3].moreInfo : "sin datos"}
							</p>
							<p>{el[4].marca ? el[4].marca : "sin datos"}</p>
						</div>
					))}
			</div>
		</>
	);
}

export default App;

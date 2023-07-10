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
							<p>{el[0] ? el[0] : "sin datos"}</p>
							<p>{el[1] ? el[1] : "sin datos"}</p>
							<p>
								{el[2] && !isNaN(el[2])
									? el[2].toFixed(1)
									: "sin datos"}
							</p>
							<p>{el[3] ? el[3] : "sin datos"}</p>
							<p>{el[4] ? el[4] : "sin datos"}</p>
						</div>
					))}
			</div>
		</>
	);
}

export default App;

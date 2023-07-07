import { useEffect, useState } from "react";
import "./App.css";
import readXlsxFile from "read-excel-file";

const tableHeaders = [
	"CODIGO",
	"PRECIO IVA INCLUIDO",
	"CAMIONETA / COLOR",
	"PRECIO",
	"Nueva Etiqueta",
];

function App() {
	const [data, setData] = useState([]);
	const [dataCleaned, setDataCleaned] = useState([]);
	const handleExcelChange = async (e) => {
		const data = await readXlsxFile(e.target.files[0]);
		setData(data);
	};
	useEffect(() => {
		if (data.length > 0) {
			setDataCleaned(data.filter((el) => !isNull(el)));
		}
	}, [data]);
	console.log(dataCleaned);
	const isNull = (row) => {
		let nullElemnt = 0;
		let isTableHeader = false;
		for (let el of row) {
			if (el === null) {
				nullElemnt += 1;
			}
			if (tableHeaders.includes(el)) {
				isTableHeader = true;
			}
		}
		if (
			nullElemnt === row.length ||
			nullElemnt === row.length - 1 ||
			isTableHeader
		) {
			return true;
		}
		return false;
	};
	const getStructuredRow = (row) => {
		let columnIndexCode = null;
		let columnIndexVehiculo = null;
		let columnIndexPrice = null;
		let columnIndexMoreInfo = null;
		let columnIndexMark = null;
	};
	return (
		<>
			<div>
				<input type="file" onChange={(e) => handleExcelChange(e)} />
			</div>
		</>
	);
}

export default App;

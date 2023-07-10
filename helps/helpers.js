import { getStructureFarad } from "./faradHelper";

const tableHeaders = [
	"CODIGO",
	"PRECIO IVA INCLUIDO",
	"CAMIONETA / COLOR",
	"PRECIO",
	"Nueva Etiqueta",
];
const codigoHeaders = ["codigo", "nueva etiqueta"];
const vehiculoHeaders = [
	"camioneta",
	"vehiculo",
	"auto modelo",
	"modelo",
	"accesorio",
	"accesorio",
];
const finalPriceHeaders = [
	"precio iva incl.",
	"precio iva incluido",
	"con iva",
	"precio c/ iva",
];
const moreInfoHeaders = ["filas", "color", "descripcion"];
const markHeaders = ["marca", "camioneta / color"];
let headerStructure = [];
export const estructureTable = (table) => {
	let firstClean;
	if (table[1][0]?.includes("FARAD")) {
		firstClean = getStructureFarad(table);
	} else {
		firstClean = table.filter((el) => !isNull(el));
	}

	const headerIndexs = getStructuredRow(headerStructure);
	const tableStructured = firstClean.map((row) =>
		orderColumn(row, headerIndexs),
	);
	return tableStructured;
};
const isNull = (row) => {
	let nullElemnt = 0;
	let isTableHeader = false;
	if (
		(row.includes("CODIGO") || row.includes("Nueva Etiqueta")) &&
		headerStructure.length === 0
	) {
		headerStructure = row;
	}
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
		nullElemnt === row.length - 2 ||
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
	let counter = 0;
	for (let col of row) {
		if (col && codigoHeaders.includes(col.toLowerCase())) {
			columnIndexCode = counter;
		} else if (col && vehiculoHeaders.includes(col.toLowerCase())) {
			columnIndexVehiculo = counter;
		} else if (col && finalPriceHeaders.includes(col.toLowerCase())) {
			columnIndexPrice = counter;
		} else if (col && moreInfoHeaders.includes(col.toLowerCase())) {
			columnIndexMoreInfo = counter;
		} else if (col && markHeaders.includes(col.toLowerCase())) {
			columnIndexMark = counter;
		}
		counter += 1;
	}
	return [
		columnIndexCode,
		columnIndexVehiculo,
		columnIndexPrice,
		columnIndexMoreInfo,
		columnIndexMark,
	];
};
const orderColumn = (row, headerIndexs) => {
	return [
		row[headerIndexs[0] ? headerIndexs[0] : 0],
		row[headerIndexs[1] ? headerIndexs[1] : 0],
		row[headerIndexs[2] ? headerIndexs[2] : 0],
		row[headerIndexs[3] ? headerIndexs[3] : 0],
		row[headerIndexs[4] ? headerIndexs[4] : 0],
	];
};

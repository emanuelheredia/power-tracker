import { getStructureFarad } from "./faradHelper";
import { guiaMarcas, headersColumProveedores } from "./guide";

const wordsFromHeaders = [
	"CODIGO",
	"PRECIO",
	"CAMIONETA / COLOR",
	"PRECIO",
	"Nueva Etiqueta",
	"MAYORISTAS",
];
export const estructureTable = (table) => {
	let firstClean = [];
	const proveedor = table[1][0]?.split(" ")[0] || "ZT";
	const proveedorRealName = guiaMarcas[proveedor];
	if (proveedorRealName === "FARAD") {
		firstClean = getStructureFarad(table);
		return firstClean;
	} else {
		firstClean = table.filter((el) => !isNull(el));
		let headerIndexs = headersColumProveedores[proveedor];
		const tableStructured = firstClean.map((row) =>
			orderColumn(row, headerIndexs, proveedorRealName),
		);
		return tableStructured;
	}
};
export const isNull = (row) => {
	let nullElemnt = 0;
	let isTableHeader = false;
	for (let el of row) {
		if (el === null) {
			nullElemnt += 1;
		}
		if (wordsFromHeaders.includes(el)) {
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

const orderColumn = (row, headerIndexs, proveedor) => {
	return {
		code:
			row[headerIndexs.codigoColum ? headerIndexs.codigoColum : 0] ||
			"sin datos",
		vehiculo:
			row[headerIndexs.vehiculoColum ? headerIndexs.vehiculoColum : 0] ||
			"sin datos",
		price:
			row[headerIndexs.precioColum ? headerIndexs.precioColum : 0] ||
			"sin datos",
		moreInfo:
			row[headerIndexs.masInfoColum ? headerIndexs.masInfoColum : 0] ||
			"sin datos",
		mark:
			row[headerIndexs.marcaColum ? headerIndexs.marcaColum : 0] ||
			"sin datos",
		proveedor: proveedor,
	};
};

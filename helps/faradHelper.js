import { isNull } from "./helpers";

const structuredTable = [
	[
		{ code: "A1C/M" },
		{ vehiculo: " TORO" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "FIAT" },
	],
	[
		{ code: "A2C/M" },
		{ vehiculo: "PALIO, SIENA, IDEA, PUNTO, ARGO," },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "FIAT" },
	],
	[
		{ code: "BE8/M" },
		{
			vehiculo:
				"AIRCROSS, C4 LOUNGE, BERLINGO, 206/207/208, 408, 308, 3008",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "CITROEN - PEUGEOT" },
	],
	[
		{ code: "DLF2/M" },
		{ vehiculo: "JOURNEY" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "DODGE" },
	],
	[
		{ code: "H/M" },
		{
			vehiculo:
				"ECOSPORT,FIESTA,FOCUS,MONDEO, S1{price:0},TRAILBLAZER,ONIX,PRISMA",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "FORD - CHEVROLET" },
	],
	[
		{ code: "I/M" },
		{
			vehiculo:
				"GRAND SANTA FE AGILE, CORSA, ASTRA, MERIVA, VECTRA CLIO, KANGOO, SYMBOL, SANDERO",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "HYUNDAI CHEVROLET RENAULT" },
	],
	[
		{ code: "R1/M" },
		{ vehiculo: "FRONTIER 200{price:0},{moreInfo: " },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "NISSAN" },
	],
	[
		{ code: "ZA/M" },
		{
			vehiculo:
				"VENTO,BORA,GOLF,TIGUAN,PASAT,FOX,POLO, A1,A3,A5, FORD TERRITORY",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "VOLSKWAGEN 5T - AUDI" },
	],
	[
		{ code: "482/M" },
		{ vehiculo: "HILUX,COROLLA,ETIOS,YARIS,SW4,RAV4" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "TOYOTA" },
	],
	[
		{ code: "AC1C/M" },
		{ vehiculo: "TODOS" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "HONDA" },
	],
	[
		{ code: "HA4/M" },
		{ vehiculo: "F-150 RAPTOR / LARIAT, MAVERICK" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "FORD" },
	],
	[
		{ code: "A2C/E" },
		{
			vehiculo:
				"PALIO, SIENA, IDEA, PUNTO, ARGO, STRADA, DOBLO, UNO NUEVO",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "FIAT" },
	],
	[
		{ code: "BE8/E" },
		{
			vehiculo:
				"AIRCROSS, C4 LOUNGE, BERLINGO, 206/207/208, 408, 308, 3008",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "CITROEN - PEUGEOT" },
	],
	[
		{ code: "HA/E" },
		{
			vehiculo:
				"ECOSPORT, FIESTA, FOCUS, MONDEO, S1{price:0}, TRAILBLAZER, ONIX, PRISMA, GRAND SANTA FE",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "FORD - CHEVROLET - HYUNDAI" },
	],
	[
		{ code: "I3/E" },
		{
			vehiculo:
				"AGILE, CORSA, ASTRA, MERIVA, VECTRA,  CLIO, KANGOO, SYMBOL, SANDERO",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "CHEVROLET -  RENAULT" },
	],
	[
		{ code: "L2/E" },
		{ vehiculo: "GOL G4/G5, SAVEIRO, UP, VOYAGE, TIGGO 5 " },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "VOLSKWAGEN" },
	],
	[
		{ code: "PP14/E" },
		{ vehiculo: "AMAROK, TOUAREG, SPRINTER, Q7" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "VOLSKWAGEN/AUDI" },
	],
	[
		{ code: "ZA/E" },
		{
			vehiculo:
				"VENTO,BORA,GOLF,TIGUAN,PASAT,FOX,POLO,  A1,A3,A5 , FORD TERRITORY  ",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "VOLSKWAGEN 5T - AUDI" },
	],
	[
		{ code: "482/E" },
		{ vehiculo: "HILUX,COROLLA,ETIOS,PRIUS,YARIS,SW4,RAV4" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "TOYOTA (Aleación)" },
	],
	[
		{ code: "AC1/E" },
		{ vehiculo: "TODOS" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "HONDA" },
	],
	[
		{ code: "BV2/D" },
		{ vehiculo: "RENEGADE / PARTNER CHAPA" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "JEEP" },
	],
	[
		{ code: "B02/D" },
		{
			vehiculo:
				"PALIO, SIENA, IDEA, PUNTO, ARGO, STRADA, DOBLO, UNO NUEVO",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "FIAT" },
	],
	[
		{ code: "BE8/D" },
		{
			vehiculo:
				"AIRCROSS, C4 LOUNGE, BERLINGO, 206/207/208, 408, 308, 3008",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "CITROEN - PEUGEOT" },
	],
	[
		{ code: "D2/D" },
		{
			vehiculo:
				"ECOSPORT,FIESTA,FOCUS,MONDEO, S1{price:0},TRAILBLAZER,ONIX, PRISMA, GRAND SANTA FE",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "FORD - CHEVROLET - HYUNDAI" },
	],
	[
		{ code: "B12/D" },
		{
			vehiculo:
				"AGILE, CORSA, ASTRA, MERIVA, VECTRA,  CLIO, KANGOO, SYMBOL, SANDERO",
		},
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "CHEVROLET - RENAULT" },
	],
	[
		{ code: "BR37/D" },
		{ vehiculo: "GOL G4/G5, SAVEIRO, UP, VOYAGE " },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "VOLSKWAGEN" },
	],
	[
		{ code: "D14/D" },
		{ vehiculo: "FRONTIER 200{price:0},{moreInfo: " },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "NISSAN" },
	],
	[
		{ code: "B54/D" },
		{ vehiculo: "VENTO,BORA,GOLF,TIGUAN,PASAT,FOX,POLO ,  A1,A3,A5" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "VOLSKWAGEN 5T - AUDI" },
	],
	[
		{ code: "D4/D" },
		{ vehiculo: "HILUX,COROLLA,ETIOS,PRIUS,YARIS,SW4,RAV4" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "TOYOTA (Chapa)" },
	],
	[
		{ code: "D22/D" },
		{ vehiculo: "TODOS" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "HONDA" },
	],
	[
		90732,
		{ vehiculo: "PORTA BICICLETA FARAD" },
		{ price: 0 },
		{ moreInfo: "sin datos" },
		{ marca: "sin datos" },
	],
];

export const getStructureFarad = (table) => {
	let firstClean = table.filter((el) => !isNull(el));
	let seconClean = structuredTable.map((el) => {
		for (let row of firstClean) {
			if (row[0] === el[0].code) {
				let uploadItem = el;
				uploadItem[2].price = row[3];
				return uploadItem;
			}
		}
	});
	console.log(seconClean.filter((el) => el !== undefined));
	return seconClean.filter((el) => el !== undefined);
};

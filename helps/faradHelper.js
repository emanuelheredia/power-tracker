import { isNull } from "./helpers";

const structuredTable = [
	["A1C/M", "500, TORO", 0, "sin datos", "FIAT"],
	["A2C/M", "PALIO, SIENA, IDEA, PUNTO, ARGO,", 0, "sin datos", "FIAT"],
	[
		"BE8/M",
		"AIRCROSS, C4 LOUNGE, BERLINGO, 206/207/208, 408, 308, 3008",
		0,
		"sin datos",
		"CITROEN - PEUGEOT",
	],
	["DLF2/M", "JOURNEY", 0, "sin datos", "DODGE"],
	[
		"H/M",
		"ECOSPORT,FIESTA,FOCUS,MONDEO, S10,TRAILBLAZER,ONIX,PRISMA",
		0,
		"sin datos",
		"FORD - CHEVROLET",
	],
	[
		"I/M",
		"GRAND SANTA FE AGILE, CORSA, ASTRA, MERIVA, VECTRA CLIO, KANGOO, SYMBOL, SANDERO",
		0,
		"sin datos",
		"HYUNDAI CHEVROLET RENAULT",
	],
	["R1/M", "FRONTIER 2000, ", 0, "sin datos", "NISSAN"],
	[
		"ZA/M",
		"VENTO,BORA,GOLF,TIGUAN,PASAT,FOX,POLO, A1,A3,A5, FORD TERRITORY",
		0,
		"sin datos",
		"VOLSKWAGEN 5T - AUDI",
	],
	["482/M", "HILUX,COROLLA,ETIOS,YARIS,SW4,RAV4", 0, "sin datos", "TOYOTA"],
	["AC1C/M", "TODOS", 0, "sin datos", "HONDA"],
	["HA4/M", "F-150 RAPTOR / LARIAT, MAVERICK", 0, "sin datos", "FORD"],
	[
		"A2C/E",
		"PALIO, SIENA, IDEA, PUNTO, ARGO, STRADA, DOBLO, UNO NUEVO",
		0,
		"sin datos",
		"FIAT",
	],
	[
		"BE8/E",
		"AIRCROSS, C4 LOUNGE, BERLINGO, 206/207/208, 408, 308, 3008",
		0,
		"sin datos",
		"CITROEN - PEUGEOT",
	],
	[
		"HA/E",
		"ECOSPORT, FIESTA, FOCUS, MONDEO, S10, TRAILBLAZER, ONIX, PRISMA, GRAND SANTA FE",
		0,
		"sin datos",
		"FORD - CHEVROLET - HYUNDAI",
	],
	[
		"I3/E",
		"AGILE, CORSA, ASTRA, MERIVA, VECTRA,  CLIO, KANGOO, SYMBOL, SANDERO",
		0,
		"sin datos",
		"CHEVROLET -  RENAULT",
	],
	[
		"L2/E",
		"GOL G4/G5, SAVEIRO, UP, VOYAGE, TIGGO 5 ",
		0,
		"sin datos",
		"VOLSKWAGEN",
	],
	[
		"PP14/E",
		"AMAROK, TOUAREG, SPRINTER, Q7",
		0,
		"sin datos",
		"VOLSKWAGEN/AUDI",
	],
	[
		"ZA/E",
		"VENTO,BORA,GOLF,TIGUAN,PASAT,FOX,POLO,  A1,A3,A5 , FORD TERRITORY  ",
		0,
		"sin datos",
		"VOLSKWAGEN 5T - AUDI",
	],
	[
		"482/E",
		"HILUX,COROLLA,ETIOS,PRIUS,YARIS,SW4,RAV4",
		0,
		"sin datos",
		"TOYOTA (Aleación)",
	],
	["AC1/E", "TODOS", 0, "sin datos", "HONDA"],
	["BV2/D", "RENEGADE / PARTNER CHAPA", 0, "sin datos", "JEEP"],
	[
		"B02/D",
		"PALIO, SIENA, IDEA, PUNTO, ARGO, STRADA, DOBLO, UNO NUEVO",
		0,
		"sin datos",
		"FIAT",
	],
	[
		"BE8/D",
		"AIRCROSS, C4 LOUNGE, BERLINGO, 206/207/208, 408, 308, 3008",
		0,
		"sin datos",
		"CITROEN - PEUGEOT",
	],
	[
		"D2/D",
		"ECOSPORT,FIESTA,FOCUS,MONDEO, S10,TRAILBLAZER,ONIX, PRISMA, GRAND SANTA FE",
		0,
		"sin datos",
		"FORD - CHEVROLET - HYUNDAI",
	],
	[
		"B12/D",
		"AGILE, CORSA, ASTRA, MERIVA, VECTRA,  CLIO, KANGOO, SYMBOL, SANDERO",
		0,
		"sin datos",
		"CHEVROLET - RENAULT",
	],
	["BR37/D", "GOL G4/G5, SAVEIRO, UP, VOYAGE ", 0, "sin datos", "VOLSKWAGEN"],
	["D14/D", "FRONTIER 2000, ", 0, "sin datos", "NISSAN"],
	[
		"B54/D",
		"VENTO,BORA,GOLF,TIGUAN,PASAT,FOX,POLO ,  A1,A3,A5",
		0,
		"sin datos",
		"VOLSKWAGEN 5T - AUDI",
	],
	[
		"D4/D",
		"HILUX,COROLLA,ETIOS,PRIUS,YARIS,SW4,RAV4",
		0,
		"sin datos",
		"TOYOTA (Chapa)",
	],
	["D22/D", "TODOS", 0, "sin datos", "HONDA"],
	[90732, "PORTA BICICLETA FARAD", 0, "sin datos", "sin datos"],
];

export const getStructureFarad = (table) => {
	let firstClean = table.filter((el) => !isNull(el));
	let seconClean = structuredTable.map((el) => {
		for (let row of firstClean) {
			if (row[0] === el[0]) {
				let uploadItem = el;
				uploadItem[2] = row[3];
				return uploadItem;
			}
		}
	});
	console.log(seconClean.filter((el) => el !== undefined));
	return seconClean.filter((el) => el !== undefined);
};

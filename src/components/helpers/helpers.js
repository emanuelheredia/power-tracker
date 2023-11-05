export const structuringSelectValues = (
	array,
	agregarLabelDefault,
	labelDefault,
	valueDefault,
) => {
	let orderArray = [...array];
	let allValuesStructured = orderArray.sort().map((el) => {
		return { label: el.toUpperCase(), value: el };
	});
	if (agregarLabelDefault)
		allValuesStructured.unshift({
			label: labelDefault || " -- SIN SELECCION -- ",
			value: valueDefault || "",
		});
	return allValuesStructured;
};
export const formatingPrice = (precio, proveedor) => {
	if (proveedor == "ZIEL TECHNOLOGY") {
		let indexOfPoint = precio.toString().indexOf(".");
		if (indexOfPoint == -1) {
			let firstClean = formatingTotalPrice(precio.toString());
			return firstClean;
		}
		let firstClean = precio.toString().slice(0, indexOfPoint + 4);
		return firstClean;
	}
	let firstClean = precio.toFixed(0).replace(".", ",");
	let cantidadDigitos = firstClean.split("").length;
	let indexToAddPoint1 = cantidadDigitos - 3;
	let indexToAddPoint2 = cantidadDigitos - 6;
	let priceAsArray = firstClean.split("");
	priceAsArray.splice(indexToAddPoint1, 0, ".");
	if (indexToAddPoint2 > 0) {
		priceAsArray.splice(indexToAddPoint2, 0, ".");
	}
	return priceAsArray.join("");
};
export const formatingTotalPrice = (number) => {
	let cantidadDigitos = number.split("").length;
	let indexToAddPoint1 = cantidadDigitos - 3;
	let indexToAddPoint2 = cantidadDigitos - 6;
	let indexToAddPoint3 = cantidadDigitos - 9;
	let priceAsArray = number.split("");
	priceAsArray.splice(indexToAddPoint1, 0, ".");
	if (indexToAddPoint2 > 0) {
		priceAsArray.splice(indexToAddPoint2, 0, ".");
	}
	if (indexToAddPoint3 > 0) {
		priceAsArray.splice(indexToAddPoint3, 0, ".");
	}
	return priceAsArray.join("");
};

export const structuringSelectValues = (array) => {
	let orderArray = [...array];
	let allValuesStructured = orderArray.sort().map((el) => {
		return { label: el.toUpperCase(), value: el };
	});
	allValuesStructured.unshift({
		label: " -- SIN SELECCION -- ",
		value: "",
	});
	return allValuesStructured;
};

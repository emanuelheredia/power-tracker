export const structuringSelectValues = (array) => {
	let allValuesStructured = array.map((el) => {
		return { label: el, value: el };
	});
	allValuesStructured.unshift({
		label: " -- SIN SELECCION -- ",
		value: "",
	});
	return allValuesStructured;
};

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

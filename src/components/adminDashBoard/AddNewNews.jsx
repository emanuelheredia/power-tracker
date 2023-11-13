import React from "react";

const initialNewsInfo = {
	code: "",
	category: "",
	subCategory: "",
	color: "",
	proveedor: "",
	moreInfo: "",
	mark: "",
	vehiculo: "",
	images: [],
	price: 0,
};
const AddNewNews = () => {
	const products = useSelector((state) => state.products);
	const [productInfo, setProductInfo] = useState(initialProductInfo);
	const dispatch = useDispatch();
	useEffect(() => {
		if (products.valuesFilter.category.length === 0)
			dispatch(getValuesAttributeSelects("category"));
		if (products.valuesFilter.mark.length === 0)
			dispatch(getValuesAttributeSelects("mark"));
		if (products.valuesFilter.proveedor.length === 0)
			dispatch(getValuesAttributeSelects("proveedor"));
		if (products.valuesFilter.subCategory.length === 0)
			dispatch(getValuesAttributeSelects("subCategory"));
		if (products.valuesFilter.color.length < 6)
			dispatch(getValuesAttributeSelects("color"));
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addNewProduct(productInfo));
	};

	return <div>AddNewNews</div>;
};

export default AddNewNews;

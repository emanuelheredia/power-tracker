import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../redux/actions/news.actions";
import CardNews from "./CardNews";

const News = () => {
	const dispatch = useDispatch();
	const { news } = useSelector((state) => state.news);
	useEffect(() => {
		dispatch(getAllNews());
	}, []);
	return (
		<div className="news-container">
			{news.length === 0 ? (
				<h2>Sin novedades por el momento</h2>
			) : (
				<h2>Nuevos Ingresos</h2>
			)}
			{news.map((el, index) => (
				<CardNews key={index} product={el} />
			))}
		</div>
	);
};

export default News;

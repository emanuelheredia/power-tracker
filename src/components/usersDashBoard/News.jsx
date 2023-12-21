import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../redux/actions/news.actions";
import CardNews from "./CardNews";
import AddNewNewsModal from "./AddNewNewsModal";

const News = () => {
	const dispatch = useDispatch();
	const { news } = useSelector((state) => state.news);
	const { auth } = useSelector((state) => state);
	const [showModal, setShowModal] = useState(false);
	console.log(auth);
	useEffect(() => {
		dispatch(getAllNews());
	}, []);
	return (
		<div className="news-container">
			{auth.login && (
				<button
					className="news_addNewsBtn"
					onClick={() => setShowModal(true)}
				>
					+
				</button>
			)}
			{news.length === 0 ? (
				<h2>Sin novedades por el momento</h2>
			) : (
				<h2>Nuevos Ingresos</h2>
			)}
			{news.map((el, index) => (
				<CardNews key={index} product={el} />
			))}
			<AddNewNewsModal open={showModal} setShowModal={setShowModal} />
		</div>
	);
};

export default News;

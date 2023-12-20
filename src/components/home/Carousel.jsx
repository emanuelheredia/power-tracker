import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Carousel = ({ children, amountShowElem }) => {
	const [showedChildren, setShowedChildren] = useState(
		children.slice(0, amountShowElem.xs),
	);
	const [width, setWidth] = useState(window.screen.width);
	const ammountChildren = children.length;
	const [elToShow, setElToShow] = useState(
		width < 780
			? amountShowElem.xs
			: width >= 780 && width < 1290
			? amountShowElem.md
			: width >= 1290 && width < 1700
			? amountShowElem.lg
			: amountShowElem.xl,
	);
	const [showLimited, setShowLimited] = useState(elToShow);
	const rest = elToShow - (ammountChildren % elToShow);
	useEffect(() => {
		const handleResize = (e) => {
			setWidth(e.currentTarget.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	useEffect(() => {
		if (width < 780) setElToShow(amountShowElem.xs);
		else if (width >= 780 && width < 1290) setElToShow(amountShowElem.md);
		else if (width >= 1290 && width < 1700) setElToShow(amountShowElem.lg);
		else setElToShow(amountShowElem.xl);
	}, [width]);
	useEffect(() => {
		if (!(showLimited < elToShow))
			setShowedChildren(
				children.slice(showLimited - elToShow, showLimited),
			);
	}, [showLimited, elToShow]);
	const handleNext = () => {
		if (showLimited >= ammountChildren) setShowLimited(elToShow);
		else setShowLimited(showLimited + elToShow);
	};
	const handlePrev = () => {
		if (showLimited <= elToShow) setShowLimited(ammountChildren + rest);
		else setShowLimited(showLimited - elToShow);
	};
	return (
		<div className="carousel_container">
			<FaArrowAltCircleLeft
				onClick={handlePrev}
				className="carousel_leftArrow"
			/>
			{showedChildren.map((elem) => elem)}
			<FaArrowAltCircleRight
				onClick={handleNext}
				className="carousel_rigthArrow"
			/>
		</div>
	);
};

export default Carousel;

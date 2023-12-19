import React, { useState, useEffect } from "react";

const useVisibility = ({ ref, marginTop }) => {
	const [isVisible, setIsVisible] = useState(false);
	const callBackFunction = (entries) => {
		const [entry] = entries;
		setIsVisible(entry.isIntersecting);
	};
	const options = {
		root: null,
		rootMargin: marginTop,
		threshold: 1.0,
	};
	useEffect(() => {
		const observer = new IntersectionObserver(callBackFunction, options);
		if (ref.current) observer.observe(ref.current);
		return () => {
			if (ref.current) observer.unobserve(ref.current);
		};
	}, [ref, options]);

	return { isVisible };
};

export default useVisibility;

import React, { useState, useEffect } from 'react';
import ImageCarouselPSC from '@components/ImageCarouselPSC';

const images = [
	'/portafolio/1.jpg',
	'/portafolio/2.jpg',
	'/portafolio/3.jpg',
	'/portafolio/4.jpg',
	'/portafolio/5.jpg',
	'/portafolio/6.jpg',
	'/portafolio/7.jpg',
	'/portafolio/8.jpg',
	'/portafolio/9.jpg',
	'/portafolio/10.jpg',
	'/portafolio/11.jpg',
	'/portafolio/12.jpg',
	'/portafolio/13.jpg'
];

const ImageCarousel = () => {
	const [slide, setSlide] = useState(0);

	useEffect(() => {
		const handleClick = (e) => {
			const slideIndex = parseInt(e.target.getAttribute('data-slide'), 10);
			if (!isNaN(slideIndex)) setSlide(slideIndex);
		};

		const buttons = document.querySelectorAll('[data-slide]');
		buttons.forEach((btn) => btn.addEventListener('click', handleClick));

		return () => {
			buttons.forEach((btn) => btn.removeEventListener('click', handleClick));
		};
	}, []);

	return <ImageCarouselPSC images={images} autoSlide={true} slide={slide} />;
};

export default ImageCarousel;

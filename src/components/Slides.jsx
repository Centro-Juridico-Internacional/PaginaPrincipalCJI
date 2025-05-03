import React, { useState, useEffect } from 'react';
import ImageCarouselPSC from '@components/ImageCarouselPSC';

const images = [
	'/portafolio/1_.jpg',
	'/portafolio/2_.jpg',
	'/portafolio/3_.jpg',
	'/portafolio/4_.jpg',
	'/portafolio/5_.jpg',
	'/portafolio/6_.jpg',
	'/portafolio/7_.jpg',
	'/portafolio/8_.jpg',
	'/portafolio/9_.jpg',
	'/portafolio/10_.jpg',
	'/portafolio/11_.jpg',
	'/portafolio/12_.jpg',
	'/portafolio/13_.jpg',
	'/portafolio/14_.jpg'
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

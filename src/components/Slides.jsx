// Slides.jsx
import React, { useState, useEffect, useRef } from 'react';
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
	const [resetTrigger, setResetTrigger] = useState(0);

	useEffect(() => {
		const handleCustomSlideChange = (e) => {
			if (typeof e.detail === 'number') {
				setSlide(e.detail);
				setResetTrigger((prev) => prev + 1); // cambia valor para forzar reset
			}
		};

		document.addEventListener('slide-change', handleCustomSlideChange);
		return () => {
			document.removeEventListener('slide-change', handleCustomSlideChange);
		};
	}, []);

	return (
		<ImageCarouselPSC images={images} autoSlide={true} slide={slide} resetTrigger={resetTrigger} />
	);
};

export default ImageCarousel;

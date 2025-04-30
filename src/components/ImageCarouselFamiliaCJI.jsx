import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, autoSlide = true, autoSlideInterval = 5000 }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef(null);
	const touchStartX = useRef(null);
	const touchEndX = useRef(null);

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	// Auto Slide
	useEffect(() => {
		if (!autoSlide) return;
		const interval = setInterval(nextSlide, autoSlideInterval);
		return () => clearInterval(interval);
	}, [images.length, autoSlide, autoSlideInterval]);

	// Touch handling
	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchMove = (e) => {
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		if (!touchStartX.current || !touchEndX.current) return;
		const diff = touchStartX.current - touchEndX.current;
		if (diff > 50)
			nextSlide(); // swipe left
		else if (diff < -50) prevSlide(); // swipe right
		touchStartX.current = null;
		touchEndX.current = null;
	};

	return (
		<div className="relative w-[95%] max-w-4xl overflow-hidden rounded-lg shadow-lg">
			{/* Carrusel */}
			<div
				ref={carouselRef}
				className="flex h-[75vh] w-full transition-transform duration-500 ease-in-out"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{images.map((img, index) => (
					<img
						key={index}
						src={img}
						alt={`Slide ${index}`}
						className="w-full flex-shrink-0 object-contain"
					/>
				))}
			</div>

			{/* Botón Izquierdo */}
			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white transition hover:bg-gray-800"
			>
				<ChevronLeft size={24} />
			</button>

			{/* Botón Derecho */}
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white transition hover:bg-gray-800"
			>
				<ChevronRight size={24} />
			</button>

			{/* Indicadores */}
			<div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-2">
				{images.map((_, index) => (
					<span
						key={index}
						className={`block h-2.5 w-2.5 rounded-full transition ${
							index === currentIndex ? 'bg-white' : 'bg-gray-500'
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default ImageCarousel;

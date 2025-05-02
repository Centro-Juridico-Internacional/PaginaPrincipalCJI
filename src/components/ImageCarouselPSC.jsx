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
		if (diff > 50) nextSlide();
		else if (diff < -50) prevSlide();
		touchStartX.current = null;
		touchEndX.current = null;
	};

	return (
		<div className="relative w-fit max-w-2xl rounded-lg">
			{/* Carrusel */}
			<div
				id="carruselContainer"
				ref={carouselRef}
				className="flex w-fit transition-transform duration-500 ease-in-out md:h-[35vw]"
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
						id={`slide${index}`}
						className="w-full flex-shrink-0 rounded-2xl object-contain"
					/>
				))}
			</div>

			{/* Botón Izquierdo */}
			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white transition hover:bg-gray-800"
			>
				<ChevronLeft size={24} />
			</button>

			{/* Botón Derecho */}
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white transition hover:bg-gray-800"
			>
				<ChevronRight size={24} />
			</button>

			{/* Indicadores */}
			<div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
				{images.map((_, index) => (
					<span
						key={index}
						className={`block h-2.5 w-2.5 rounded-full transition ${
							index === currentIndex ? 'bg-white/40' : 'bg-gray-500/40'
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default ImageCarousel;

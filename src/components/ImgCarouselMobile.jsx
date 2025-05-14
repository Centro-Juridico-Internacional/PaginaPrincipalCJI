import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarouselPSC = ({
	images,
	autoSlide = true,
	autoSlideInterval = 5000,
	slide = 0,
	resetTrigger
}) => {
	const [currentIndex, setCurrentIndex] = useState(slide);
	const autoSlideRef = useRef(null);
	const touchStartX = useRef(null);
	const touchEndX = useRef(null);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	}, [images.length]);

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
		resetAutoSlide();
	};

	const goToSlide = (index) => {
		setCurrentIndex(index);
		resetAutoSlide();
	};

	const resetAutoSlide = useCallback(() => {
		if (autoSlideRef.current) clearInterval(autoSlideRef.current);
		if (autoSlide) {
			autoSlideRef.current = setInterval(() => {
				nextSlide();
			}, autoSlideInterval);
		}
	}, [autoSlide, autoSlideInterval, nextSlide]);

	useEffect(() => {
		resetAutoSlide();
		return () => clearInterval(autoSlideRef.current);
	}, [resetAutoSlide]);

	useEffect(() => {
		setCurrentIndex(slide);
	}, [slide]);

	useEffect(() => {
		resetAutoSlide(); // reset cuando cambia resetTrigger
	}, [resetTrigger]);

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
		resetAutoSlide();
	};

	return (
		<div className="relative w-full max-w-2xl rounded-lg md:hidden">
			<div
				id="carruselContainer"
				className="flex h-96 w-full transition-transform duration-500 ease-in-out md:w-[35vw]"
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
						className="w-full flex-shrink-0 rounded-2xl object-contain"
					/>
				))}
			</div>

			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white transition hover:bg-gray-800"
			>
				<ChevronLeft size={24} />
			</button>

			<button
				onClick={() => {
					nextSlide();
					resetAutoSlide();
				}}
				className="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white transition hover:bg-gray-800"
			>
				<ChevronRight size={24} />
			</button>

			<div className="absolute -bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`block h-2.5 w-2.5 rounded-full transition ${
							index === currentIndex ? 'bg-green-600/90' : 'bg-gray-500/80'
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default ImageCarouselPSC;

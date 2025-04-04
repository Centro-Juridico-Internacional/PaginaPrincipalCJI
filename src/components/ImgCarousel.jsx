import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, autoSlideInterval = 50 }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef(null);
	const intervalRef = useRef(null);

	// Función para navegar con botones
	const scrollToIndex = (index) => {
		setCurrentIndex(index);
		carouselRef.current.scrollTo({
			left: index * carouselRef.current.offsetWidth,
			behavior: 'smooth'
		});
	};

	const prevSlide = () => scrollToIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
	const nextSlide = () => scrollToIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);

	// Auto-slide cada X segundos
	useEffect(() => {
		const startAutoSlide = () => {
			intervalRef.current = setInterval(() => {
				nextSlide();
			}, autoSlideInterval);
		};

		startAutoSlide();

		return () => clearInterval(intervalRef.current); // Limpiar al desmontar
	}, [currentIndex, autoSlideInterval]);

	// Detectar scroll manual y pausar auto-slide
	const handleScroll = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		setTimeout(() => {
			if (!intervalRef.current) {
				intervalRef.current = setInterval(() => {
					nextSlide();
				}, autoSlideInterval);
			}
		}, 3000); // Esperar 3s después del scroll manual antes de reanudar
	};

	return (
		<div className="relative w-full overflow-hidden">
			{/* Contenedor del carrusel */}
			<div
				ref={carouselRef}
				onScroll={handleScroll}
				className="scrollbar-hide flex w-full snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth"
			>
				{images.map((img, index) => (
					<div
						key={index}
						className="xs:w-[20%] w-[40$] flex-shrink-0 snap-center lg:w-[20%] xl:w-[17%]"
					>
						<img
							src={img}
							alt={`Slide ${index}`}
							className="h-full w-full rounded-lg object-cover"
						/>
					</div>
				))}
			</div>

			{/* Botón Izquierdo */}
			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white"
			>
				<ChevronLeft size={24} />
			</button>

			{/* Botón Derecho */}
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-gray-800/50 p-2 text-white"
			>
				<ChevronRight size={24} />
			</button>
		</div>
	);
};

export default ImageCarousel;

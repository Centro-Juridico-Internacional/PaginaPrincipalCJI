import { useState, useEffect } from 'react';

const ScrollButton = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			// Mostrar el botón cuando hay contenido para hacer scroll
			setIsVisible(documentHeight > windowHeight);

			// Cambiar el estado cuando se hace scroll (más de 100px)
			setIsScrolled(scrollY > 100);
		};

		// Verificar inicialmente si hay contenido para scroll
		handleScroll();

		// Escuchar el evento scroll
		window.addEventListener('scroll', handleScroll);

		// Limpiar el evento al desmontar
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	const handleClick = () => {
		// Solo funciona si el usuario ya hizo scroll
		if (isScrolled) {
			scrollToTop();
		}
		// Si no ha hecho scroll, no hace nada (solo indica que hay contenido)
	};

	// No mostrar el botón si no hay contenido para scroll
	if (!isVisible) return null;

	return (
		<button
			onClick={handleClick}
			className={`fixed bottom-6 left-6 z-[9999] flex h-14 w-14 transform items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-105 hover:bg-green-600 hover:shadow-xl focus:ring-4 focus:ring-green-300 focus:outline-none sm:bottom-8 sm:left-8 sm:h-16 sm:w-16 ${isScrolled ? 'opacity-100' : 'opacity-70'} `}
			style={{
				cursor: isScrolled ? 'pointer' : 'default'
			}}
			aria-label={isScrolled ? 'Scroll to top' : 'More content below'}
		>
			<svg
				className={`h-6 w-6 transition-all duration-500 ease-in-out sm:h-7 sm:w-7 ${isScrolled ? 'rotate-180 transform' : ''} `}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				/>
			</svg>

			{/* Indicador de pulso cuando no se ha hecho scroll */}
			{!isScrolled && (
				<div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-30"></div>
			)}
		</button>
	);
};

export default ScrollButton;

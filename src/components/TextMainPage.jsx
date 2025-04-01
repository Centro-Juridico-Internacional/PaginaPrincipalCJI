import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '@styles/heroTyped.css';

const TEXT = [
	{
		id: 1,
		text: 'P.S.C'
	},
	{
		id: 2,
		text: 'Prevención'
	},
	{
		id: 3,
		text: 'Solución'
	},
	{
		id: 4,
		text: 'Capacitación'
	}
];

export default function MyComponent() {
	const el = useRef(null);

	useEffect(() => {
		if (!el.current) return; // Evita errores si el ref no está asignado

		const typed = new Typed(el.current, {
			// Esto renderiza los textos
			strings: TEXT.map(
				(item) =>
					`<span class="pl-4 text-4xl xs:text-5xl lg:text-6xl text-goldColor dark:text-goldColor">${item.text}</span>`
			),

			showCursor: true, // Mostrar el cursor
			cursorChar: '|', // El carácter del cursor
			typeSpeed: 50, // Velocidad de escritura
			backSpeed: 50, // Velocidad al borrar igual a la de escribir
			backDelay: 500, // Pausa antes de borrar el texto
			fadeOut: true, // Hace que el texto desaparezca antes de escribir el siguiente
			fadeOutClass: 'typed-fade-out', // Clase CSS personalizada si quieres personalizar el fadeOut
			loop: true // Repite el ciclo de textos
		});

		return () => typed.destroy(); // Limpieza al desmontar el componente
	}, []);

	return (
		<div className="w-auto text-center font-bold text-white md:text-start">
			<span ref={el} />
		</div>
	);
}

import React, { useEffect, useState } from 'react';

export default function YouTubeLite({ videoid, id }) {
	const [loaded, setLoaded] = useState(false);

	// Definir originalConsoleError fuera del useEffect
	let originalConsoleError;

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Filtrar errores de consola globalmente
			originalConsoleError = console.error;
			console.error = function (...args) {
				// Ignorar errores relacionados con "play.google.com/log"
				if (args[0] && args[0].includes('play.google.com/log')) {
					return;
				}
				originalConsoleError.apply(console, args);
			};

			// Importar el componente 'lite-youtube' solo en el cliente
			import('@justinribeiro/lite-youtube').then(() => {
				setLoaded(true);
			});
		}

		// Limpiar el filtro de errores cuando el componente se desmonte
		return () => {
			if (originalConsoleError) {
				console.error = originalConsoleError;
			}
		};
	}, []);

	if (!loaded) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<a className="lite-youtube-fallback" href={`https://www.youtube.com/watch?v=${videoid}`}>
					Ver en YouTube
				</a>
			</div>
		);
	}

	return (
		<div className="flex h-full w-full items-center justify-center">
			<lite-youtube videoid={videoid} id={id} posterquality="maxresdefault">
				<a
					className="lite-youtube-fallback"
					href={`https://www.youtube.com/watch?v=${videoid}`}
				></a>
			</lite-youtube>
		</div>
	);
}

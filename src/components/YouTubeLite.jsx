import React, { useEffect, useState } from 'react';

export default function YouTubeLite({ videoid, id }) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Filtrar errores de consola globalmente
			const originalConsoleError = console.error;
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
				console.log('lite-youtube cargado correctamente');
			});
		}

		// Limpiar el filtro de errores cuando el componente se desmonte
		return () => {
			console.error = originalConsoleError;
		};
	}, []);

	if (!loaded) {
		return (
			<div className="flex h-full w-full items-start justify-center">
				<a className="lite-youtube-fallback" href={`https://www.youtube.com/watch?v=${videoid}`}>
					Ver en YouTube
				</a>
			</div>
		);
	}

	return (
		<div className="flex h-full w-full items-start justify-center">
			<lite-youtube videoid={videoid} id={id}>
				<a
					className="lite-youtube-fallback"
					href={`https://www.youtube.com/watch?v=${videoid}`}
				></a>
			</lite-youtube>
		</div>
	);
}

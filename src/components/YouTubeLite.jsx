import React, { useEffect, useState } from 'react';

export default function YouTubeLite({ videoid, id }) {
	// Estado para manejar si el componente 'lite-youtube' ha sido cargado
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Importamos el componente 'lite-youtube' solo en el cliente
			import('@justinribeiro/lite-youtube').then(() => {
				setLoaded(true); // Marcamos que 'lite-youtube' ha sido cargado
				console.log('lite-youtube cargado correctamente');
			});
		}
	}, []);

	if (!loaded) {
		// Mientras el componente no esté cargado, mostramos un fallback o no renderizamos nada
		return (
			<div className="flex h-full w-full items-start justify-center">
				{/* Muestra un enlace a YouTube si 'lite-youtube' no está cargado */}
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

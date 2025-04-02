import React, { useEffect } from 'react';

export default function YouTubeLite({ videoid }) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			import('@justinribeiro/lite-youtube').then(() => {
				console.log('lite-youtube cargado correctamente');
			});
		}
	}, []);

	return (
		<div className="flex h-full w-full items-start justify-center">
			<lite-youtube videoid={videoid}>
				<a
					className="lite-youtube-fallback"
					href={`https://www.youtube.com/watch?v=${videoid}`}
				></a>
			</lite-youtube>
		</div>
	);
}

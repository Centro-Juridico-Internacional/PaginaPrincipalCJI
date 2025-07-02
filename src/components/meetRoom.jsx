'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Loader2, ChevronDown, ChevronRight, Users } from 'lucide-react';

export default function MeetRoomSearch({ rooms, placeholder = 'Buscar salas...', className = '' }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [expandedCategories, setExpandedCategories] = useState({});

	// Implementar delay de 500ms con indicador de carga
	useEffect(() => {
		if (searchTerm.trim()) {
			setIsSearching(true);
		}

		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
			setIsSearching(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	// Agrupar todas las salas por categoría (para la sección de categorías)
	const allRoomsByCategory = useMemo(() => {
		const grouped = rooms.reduce((acc, room) => {
			const category = room.category || 'General';
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(room);
			return acc;
		}, {});
		return grouped;
	}, [rooms]);

	// Filtrar y agrupar salas por categoría (para los resultados de búsqueda)
	const filteredAndGroupedRooms = useMemo(() => {
		if (!debouncedSearchTerm.trim()) {
			return {};
		}

		const filtered = rooms.filter(
			(room) =>
				room.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
				room.id.toString().includes(debouncedSearchTerm) ||
				(room.category && room.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
		);

		// Agrupar por categoría
		const grouped = filtered.reduce((acc, room) => {
			const category = room.category || 'General';
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(room);
			return acc;
		}, {});

		return grouped;
	}, [debouncedSearchTerm, rooms]);

	const handleJoinRoom = (url) => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	const toggleCategory = (category) => {
		setExpandedCategories((prev) => ({
			...prev,
			[category]: !prev[category]
		}));
	};

	const hasResults = Object.keys(filteredAndGroupedRooms).length > 0;
	const showResults = debouncedSearchTerm.trim() && !isSearching;
	const showCategories = !debouncedSearchTerm.trim() && !isSearching;

	return (
		<div className={`mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 ${className}`}>
			{/* Campo de búsqueda */}
			<div className="relative mx-auto mb-4 w-full max-w-md">
				<input
					type="text"
					placeholder={placeholder}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full touch-manipulation rounded-full border border-gray-300 bg-white px-4 py-3 pr-12 text-base text-gray-700 shadow-sm transition-all duration-200 focus:border-transparent focus:shadow-md focus:ring-2 focus:ring-green-500 focus:outline-none sm:text-sm"
				/>
				<div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
					{isSearching ? (
						<Loader2 className="tw-spin h-5 w-5 text-green-500" />
					) : (
						<Search className="h-5 w-5 text-gray-400 transition-colors duration-200" />
					)}
				</div>
			</div>

			{/* Resultados de búsqueda */}
			<div className="relative">
				{/* Indicador de búsqueda */}
				{isSearching && searchTerm.trim() && (
					<div className="tw-pulse mx-auto mb-4 w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
						<div className="flex items-center justify-center gap-2 text-gray-500">
							<Loader2 className="tw-spin h-4 w-4 text-green-500" />
							<span className="text-sm">Buscando salas...</span>
						</div>
					</div>
				)}

				{/* Resultados - Solo se muestran si hay búsqueda y no está cargando */}
				{showResults && (
					<div className="tw-slide-in mx-auto mb-4 w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
						{hasResults ? (
							Object.entries(filteredAndGroupedRooms).map(
								([category, categoryRooms], categoryIndex) => (
									<div
										key={category}
										className="tw-fade-in-up border-b border-gray-100 last:border-b-0"
										style={{
											animationDelay: `${categoryIndex * 0.1}s`
										}}
									>
										{/* Header de categoría */}
										<div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
											<div className="flex items-center gap-2">
												<div className="tw-pulse h-2 w-2 rounded-full bg-green-400"></div>
												<h3 className="text-xs font-medium tracking-wide text-gray-700 uppercase sm:text-sm">
													{category}
												</h3>
											</div>
										</div>

										{/* Subsección */}
										<div className="px-4 py-2">
											<h4 className="mb-2 text-sm font-medium text-gray-600">
												{category === 'DESARROLLO' ? 'Desarrollos' : `Salas de ${category}`}
											</h4>

											{/* Lista de salas */}
											<div className="space-y-1">
												{categoryRooms.map((room, roomIndex) => (
													<button
														key={room.id}
														onClick={() => handleJoinRoom(room.url)}
														className="group tw-fade-in-up flex w-full transform touch-manipulation items-center justify-between rounded px-3 py-3 text-left text-sm text-gray-700 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-50 hover:shadow-sm active:scale-[0.98] sm:py-2"
														style={{
															animationDelay: `${categoryIndex * 0.1 + roomIndex * 0.05 + 0.2}s`
														}}
													>
														<span className="truncate pr-2 transition-colors duration-200 group-hover:text-gray-900">
															{room.name}
														</span>
														<span className="flex-shrink-0 translate-x-2 transform text-xs text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
															Unirse →
														</span>
													</button>
												))}
											</div>
										</div>
									</div>
								)
							)
						) : (
							<div className="tw-fade-in-up px-4 py-6 text-center text-gray-500">
								<Search className="tw-bounce mx-auto mb-2 h-8 w-8 opacity-50" />
								<p className="text-sm">No se encontraron salas para "{debouncedSearchTerm}"</p>
							</div>
						)}
					</div>
				)}

				{/* Sección de categorías en dos columnas - Solo se muestra cuando no hay búsqueda */}
				{showCategories && (
					<div className="tw-slide-in overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
						<div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
							<h3 className="flex items-center gap-2 text-sm font-medium tracking-wide text-gray-700 uppercase">
								<Users className="h-4 w-4" />
								Categorías de Salas
							</h3>
						</div>

						{/* Grid responsive - 1 columna en mobile, 2 en desktop */}
						<div className="grid grid-cols-1 divide-y divide-gray-100 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
							{Object.entries(allRoomsByCategory).map(
								([category, categoryRooms], categoryIndex) => (
									<div
										key={category}
										className="tw-fade-in-up"
										style={{
											animationDelay: `${categoryIndex * 0.1}s`
										}}
									>
										{/* Header de categoría clickeable */}
										<button
											onClick={() => toggleCategory(category)}
											className="group flex w-full touch-manipulation items-center justify-between border-b border-gray-100 px-4 py-4 text-left transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100 sm:py-3"
										>
											<div className="flex items-center gap-3">
												<div className="h-2 w-2 rounded-full bg-green-500"></div>
												<span className="text-sm font-medium text-gray-700 transition-colors duration-200 group-hover:text-gray-900 sm:text-sm">
													{category}
												</span>
												<span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
													{categoryRooms.length}
												</span>
											</div>

											<div className="transition-transform duration-200">
												{expandedCategories[category] ? (
													<ChevronDown className="h-4 w-4 text-gray-400" />
												) : (
													<ChevronRight className="h-4 w-4 text-gray-400" />
												)}
											</div>
										</button>

										{/* Lista de salas expandible */}
										{expandedCategories[category] && (
											<div className="tw-expand-down bg-gray-50 px-4 py-2">
												<div className="mobile-scroll max-h-64 space-y-1 overflow-y-auto sm:max-h-64">
													{categoryRooms.map((room, roomIndex) => (
														<button
															key={room.id}
															onClick={() => handleJoinRoom(room.url)}
															className="group tw-fade-in-up flex w-full touch-manipulation items-center justify-between rounded px-3 py-3 text-left text-sm text-gray-600 transition-all duration-200 hover:bg-white hover:text-gray-800 hover:shadow-sm active:scale-[0.98] sm:py-2"
															style={{
																animationDelay: `${roomIndex * 0.05}s`
															}}
														>
															<span className="truncate pr-2 transition-colors duration-200">
																{room.name}
															</span>
															<span className="flex-shrink-0 translate-x-2 transform text-xs text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
																→
															</span>
														</button>
													))}
												</div>
											</div>
										)}
									</div>
								)
							)}
						</div>
					</div>
				)}
			</div>

			{/* Estilos CSS optimizados para mobile */}
			<style jsx>{`
				.tw-spin {
					animation: spin 1s linear infinite;
				}

				.tw-pulse {
					animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
				}

				.tw-bounce {
					animation: bounce 1s infinite;
				}

				.tw-slide-in {
					animation: slideInFromTop 0.3s ease-out;
				}

				.tw-fade-in-up {
					animation: fadeInUp 0.4s ease-out both;
				}

				.tw-expand-down {
					animation: expandDown 0.3s ease-out;
				}

				@keyframes spin {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				@keyframes pulse {
					0%,
					100% {
						opacity: 1;
					}
					50% {
						opacity: 0.5;
					}
				}

				@keyframes bounce {
					0%,
					100% {
						transform: translateY(-25%);
						animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
					}
					50% {
						transform: translateY(0);
						animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
					}
				}

				@keyframes slideInFromTop {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes expandDown {
					from {
						opacity: 0;
						max-height: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						max-height: 500px;
						transform: translateY(0);
					}
				}

				/* Scroll optimizado para mobile */
				.mobile-scroll::-webkit-scrollbar {
					width: 6px;
				}

				.mobile-scroll::-webkit-scrollbar-track {
					background: #f1f5f9;
					border-radius: 3px;
				}

				.mobile-scroll::-webkit-scrollbar-thumb {
					background: #cbd5e1;
					border-radius: 3px;
				}

				.mobile-scroll::-webkit-scrollbar-thumb:hover {
					background: #94a3b8;
				}

				/* Mejoras para touch en mobile */
				@media (max-width: 640px) {
					.touch-manipulation {
						touch-action: manipulation;
						-webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
					}
				}

				/* Optimizaciones adicionales para pantallas pequeñas */
				@media (max-width: 480px) {
					.mobile-scroll {
						max-height: 200px;
					}
				}
			`}</style>
		</div>
	);
}

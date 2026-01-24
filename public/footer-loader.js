/**
 * FOOTER LOADER SCRIPT
 * Permite importar el footer institucional en cualquier sitio web con una sola línea.
 */
(function () {
    const CONFIGS = [
        { id: 'cji-shared-footer-container', url: 'https://pagina-principal-cji.vercel.app/shared-footer' },
        { id: 'cji-shared-footer-container-2', url: 'https://pagina-principal-cji.vercel.app/shared-footer-2' }
    ];

    function init() {
        CONFIGS.forEach(config => {
            const container = document.getElementById(config.id);
            if (!container) return;

            // Limpiar el contenedor solo si es necesario
            if (container.querySelector('iframe')) return;

            // Crear el iframe
            const iframe = document.createElement('iframe');
            iframe.src = config.url;
            iframe.style.width = '100%';
            iframe.style.border = 'none';
            iframe.style.overflow = 'hidden';
            iframe.scrolling = 'no';
            iframe.id = 'cji-footer-iframe'; // Mantener ID original para evitar romper estilos externos
            iframe.className = 'cji-footer-iframe';

            container.appendChild(iframe);

            // Ajustar altura automáticamente
            window.addEventListener('message', function (event) {
                if (event.data && event.data.type === 'cji-footer-resize') {
                    // Si el mensaje viene de este iframe, lo redimensionamos
                    // Nota: para múltiples footers, lo ideal es que el mensaje incluya el ID
                    // pero para compatibilidad, redimensionamos el que corresponda.
                    if (event.source === iframe.contentWindow) {
                        iframe.style.height = event.data.height + 'px';
                    }
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Soporte para Astro ViewTransitions (ClientRouter)
    document.addEventListener('astro:page-load', init);
})();

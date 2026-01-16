/**
 * FOOTER LOADER SCRIPT
 * Permite importar el footer institucional en cualquier sitio web con una sola línea.
 */
(function () {
    const CONFIG = {
        footerUrl: 'https://pagina-principal-cji.vercel.app/shared-footer', // Cambia esto por la URL real de tu página PRINCIPAL desplegada
        elementId: 'cji-shared-footer-container'
    };

    function init() {
        const container = document.getElementById(CONFIG.elementId);
        if (!container) return;

        // Limpiar el contenedor solo si es necesario (para evitar duplicados en recargas rápidas)
        if (container.querySelector('#cji-footer-iframe')) return;

        // Crear el iframe
        const iframe = document.createElement('iframe');
        iframe.src = CONFIG.footerUrl;
        iframe.style.width = '100%';
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.scrolling = 'no';
        iframe.id = 'cji-footer-iframe';

        container.appendChild(iframe);

        // Ajustar altura automáticamente
        window.addEventListener('message', function (event) {
            // Solo aceptar mensajes de nuestro dominio (opcional por seguridad)
            // if (event.origin !== "https://pagina-principal-cji.vercel.app/") return;

            if (event.data && event.data.type === 'cji-footer-resize') {
                iframe.style.height = event.data.height + 'px';
            }
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

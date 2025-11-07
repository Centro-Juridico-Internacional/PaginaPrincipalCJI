document.addEventListener('astro:page-load', () => {
    const headerElement = document.getElementById('header');
    const headerHeight = headerElement ? headerElement.offsetHeight : 0; // Si 'header' es null, usa 0 como altura.
    const screenHeight = window.innerHeight;
    const totalHeight = screenHeight - headerHeight;

    // Actualiza el estilo del contenedor (por ejemplo, contenido)
    const content = document.getElementById('MainPage');
    if (content) {
        content.style.height = `${totalHeight}px`; // Aplica la nueva altura
    }
});

window.addEventListener('resize', () => {
    const headerElement = document.getElementById('header');
    const headerHeight = headerElement ? headerElement.offsetHeight : 0; // Si 'header' es null, usa 0 como altura.
    const screenHeight = window.innerHeight;
    const totalHeight = screenHeight - headerHeight;

    // Actualiza el estilo del contenedor (por ejemplo, contenido)
    const content = document.getElementById('MainPage');
    if (content) {
        content.style.height = `${totalHeight}px`; // Aplica la nueva altura
    }
});
window.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.getElementById('header');
    const headerHeight = headerElement ? headerElement.offsetHeight : 0; // Si 'header' es null, usa 0 como altura.
    const screenHeight = window.innerHeight;
    const totalHeight = screenHeight - headerHeight;

    // Actualiza el estilo del contenedor (por ejemplo, contenido)
    const content = document.getElementById('MainPage');
    if (content) {
        content.style.height = `${totalHeight}px`; // Aplica la nueva altura
    }
});
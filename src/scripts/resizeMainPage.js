const updateMainPageHeight = () => {
  const headerElement = document.getElementById('header');
  const content = document.getElementById('MainPage');

  if (!content) {
    return;
  }

  const headerHeight = headerElement ? headerElement.offsetHeight : 0;
  const screenHeight = window.innerHeight;
  const contentHeight = Math.max(screenHeight - headerHeight, 0);

  content.style.height = `${contentHeight}px`;
};

const setup = () => {
  updateMainPageHeight();

  const resizeHandler = () => updateMainPageHeight();
  window.addEventListener('resize', resizeHandler);
  document.addEventListener('astro:page-load', updateMainPageHeight);
  document.addEventListener('astro:after-swap', updateMainPageHeight);

  const headerElement = document.getElementById('header');
  const observer =
    typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateMainPageHeight);
  if (observer && headerElement) {
    observer.observe(headerElement);
  }

  const cleanup = () => {
    window.removeEventListener('resize', resizeHandler);
    document.removeEventListener('astro:page-load', updateMainPageHeight);
    document.removeEventListener('astro:after-swap', updateMainPageHeight);
    observer?.disconnect();
  };

  document.addEventListener('astro:before-swap', cleanup, { once: true });
  window.addEventListener('pagehide', cleanup, { once: true });
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setup();
} else {
  document.addEventListener('DOMContentLoaded', setup, { once: true });
}

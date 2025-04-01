import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '@styles/heroTyped.css';

export default function MyComponent() {
    const el = useRef(null);

    useEffect(() => {
        if (!el.current) return; // Evita errores si el ref no está asignado

        const typed = new Typed(el.current, {
            strings: [
                `<span class="text-5xl lg:text-6xl text-goldColor dark:text-goldColor">P.S.C</span>`,
                `<span class="text-5xl lg:text-6xl text-goldColor dark:text-goldColor">Prevención</span>`,
                `<span class="text-5xl lg:text-6xl text-goldColor dark:text-goldColor">Solución</span>`,
                `<span class="text-5xl lg:text-6xl text-goldColor dark:text-goldColor">Capacitación</span>`
            ],
            showCursor:true,
            cursorChar: '|',
            typeSpeed: 50,
            backSpeed: 50, // Velocidad al borrar igual a la de escribir
            backDelay: 500, // Pausa antes de borrar el texto
            fadeOut: true, // Hace que el texto desaparezca antes de escribir el siguiente
            fadeOutClass: 'typed-fade-out', // Clase CSS personalizada si quieres personalizar el fadeOut
            loop: true, // Repite el ciclo de textos
        });

        return () => typed.destroy(); // Limpieza al desmontar el componente
    }, []);

    return (
        <div className="w-auto text-center font-bold text-white md:text-start">
            <span ref={el} />
        </div>
    );
}

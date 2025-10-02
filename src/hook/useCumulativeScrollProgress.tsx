import {useEffect, useRef, useState} from 'react';

function useCumulativeScrollProgress(maxValue = 1) {
    const [progress, setProgress] = useState(0);
    const cumulativeRef = useRef(0);
    const touchStartY = useRef(null);

    useEffect(() => {
        const onWheel = (e) => {
            console.log(progress)

            if (e.deltaY > 0) {
                cumulativeRef.current += Math.round(e.deltaY * 0.001); // Ajuste scale pour fluidité
            } else if (e.deltaY < 0) {
                cumulativeRef.current += e.deltaY * 0.001; // scroll vers le haut diminuera la valeur
            }

            // Clamp la valeur entre 0 et maxValue
            if (cumulativeRef.current > maxValue) cumulativeRef.current = maxValue;
            if (cumulativeRef.current < 0) cumulativeRef.current = 0;
            console.log('cumulativeRef.current', cumulativeRef.current)
            setProgress(cumulativeRef.current);
        };
        const onTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const onTouchMove = (e) => {
            console.log(progress)

            if (touchStartY.current === null) return;
            const currentY = e.touches[0].clientY;
            const deltaY = touchStartY.current - currentY; // positif = défilement vers le bas
            cumulativeRef.current += deltaY * 0.002; // sensibilité à ajuster
            cumulativeRef.current = Math.min(Math.max(cumulativeRef.current, 0), maxValue);
            setProgress(cumulativeRef.current);
            touchStartY.current = currentY;
        };

        window.addEventListener('wheel', onWheel, {passive: true});
        window.addEventListener('touchstart', onTouchStart, {passive: true});
        window.addEventListener('touchmove', onTouchMove, {passive: false});
        return () => window.removeEventListener('wheel', onWheel);
    }, [maxValue]);

    return progress;
}

export default useCumulativeScrollProgress
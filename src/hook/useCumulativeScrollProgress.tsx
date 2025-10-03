import {useEffect, useRef, useState} from 'react';
import {MAX_STEPS} from "../data/constantes.ts";

function useCumulativeScrollProgress(maxValue = MAX_STEPS + 0.5) {
    const [progress, setProgress] = useState(0);
    const cumulativeRef = useRef(0);
    const touchStartY = useRef<number | null>(null);

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {

            if (e.deltaY > 0) {
                //scroll vers le bas
                cumulativeRef.current += e.deltaY * 0.0005
            } else if (e.deltaY < 0) {
                //scroll vers le haut
                cumulativeRef.current += e.deltaY * 0.0005;
            }
            if (cumulativeRef.current > maxValue) cumulativeRef.current = maxValue;
            if (cumulativeRef.current < 0) cumulativeRef.current = 0;
            setProgress(cumulativeRef.current);
        };
        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
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
        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
        };
    }, [maxValue]);

    return progress;
}

export default useCumulativeScrollProgress
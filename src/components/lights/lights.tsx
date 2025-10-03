export function ElegantLights() {

    return (
        <>
            {/* Lumière ambiante douce (base) */}
            <ambientLight intensity={0.3} color="#f7e9d7"/>
            {/* Beige chaud */}

            {/* Key Light (principale) - dorée, légèrement directionnelle */}
            <directionalLight
                position={[2, 3, 2]}
                intensity={1}
                color="#f5e0b8"
                castShadow
                shadow-mapSize={[1024, 1024]}
            />

            {/* Fill Light (remplissage) - côté opposé, plus douce */}
            <directionalLight
                position={[-2, 1, -1]}
                intensity={0.4}
                color="#f8dcc0"
            />

            {/* Back Light / Rim Light - contour doré */}
            <pointLight
                position={[0, 2, -2]}
                intensity={0.8}
                color="#ffd7a0"
                decay={2}
            />
        </>
    );
}


export function GoldenBackLight() {
    return (
        <>
            <ambientLight intensity={0.2} color="#e6ccb2"/>
            {/* Contre-jour doré */}
            <directionalLight
                position={[0, 1, -2]}
                intensity={0.1}
                color="#ffebcd"
                castShadow={false}
            />
            {/* Légère lumière frontale neutre pour voir les détails */}
            <directionalLight
                position={[0, 1, 2]}
                intensity={0.3}
                color="#f8f4e9"
            />
        </>
    );
}

export function WarmLampLight() {
    return (
        <>
            <ambientLight intensity={0.2} color="#f0e6d2"/>
            <pointLight
                position={[0.7, 1, 0]}
                intensity={3}
                color="#ffcc80" // Orange doux
                decay={3}
                distance={10}
                castShadow
            />
        </>
    );
}
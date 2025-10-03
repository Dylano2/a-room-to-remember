import {Leva} from "leva";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Html, OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import {useEffect, useState} from "react";
import {useScene} from "./hook/useScene.tsx";
import {easeInOutQuad, lerp, lerpVector3} from "./utils/utils.tsx";
import {ElegantLights, GoldenBackLight, WarmLampLight} from "./components/lights/lights.tsx";
import type {SceneState} from "./types/type.ts";

function VolumetricSpot() {
    return (
        <>
            <spotLight
                position={[0, 5, 0]}
                angle={0.3}
                penumbra={0.2}
                intensity={10}
                color="white"
                castShadow
            />

        </>
    );
}


type SceneProps = {
    steps: SceneState[],
    setStep: (stepValue: number) => void,
    progress: number
}

function Scene({steps, setStep, progress}: SceneProps) {
    const {camera} = useThree();
    const {obj, carteRef, boiteRef, parfumsRef} = useScene()


    useEffect(() => {
        const currentStep = Math.min(Math.floor(progress), steps.length - 1);
        setStep(currentStep);
    }, [progress, setStep, steps.length]);
    useFrame(() => {

        const maxStep = steps.length - 1;
        const clampedProgress = Math.min(progress, maxStep); // Limite à la dernière étape
        const currentStepIndex = Math.floor(clampedProgress);
        const nextStepIndex = Math.min(currentStepIndex + 1, maxStep);
        const t = clampedProgress - currentStepIndex;

        const currentStep = steps[currentStepIndex];
        const nextStep = steps[nextStepIndex];

        const easedT = easeInOutQuad(t);
        const currentCamPos = new THREE.Vector3(
            currentStep.cameraState.position.x,
            currentStep.cameraState.position.y,
            currentStep.cameraState.position.z
        );
        const nextCamPos = new THREE.Vector3(
            nextStep.cameraState.position.x,
            nextStep.cameraState.position.y,
            nextStep.cameraState.position.z
        );
        const interpolatedCamPos = lerpVector3(currentCamPos, nextCamPos, easedT);
        camera.position.copy(interpolatedCamPos);

        const currentLookAt = new THREE.Vector3(
            currentStep.cameraState.lookAt.x,
            currentStep.cameraState.lookAt.y,
            currentStep.cameraState.lookAt.z
        );
        const nextLookAt = new THREE.Vector3(
            nextStep.cameraState.lookAt.x,
            nextStep.cameraState.lookAt.y,
            nextStep.cameraState.lookAt.z
        );
        const interpolatedLookAt = lerpVector3(currentLookAt, nextLookAt, easedT);
        camera.lookAt(interpolatedLookAt);

        // Interpolation boîte
        if (boiteRef.current.length > 0) {

            const currentBoitePos = currentStep.boiteState?.position || {x: 0, y: 0, z: 0};
            const nextBoitePos = nextStep.boiteState?.position || {x: 0, y: 0, z: 0};
            const currentBoiteRot = currentStep.boiteState?.rotation || {x: 0, y: 0, z: 0};
            const nextBoiteRot = nextStep.boiteState?.rotation || {x: 0, y: 0, z: 0};

            boiteRef.current.forEach((mesh: THREE.Mesh) => {
                mesh.position.set(
                    lerp(currentBoitePos.x, nextBoitePos.x, easedT),
                    lerp(currentBoitePos.y, nextBoitePos.y, easedT),
                    lerp(currentBoitePos.z, nextBoitePos.z, easedT)
                );
                mesh.rotation.set(
                    lerp(currentBoiteRot.x, nextBoiteRot.x, easedT),
                    lerp(currentBoiteRot.y, nextBoiteRot.y, easedT),
                    lerp(currentBoiteRot.z, nextBoiteRot.z, easedT)
                );
            });
        }

        if (parfumsRef.current.length > 0) {
            const currentBoitePos = currentStep.boiteState?.position || {x: 0, y: 0, z: 0};
            const nextBoitePos = nextStep.boiteState?.position || {x: 0, y: 0, z: 0};
            const currentBoiteRot = currentStep.boiteState?.rotation || {x: 0, y: 0, z: 0};
            const nextBoiteRot = nextStep.boiteState?.rotation || {x: 0, y: 0, z: 0};

            parfumsRef.current.forEach((mesh) => {
                mesh.position.set(
                    lerp(currentBoitePos.x, nextBoitePos.x, easedT),
                    lerp(currentBoitePos.y, nextBoitePos.y, easedT),
                    lerp(currentBoitePos.z, nextBoitePos.z, easedT)
                );
                mesh.rotation.set(
                    lerp(currentBoiteRot.x, nextBoiteRot.x, easedT),
                    lerp(currentBoiteRot.y, nextBoiteRot.y, easedT),
                    lerp(currentBoiteRot.z, nextBoiteRot.z, easedT)
                );
            });
        }

        if (carteRef.current) {
            const currentCartePos = currentStep.carteState?.position || {x: 0, y: 0, z: 0};
            const nextCartePos = nextStep.carteState?.position || {x: 0, y: 0, z: 0};


            carteRef.current.position.set(
                lerp(currentCartePos.x, nextCartePos.x, easedT),
                lerp(currentCartePos.y, nextCartePos.y, easedT),
                lerp(currentCartePos.z, nextCartePos.z, easedT)
            );

            // ✅ Interpolation du scale
            const currentScale = currentStep.carteState?.scale || {x: 1, y: 1, z: 1};
            const nextScale = nextStep.carteState?.scale || {x: 1, y: 1, z: 1};

            carteRef.current.scale.set(
                lerp(currentScale.x, nextScale.x, easedT),
                lerp(currentScale.y, nextScale.y, easedT),
                lerp(currentScale.z, nextScale.z, easedT)
            );

        }

        // Micro-mouvement global (optionnel)
        camera.position.x += Math.sin(Date.now() / 4000) * 0.002;
        camera.position.y += Math.cos(Date.now() / 5000) * 0.001;

        camera.updateProjectionMatrix();
    });


    return <>
        <primitive object={obj}/>
    </>
}


export const CameraPositionViewer = () => {
    const {camera} = useThree();
    const [position, setPosition] = useState({x: 0, y: 0, z: 0});

    // Mets à jour la position à chaque frame
    useFrame(() => {
        const pos = camera.position;
        // Seulement si la position a changé (optimisation)
        if (pos.x !== position.x || pos.y !== position.y || pos.z !== position.z) {
            setPosition({x: pos.x, y: pos.y, z: pos.z});
        }

    });

    return (
        <Html position={[0, 1, 0]} className="bg-blue-400 text-white text-xs p-1 text-nowrap">
            camera :<br/>
            X: {position.x.toFixed(2)}<br/>
            Y: {position.y.toFixed(2)}<br/>
            Z: {position.z.toFixed(2)}
        </Html>
    );
};

export const CartePositionViewer = () => {
    const {carteRef} = useScene();
    const [position, setPosition] = useState({x: 0, y: 0, z: 0});

    // Mets à jour la position à chaque frame
    useFrame(() => {
        if (carteRef.current) {
            const pos = carteRef.current.position;
            // Seulement si la position a changé (optimisation)
            if (pos.x !== position.x || pos.y !== position.y || pos.z !== position.z) {
                setPosition({x: pos.x, y: pos.y, z: pos.z});
            }
        }
    });

    return (
        <Html position={[0, 1, 0]} className="bg-red-500 text-white text-xs p-1 text-nowrap">
            CARTE :<br/>
            X: {position.x.toFixed(2)}<br/>
            Y: {position.y.toFixed(2)}<br/>
            Z: {position.z.toFixed(2)}
        </Html>
    );
};

export function SceneTestWithMyBox({steps, setStep, progress}: SceneProps) {
    return <div className={"h-dvh touch-none"}>

        <Leva/>
        <Canvas>

            {/*
            <CameraPositionViewer/>
*/}
            {/*     <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport/>
            </GizmoHelper>*/}
            <OrbitControls/>
            <ElegantLights/>
            <GoldenBackLight/>
            <VolumetricSpot/>
            <WarmLampLight/>


            <Scene steps={steps} setStep={setStep} progress={progress}/>

        </Canvas>
    </div>

}

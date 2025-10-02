import {Leva} from "leva";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {GizmoHelper, GizmoViewport} from "@react-three/drei";
import * as THREE from "three";
import {useEffect, useRef, useState} from "react";
import useCumulativeScrollProgress from "./hook/useCumulativeScrollProgress.tsx";


function easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

const ETIQUETTE_PARFUM_3 = 'plane.008'
const ETIQUETTE_PARFUM_2 = 'plane.011'
const ETIQUETTE_PARFUM_1 = 'plane.014'
const BOUTEILLES_PARFUM = "plane.001"
const BOUCHONS_PARFUM = "circle.002"
const EXTERIEUR_BOITE = 'plane.004'
const INTERIEUR_BOITE = 'plane.005'
const CARTE = ['carte']

const PARFUMS_OBJ = [ETIQUETTE_PARFUM_3, ETIQUETTE_PARFUM_2, ETIQUETTE_PARFUM_1, BOUTEILLES_PARFUM, BOUCHONS_PARFUM]
const BOITE_OBJ = [EXTERIEUR_BOITE, INTERIEUR_BOITE]
type CameraState = {
    position: {
        x: number,
        y: number,
        z: number,
    }
    lookAt: {
        x: number,
        y: number,
        z: number,
    }
}

type ObjetState = {
    position: {
        x: number,
        y: number,
        z: number,
    }
}

type SceneState = {
    cameraState: CameraState;
    carteState: ObjetState,
    boiteState: ObjetState,
    parfumsState: ObjetState

}

const step1: CameraState = {lookAt: {x: 0.6, y: 0.4, z: 0}, position: {x: 3, y: 1.7, z: -0.6}}

const cameraState0: CameraState = {lookAt: {x: 0.8, y: 0.4, z: 0}, position: {x: 5.1, y: 0.8, z: -0.8}}

function Scene() {
    const [step, setStep] = useState(0)
    const {camera} = useThree();

    const obj = useLoader(OBJLoader, '/PARFUM SCENE OBJ/PARFUM_SCENE_v01.obj')
    const sceneRef = useRef<THREE.Mesh[]>([]);
    const carteRef = useRef<THREE.Mesh>(null!);
    const progress = useCumulativeScrollProgress()

    // Position d'origine caméra en début d'animation
    const originPosition = useRef(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z));

    // Vecteur permettant interpolation de position caméra
    const targetPosition = new THREE.Vector3(step1.position.x, step1.position.y, step1.position.z);
    const targetLookAt = new THREE.Vector3(step1.lookAt.x, step1.lookAt.y, step1.lookAt.z);


    // Interpolation (lerp) entre deux Vector3
    function lerpVector3(start: THREE.Vector3, end: THREE.Vector3, alpha: number) {
        return start.clone().lerp(end, alpha);
    }

    useEffect(() => {
        const childToNotDisplay = ['plane.018', 'plane.020']

        obj.traverse(child => {
            if (child instanceof THREE.Mesh) {
                if (childToNotDisplay.includes(child.name.toLowerCase())) {
                    child.visible = false;
                } else if (PARFUMS_OBJ.includes(child.name.toLowerCase())) {
                    if (child.isMesh && child.material && child.material.color) {
                        child.material.color.set('red');
                    }
                } else if (BOITE_OBJ.includes(child.name.toLowerCase())) {
                    if (child.isMesh && child.material && child.material.color) {
                        child.material.color.set('green');
                    }
                } else if (CARTE.includes(child.name.toLowerCase())) {
                    if (child.isMesh && child.material && child.material.color) {
                        child.material.color.set('blue');
                        carteRef.current = child;
                    }
                } else {
                    sceneRef.current.push(child)
                }
            }
        });
    }, [obj]);

    useEffect(() => {
        console.dir(cameraState0, {depth: Infinity})

    }, []);

    useFrame(() => {
        camera.position.set(
            cameraState0.position.x, cameraState0.position.y, cameraState0.position.z);
        camera.lookAt(cameraState0.lookAt.x, cameraState0.lookAt.y, cameraState0.lookAt.z);
        camera.updateProjectionMatrix();
        if (step === 1) {
            const eased = easeInOutQuad(progress);

            carteRef.current.position.y = easeInOutQuad(progress)
            // Interpoler la position caméra selon easing et progress

            const newCamPos = lerpVector3(originPosition.current, targetPosition, eased);
            camera.position.copy(newCamPos);

            // Calcule lookAt interpolé
            const newLookAt = lerpVector3(new THREE.Vector3().copy(camera.position), targetLookAt, eased);
            camera.lookAt(newLookAt);

            // Met à jour matrice de projection
            camera.updateProjectionMatrix();

            // Condition pour passer à l’étape suivante quand proche de la cible
            // Par exemple quand la distance entre caméra et cible est très petite
            /*      if (newCamPos.distanceTo(targetPosition) < 0.01) {
                      setStep(2);
                  }*/

        }
    });


    return <primitive object={obj}/>
}


export function SceneTestWithMyBox() {

    return <div className={"h-dvh bg-amber-200 touch-none"}>
        <Leva/>
        <Canvas>
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport/>
            </GizmoHelper>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[10, 10, 5]} intensity={1}/>

            <Scene/>
        </Canvas>
    </div>

}

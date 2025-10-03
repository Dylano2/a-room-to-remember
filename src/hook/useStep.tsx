import type {SceneState} from "../types/type.ts";
import {useState} from "react";

export const useStep = () => {
    const [step, setStep] = useState<number>(0)
    const step0: SceneState = {cameraState: {lookAt: {x: 0.8, y: 0.4, z: 0}, position: {x: 2.3, y: 0.5, z: -2.9}}}
    const step1: SceneState = {
        cameraState: {lookAt: {x: 0.6, y: 0.4, z: 0}, position: {x: 3, y: 1.7, z: -0.6}},
        boiteState: {position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0, z: 0}},
    }
    const step2: SceneState = {
        cameraState: {lookAt: {x: 0.6, y: 0.4, z: 0}, position: {x: 1.8, y: 1.8, z: 0.1}},
        boiteState: {position: {x: 0.4, y: 0.4, z: 0}, rotation: {x: 0, y: 0, z: 0.2}},
    }

    const step3: SceneState = {
        cameraState: {
            ...step2.cameraState,
            position: {x: 1.80, y: 1.39, z: 0},
            lookAt: {
                ...step2.cameraState.lookAt,
                x: step2.cameraState.lookAt.x - 1,
                y: step2.cameraState.lookAt.y - 0.5,
                z: step2.cameraState.lookAt.z + 0.3
            }
        },
        carteState: {
            position: {x: 0.27, y: 0.68, z: 0},
            scale: {x: 1, y: 1, z: 1}, // valeur par défaut
        },
        boiteState: {
            ...step2.boiteState,
            position: {
                y: step2.boiteState?.position.y || 0,
                z: step2.boiteState?.position.z || 0,
                x: (step2.boiteState?.position.x || 0) - 0.05
            }
        }
    }
    /*
        const step4: SceneState = {
            cameraState: {
                position: {x: 0, y: 0, z: 3}, // centrée face à la carte
                lookAt: {x: 0, y: 0, z: 0},
            }, boiteState: step3.boiteState
            ,
            carteState: {position: {x: 0, y: 0, z: 0}, scale: {x: 3, y: 3, z: 3}}, // grossissement progressif
        };*/
    const steps = [step0, step1, step2, step3];

    return {step, setStep, steps}
}
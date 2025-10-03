export type CameraState = {
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
    fov?: number
}

export type ObjetState = {
    position: {
        x: number,
        y: number,
        z: number,
    }
}

export type BoiteState = {
    rotation?: {
        x: number,
        y: number,
        z: number,
    }
} & ObjetState

export type SceneState = {
    cameraState: CameraState;
    carteState?: {
        scale?: {
            x: number,
            y: number,
            z: number,
        }
    } & ObjetState,
    boiteState?: BoiteState,
    parfumsState?: ObjetState
}

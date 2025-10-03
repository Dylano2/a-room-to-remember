import {useEffect, useRef} from "react";
import * as THREE from "three";
import {useLoader} from "@react-three/fiber";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {useTexture} from "@react-three/drei";


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

export function useScene() {

    const obj = useLoader(OBJLoader, '/PARFUM SCENE OBJ/PARFUM_SCENE_v01.obj')
    const sceneRef = useRef<THREE.Mesh[]>([]);
    const carteRef = useRef<THREE.Mesh>(null!);
    const boiteRef = useRef<THREE.Mesh[]>([]);
    const parfumsRef = useRef<THREE.Mesh[]>([]);

    const textureRoom2Remember = useTexture('/img/room2remeber_card.png')
    useEffect(() => {
        const childToNotDisplay = ['plane.018', 'plane.020']

        obj.traverse(child => {
            if (child instanceof THREE.Mesh) {
                if (childToNotDisplay.includes(child.name.toLowerCase())) {
                    child.visible = false;
                } else if (PARFUMS_OBJ.includes(child.name.toLowerCase())) {
                    if (child.isMesh && child.material && child.material.color) {
                        /*
                                                child.material.color.set('red');
                        */
                        parfumsRef.current.push(child)

                    }
                } else if (BOITE_OBJ.includes(child.name.toLowerCase())) {
                    if (child.isMesh && child.material && child.material.color) {
                        child.material.color.set('green');
                        boiteRef.current.push(child)


                    }
                } else if (CARTE.includes(child.name.toLowerCase())) {
                    if (child.isMesh && child.material && child.material.color) {

                        carteRef.current = child;
                        child.material.map = textureRoom2Remember;
                        child.material.needsUpdate = true;

                    }
                } else {
                    sceneRef.current.push(child)
                }
            }
        });
    }, [obj, textureRoom2Remember]);

    return {obj, sceneRef, carteRef, boiteRef, parfumsRef}
}
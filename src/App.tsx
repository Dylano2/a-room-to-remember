import {SceneTestWithMyBox} from "./SceneTestWithMyBox.tsx";
import {useStep} from "./hook/useStep.tsx";
import useCumulativeScrollProgress from "./hook/useCumulativeScrollProgress.tsx";
import {MainView} from "./components/views/MainView.tsx";
import {useEffect, useState} from "react";
import {MAX_STEPS} from "./data/constantes.ts";


function App() {
    const {steps, setStep} = useStep()
    const progress = useCumulativeScrollProgress()
    const [isInFinalZone, setIsInFinalZone] = useState(false);

    useEffect(() => {
        if (progress >= MAX_STEPS + 0.5 && !isInFinalZone) {
            setIsInFinalZone(true);
        }
        if (isInFinalZone && progress <= MAX_STEPS - 0.5) {
            setIsInFinalZone(false);
        }
    }, [isInFinalZone, progress]);

    return (<>
            <div
                className="fixed inset-0 bg-[#e5dccd] z-50 flex flex-col items-center justify-center transition-opacity duration-1000"
                style={{
                    opacity: isInFinalZone ? 1 : 0,
                    pointerEvents: isInFinalZone ? 'auto' : 'none',

                }}>
                <div className="w-full h-full overflow-y-auto p-4 box-border">
                    <MainView/>
                </div>
            </div>

            <div className="relative min-h-screen transition-opacity duration-500" style={{
                opacity: isInFinalZone ? 0 : 1
            }}>
                <SceneTestWithMyBox steps={steps} setStep={setStep} progress={progress}/>
            </div>
        </>
    )
}

export default App

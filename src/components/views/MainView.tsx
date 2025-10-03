import {HeroSection} from "../sections/HeroSection.tsx";
import {WhatSection} from "../sections/WhatSection.tsx";
import {WhySection} from "../sections/WhySection.tsx";
import {ContactSection} from "../sections/ContactSection.tsx";

export function MainView() {
    return <>
        <HeroSection/>
        <WhatSection/>
        <WhySection/>
        <ContactSection/>
    </>;
}

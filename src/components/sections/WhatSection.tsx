import content from "../../data/content.json"
import {motion, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";


export function WhatSection() {
    const ref = useRef<HTMLElement>(null)
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])

    return (
        <section ref={ref}
                 className="min-h-screen  flex items-start justify-center px-6 md:px-12 lg:px-20 bg-muted/30">
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div style={{y: imageY}}
                            className="h-fit relative w-full overflow-hidden rounded-lg">
                    <img
                        src={content.what.image.src || "/placeholder.svg"}
                        alt={content.what.image.alt}
                        className=" aspect-3/2  object-cover"
                    />
                </motion.div>

                <motion.div style={{y: textY}} className="mt-0 md:mt-96">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-balance">{content.what.title}</h2>
                    <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {content.what.paragraphs.map((paragraph, index) => (
                            <p key={index}
                               className={index === content.what.paragraphs.length - 1 ? "text-accent font-medium" : ""}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

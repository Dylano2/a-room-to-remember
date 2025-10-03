import content from "../../data/content.json"
import {motion, useScroll, useTransform} from "framer-motion";
import {useRef, useState} from "react";
import {Award, Heart, Sparkles} from "lucide-react"


const iconMap = {
    sparkles: Sparkles,
    award: Award,
    heart: Heart,
}

export function WhySection() {
    const [propalChoice, setPropalChoice] = useState(0)
    const ref = useRef<HTMLElement>(null)
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])
    const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])

    const propal = [{
        elem: <section ref={ref}
                       className="min-h-screen mt-20 flex items-start justify-center px-6 md:px-12 lg:px-20 bg-muted/30">
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">


                <motion.div style={{y: headerY}} className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-balance">{content.why.title}</h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
                        {content.why.subtitle}
                    </p>
                </motion.div>
                <motion.div style={{y: imageY}}
                            className="h-fit relative w-full overflow-hidden rounded-lg mt-0 md:mt-96">
                    <img
                        src={content.why.image.src || "/placeholder.svg"}
                        alt={content.why.image.alt}
                        className=" aspect-3/2  object-cover scale-x-[-1]"
                    />
                </motion.div>
            </div>
        </section>
    }, {
        elem: <section ref={ref}
                       className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 bg-background">
            <div className="max-w-7xl w-full space-y-16">
                <motion.div style={{y: headerY}} className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-balance">{content.why.title}</h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
                        {content.why.subtitle}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {content.why.reasons.map((reason, index) => {
                        const Icon = iconMap[reason.icon as keyof typeof iconMap]
                        return (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                                viewport={{once: true, margin: "-100px"}}
                                className="space-y-4 p-8 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                                <div
                                    className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                                    <Icon className="w-7 h-7 text-accent"/>
                                </div>
                                <h3 className="text-2xl font-serif">{reason.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    }


    ]


    return (<>
            <div className={"flex gap-2 bg-pineCone-300 rounded w-fit overflow-hidden"}>
                <button onClick={() => setPropalChoice(0)}
                        className={"p-5 hover:bg-pineCone-600 hover:cursor-pointer"}>Propal1
                </button>
                <button onClick={() => setPropalChoice(1)}
                        className={"p-5 hover:bg-pineCone-600 hover:cursor-pointer"}>Propal2
                </button>
            </div>
            {propal[propalChoice].elem}</>
    )
}

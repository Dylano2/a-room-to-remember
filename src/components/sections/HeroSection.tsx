import content from "../../data/content.json"

export function HeroSection() {
    return (
        <section
            className="min-h-screen snap-start flex items-center justify-center px-6 md:px-12 bg-background">
            <div className="max-w-5xl w-full text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl  text-pineCone-900 tracking-tight">
                    {content.hero.title}

                </h1>
                <h2 className="text-2xl md:text-4xl lg:text-5xl  text-pineCone-700 tracking-tight">{content.hero.highlight}
                </h2>
            </div>
        </section>
    )
}

import content from "../../data/content.json"


export function ContactSection() {

    return (
        <section
            className="min-h-screen flex flex-col items-center justify-between px-6 md:px-12 lg:px-20 bg-muted/30">
            <div className={"flex flex-col justify-center items-center h-max  flex-1"}>
                <h2 className={"text-4xl md:text-5xl lg:text-6xl font-serif text-balance"}>{content.contact.title}</h2>

                <div className={"pt-20 antialiased text-xl tracking-wide"}>
                    <div>{content.contact.lovember} - {content.contact.fullName}</div>
                    <div>{content.contact.mail}</div>
                </div>
            </div>
            <footer
                className=" w-full text-center text-sm text-muted-foreground pt-8 border-t border-border tracking-wider font-light">
                <p>{content.contact.footer}</p>
            </footer>
        </section>
    )
}

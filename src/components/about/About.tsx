import useMarkdown from "../../hooks/useMarkdown"
import Card from "../card/Card"
import Morph from "../morph/Morph"
import classes from "./About.module.css"

type HeroProps = {
    className?: string
}

export const About = ({ className = "" }: HeroProps) => {
    const markdown = useMarkdown(
        "https://raw.githubusercontent.com/Passeriform/Passeriform/refs/heads/main/README.md",
    )

    return (
        <div className={`${classes.about} ${className}`}>
            <section>
                <Card>
                    <Morph on="hover" duration={1000} strength={1}>
                        <h1 className={classes.nameCardHeading}>Utkarsh Bhardwaj</h1>
                        <h1 className={classes.nameCardHeading}>Passeriform</h1>
                    </Morph>
                    {markdown?.subtitle}
                </Card>
            </section>

            {[markdown?.introduction, markdown?.experience, markdown?.cta, markdown?.stats].map(
                (node) => (
                    <section>
                        <Card>{node}</Card>
                    </section>
                ),
            )}
        </div>
    )
}

export default About

import { useState } from "react"
import "./App.css"
import Hero from "./components/hero/Hero"
import Social from "./components/social/Social"
import Card from "./components/card/Card"
import Morph from "./components/morph/Morph"
import useMarkdown from "./hooks/useMarkdown"

const App = () => {
    const [splash, setSplash] = useState(true)
    const markdown = useMarkdown<["section"]>("https://raw.githubusercontent.com/Passeriform/Passeriform/refs/heads/main/README.md")
    const [subtitle,,, introduction, experience, cta,,,stats] = markdown || ["", "", "", "", "", "", "", "", ""]

    return (
        <main>
            <section className="logo">
                <Hero expanded={splash} />
            </section>

            <div className="about">
                <section>
                    <Card>
                        <Morph on="hover" duration={1000} strength={1}>
                            <h1 className="nameCardText">Utkarsh Bhardwaj</h1>
                            <h1 className="nameCardText">Passeriform</h1>
                        </Morph>
                        {subtitle}
                    </Card>
                </section>

                {[introduction, experience, cta, stats].map((node) => <section>
                    <Card>
                        {node}
                    </Card>
                </section>)}
            </div>

            <Social />
        </main>
    )
}

export default App

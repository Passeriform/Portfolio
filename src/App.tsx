import About from "./components/about/About"
import Hero from "./components/hero/Hero"
import Social from "./components/social/Social"
import classes from "./App.module.css"

const App = () => (
    <main className={classes.main}>
        <Hero className={classes.hero} />
        <About className={classes.about} />
        <Social className={classes.social} />
    </main>
)

export default App

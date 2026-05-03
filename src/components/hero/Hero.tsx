import BirdIcon from "../../assets/bird.svg?react"
import { Halo } from "../halo/Halo"
import { randomHalo } from "./randomHalo"
import classes from "./Hero.module.css"

type HeroProps = {
    className?: string
}

export const Hero = ({ className = "" }: HeroProps) => (
    <div className={className}>
        <Halo generator={randomHalo} bite={4} padding={1} rotationRange={Math.PI / 2}>
            <BirdIcon className={classes.logo} />
        </Halo>
    </div>
)

export default Hero

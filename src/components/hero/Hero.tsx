import BirdIcon from "../../assets/bird.svg?react"
import { Halo } from "../halo/Halo"
import { randomHalo } from "./randomHalo"
import "./Hero.css"

export type HeroProps = {
    expanded: boolean
}

export const Hero = ({ expanded }: HeroProps) => {
    return <Halo generator={randomHalo} bite={4} padding={1} rotationRange={Math.PI / 2}>
        <BirdIcon className={`logo ${expanded ? "expanded" : ""}`} /> 
    </Halo>
}

export default Hero
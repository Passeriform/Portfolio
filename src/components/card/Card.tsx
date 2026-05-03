import { useEffect, useLayoutEffect, useRef, useState, type PropsWithChildren } from "react"
import classes from "./Card.module.css"

type CardProps = {
    borderSize?: number
}

export const Card = ({ borderSize = 1, children }: PropsWithChildren<CardProps>) => {
    const cardContainer = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState<[number, number]>([0, 0])

    useLayoutEffect(() => {
        const element = cardContainer.current

        if (!element) {
            return
        }

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect
                setDimensions([width, height])
            }
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            cardContainer.current?.classList.add(classes.show)
        }, 2000)
        cardContainer.current?.style.setProperty("--border-size", `${borderSize}px`)
    }, [])

    const [width, height] = dimensions.map(Math.floor)

    return (
        <div className={classes.cardContainer} ref={cardContainer}>
            <div className={classes.contentContainer}>
                {width > 0 && (
                    <svg viewBox={`0 0 ${width} ${height}`} className="hidden">
                        <g fill="none" stroke="currentColor" strokeWidth={borderSize}>
                            <path d={`M0.5 ${height - 20} L0.5 0.5 L${width - 20} 0.5`} />
                            <path
                                d={`M${width - 1} 20 L${width - 1} ${height - 1} L20 ${height - 1}`}
                            />
                        </g>
                    </svg>
                )}
                {children}
            </div>
        </div>
    )
}

export default Card

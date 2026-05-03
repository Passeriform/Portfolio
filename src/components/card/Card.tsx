import { type PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from "react"
import classes from "./Card.module.css"

type CardProps = {
    borderSize?: number
    clipAt?: number
}

export const Card = ({ borderSize = 1, clipAt = 20, children }: PropsWithChildren<CardProps>) => {
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

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            cardContainer.current?.classList.add(classes.show)
        }, 2000)
        cardContainer.current?.style.setProperty("--border-size", `${borderSize}px`)
    }, [])

    const [width, height] = dimensions.map((coordinate) => Math.floor(coordinate))

    return (
        <div className={classes.cardContainer} ref={cardContainer}>
            <div className={classes.contentContainer}>
                {width > 0 && (
                    <svg viewBox={`0 0 ${width} ${height}`} className="hidden">
                        <g fill="none" stroke="currentColor" strokeWidth={borderSize}>
                            <path
                                d={`M${borderSize / 2} ${height - clipAt} L${borderSize / 2} ${borderSize / 2} L${width - clipAt} ${borderSize / 2}`}
                            />
                            <path
                                d={`M${width - borderSize} ${clipAt} L${width - borderSize} ${height - borderSize} L${clipAt} ${height - borderSize}`}
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

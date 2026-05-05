import { type PropsWithChildren, useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import classes from "./Card.module.css"

type CardProps = {
    accentSize?: number
    accentColor?: `#${string}`
    borderSize?: number
    borderColor?: `#${string}`
    clipAt?: number
    revealAfter?: number
}

export const Card = ({
    accentSize = 2,
    borderSize = 1,
    borderColor = "#737373",
    accentColor = "#dedede",
    clipAt = 20,
    revealAfter = 2000,
    children
}: PropsWithChildren<CardProps>) => {
    const content = useRef<HTMLDivElement>(null)
    const decoration = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState<[number, number]>([0, 0])
    const [show, setShow] = useState(false)
    const maskId = useId()

    useEffect(() => {
        content.current?.style.setProperty("--mask-url", `url(#${maskId})`)
    }, [maskId])

    useLayoutEffect(() => {
        const element = decoration.current

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
            setShow(true)
        }, revealAfter)
        decoration.current?.style.setProperty("--clip-at", `${clipAt}`)
    }, [])

    if (accentSize < borderSize) {
        throw Error("accentSize must be larger than borderSize")
    }

    const [width, height] = dimensions

    return (
        <div className={classes.container}>
            <div className={classes.content} ref={content}>
                {children}
            </div>
            <div className={`${classes.decoration} ${show ? classes.show : ""}`} ref={decoration}>
                <svg viewBox={`${width + accentSize < clipAt ? width - clipAt : -accentSize} ${height + accentSize < clipAt ? height - clipAt : -accentSize} ${Math.max(width + 2 * accentSize, 2 * clipAt)} ${Math.max(height + 2 * accentSize, 2 * clipAt)}`} vectorEffect="non-scaling-stroke">
                    <defs>
                        <mask id={maskId} maskUnits="userSpaceOnUse">
                            <rect x={((content.current?.clientWidth ?? 0) - width) / 2} y={((content.current?.clientHeight ?? 0) - height) / 2} width={width} height={height} fill="white" />
                        </mask>
                    </defs>
                    {(width >= clipAt && height >= clipAt) && <g fill="none" stroke={`${borderColor}`} strokeWidth={borderSize}>
                        <path
                            d={`M0 ${height - clipAt} L0 0 L${width - clipAt} 0`}
                        />
                        <path
                            d={`M${width} ${clipAt} L${width} ${height} L${clipAt} ${height}`}
                        />
                    </g>}
                    <g fill="none" stroke={`${accentColor}`} strokeWidth={accentSize}>
                        <path
                            d={`M0 ${clipAt} L0 0 L${clipAt} 0`}
                        />
                        <path
                            d={`M${width} ${height - clipAt} L${width} ${height} L${width - clipAt} ${height}`}
                        />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default Card

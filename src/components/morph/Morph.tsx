import {
    Children,
    type PropsWithChildren,
    type ReactElement,
    type Ref,
    cloneElement,
    isValidElement,
    useEffect,
    useRef,
    useState,
} from "react"
import FilterSVG from "./morph.svg?react"
import classes from "./Morph.module.css"

type MorphProps = (
    | {
          on: "hover"
      }
    | {
          on: "interval"
          after: number
      }
) & { duration: number; strength: number | number[] }

export const Morph = ({ children, ...schedule }: PropsWithChildren<MorphProps>) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const childrenRefs = useRef<(HTMLElement | null)[]>([])

    useEffect(() => {
        if (schedule.on !== "interval") {
            return
        }

        /* oxlint-disable eslint/init-declarations */
        let startTimestamp: number
        let requestId: number
        /* oxlint-enable eslint/init-declarations */

        const intervalHandler = (now: number) => {
            if (!startTimestamp) {
                startTimestamp = now
            }
            if (now - startTimestamp >= schedule.after) {
                setActiveIndex((currentIndex) => (currentIndex + 1) % childrenRefs.current.length)
                startTimestamp = 0
            }
            requestId = requestAnimationFrame(intervalHandler)
        }

        requestId = requestAnimationFrame(intervalHandler)

        return () => {
            cancelAnimationFrame(requestId)
        }
    }, [Object.values(schedule)])

    useEffect(() => {
        containerRef.current?.style.setProperty("--duration", `${schedule.duration}`)
    }, [schedule.duration])

    useEffect(() => {
        containerRef.current?.style.setProperty(
            "--strength",
            `${
                typeof schedule.strength === "number"
                    ? schedule.strength
                    : schedule.strength[
                          (activeIndex + childrenRefs.current.length - 1) %
                              childrenRefs.current.length
                      ]
            }`,
        )
    }, [schedule.strength, activeIndex])

    return (
        <div
            className={classes.morphContainer}
            onMouseEnter={() => {
                if (schedule.on === "hover") {
                    setActiveIndex(1)
                }
            }}
            onMouseOut={() => {
                if (schedule.on === "hover") {
                    setActiveIndex(0)
                }
            }}
            ref={containerRef}
        >
            <>
                {Children.map(children, (child, index) => {
                    if (!isValidElement(child)) {
                        return child
                    }

                    /* oxlint-disable-next-line typescript/no-unsafe-type-assertion */
                    const element = child as ReactElement<{
                        className?: string
                        ref?: Ref<HTMLElement>
                    }>

                    return cloneElement(element, {
                        className:
                            `${element.props.className ?? ""} ${index === activeIndex ? classes.active : ""} ${classes.morphText}`.trim(),
                        ref: (node) => {
                            childrenRefs.current[index] = node

                            const originalRef = element.props.ref

                            if (!originalRef) {
                                return
                            }

                            if (typeof originalRef === "function") {
                                originalRef(node)
                            } else if ("current" in originalRef) {
                                originalRef.current = node
                            }
                        },
                    })
                })}
            </>
            <FilterSVG className="hidden" />
        </div>
    )
}

export default Morph

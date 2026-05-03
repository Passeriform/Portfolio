import { useEffect, useRef, type PropsWithChildren } from "react"
import type { GeneratorOptions, Point } from "./types"
import { toClipPath } from "./utility"
import classes from "./Halo.module.css"

type HaloProps = PropsWithChildren<
    {
        generator:
            | [Point[], Point[]]
            | ((rect: DOMRect, options: GeneratorOptions) => [Point[], Point[]])
        regenerateAfter?: number
        transitionDuration?: number
        padding?: number
    } & Partial<GeneratorOptions>
>

export const Halo = ({
    generator,
    bite = 0,
    padding = 0,
    rotationRange = 0,
    regenerateAfter = typeof generator === "function" ? 2000 : undefined,
    transitionDuration = 1000,
    children,
}: HaloProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        containerRef.current.style.setProperty("--transition-duration", `${transitionDuration}ms`)
    })

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        const update = () => {
            const rect = containerRef.current!.getBoundingClientRect()

            const [baseLayer, accentLayer] =
                typeof generator === "function"
                    ? generator(rect, { bite, rotationRange })
                    : generator

            containerRef.current!.style.setProperty("--halo-padding", `${padding}`)
            containerRef.current!.style.setProperty("--base-clip-path", toClipPath(baseLayer))
            containerRef.current!.style.setProperty("--accent-clip-path", toClipPath(accentLayer))
        }

        new ResizeObserver(update).observe(containerRef.current)

        if (regenerateAfter) {
            const id = setInterval(update, regenerateAfter)
            return () => clearInterval(id)
        }
    }, [generator, regenerateAfter])

    return (
        <div className={classes.haloContainer} ref={containerRef}>
            {children}
        </div>
    )
}

export default Halo

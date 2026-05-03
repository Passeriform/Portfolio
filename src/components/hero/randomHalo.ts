import type { GeneratorOptions, Point } from "../halo/types"
import {
    percentToPx,
    pxToPercent,
    rayToPolygonDistance,
    remToPx,
    sampleAngles,
} from "../halo/utility"

export const randomHalo = (
    { width, height }: DOMRect,
    { bite, rotationRange }: GeneratorOptions,
) => {
    const internal = () => {
        const bitePx = remToPx(bite)

        const base = (
            [
                [0, 0],
                [100, 0],
                [100, 100],
                [0, 100],
            ] as Point[]
        ).map((point) => percentToPx(point, width, height))

        const center: Point = [width / 2, height / 2]

        const offset = rotationRange / 2 + Math.random() * rotationRange

        const angles = sampleAngles(base.length + 2, offset)

        const result: Point[] = []

        for (const theta of angles) {
            const dir: Point = [Math.cos(theta), Math.sin(theta)]

            const dist = rayToPolygonDistance(center, dir, base)

            if (!Number.isFinite(dist)) {
                continue
            }

            const shrink = Math.random() < 0.5 ? 1 : 1 - Math.random() * (bitePx / dist)

            const finalDist = dist * shrink

            result.push([center[0] + dir[0] * finalDist, center[1] + dir[1] * finalDist])
        }

        return result.map((point) => pxToPercent(point, width, height))
    }

    return [internal(), internal()] as [Point[], Point[]]
}

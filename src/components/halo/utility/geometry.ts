import type { Point } from "../types"

export const raySegmentIntersection = (
    origin: Point,
    dir: Point,
    a: Point,
    b: Point,
): number | null => {
    const v1: Point = [origin[0] - a[0], origin[1] - a[1]]
    const v2: Point = [b[0] - a[0], b[1] - a[1]]
    const v3: Point = [-dir[1], dir[0]]

    const dot = v2[0] * v3[0] + v2[1] * v3[1]
    if (Math.abs(dot) < 1e-6) return null

    const t1 = (v2[0] * v1[1] - v2[1] * v1[0]) / dot
    const t2 = (v1[0] * v3[0] + v1[1] * v3[1]) / dot

    if (t1 >= 0 && t2 >= 0 && t2 <= 1) return t1
    return null
}

export const rayToPolygonDistance = (origin: Point, dir: Point, polygon: Point[]): number => {
    let min = Infinity

    for (let vertexIdx = 0; vertexIdx < polygon.length; vertexIdx++) {
        const a = polygon[vertexIdx]
        const b = polygon[(vertexIdx + 1) % polygon.length]

        const t = raySegmentIntersection(origin, dir, a, b)
        if (t !== null && t < min) min = t
    }

    return min
}

export const sampleAngles = (count: number, offset: number = 0): number[] => {
    const angles: number[] = []

    let current = 0
    const full = Math.PI * 2

    for (let i = 0; i < count; i++) {
        const remaining = full - current
        const remainingSteps = count - i

        const ideal = remaining / remainingSteps
        const jitter = ideal * 0.4 * (Math.random() - 0.5)
        const step = ideal + jitter

        current += step
        angles.push(current + offset)
    }

    return angles
}

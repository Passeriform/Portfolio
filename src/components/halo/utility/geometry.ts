import type { Point } from "../types"

/* oxlint-disable eslint/no-magic-numbers */

export const raySegmentIntersection = (origin: Point, dir: Point, aPoint: Point, bPoint: Point) => {
    const v1: Point = [origin[0] - aPoint[0], origin[1] - aPoint[1]]
    const v2: Point = [bPoint[0] - aPoint[0], bPoint[1] - aPoint[1]]
    const v3: Point = [-dir[1], dir[0]]

    const dot = v2[0] * v3[0] + v2[1] * v3[1]
    if (Math.abs(dot) < 1e-6) {
        return
    }

    const t1 = (v2[0] * v1[1] - v2[1] * v1[0]) / dot
    const t2 = (v1[0] * v3[0] + v1[1] * v3[1]) / dot

    if (t1 >= 0 && t2 >= 0 && t2 <= 1) {
        return t1
    }
}

export const rayToPolygonDistance = (origin: Point, dir: Point, polygon: Point[]) => {
    let min = Infinity

    for (let vertexIdx = 0; vertexIdx < polygon.length; vertexIdx++) {
        const aPoint = polygon[vertexIdx]
        const bPoint = polygon[(vertexIdx + 1) % polygon.length]

        const intersectionDistance = raySegmentIntersection(origin, dir, aPoint, bPoint)
        if (intersectionDistance !== undefined && intersectionDistance < min) {
            min = intersectionDistance
        }
    }

    return min
}

export const sampleAngles = (count: number, offset = 0) => {
    const angles: number[] = []

    let current = 0
    const full = Math.PI * 2

    for (let iter = 0; iter < count; iter++) {
        const remaining = full - current
        const remainingSteps = count - iter

        const ideal = remaining / remainingSteps
        const jitter = ideal * 0.4 * (Math.random() - 0.5)
        const step = ideal + jitter

        current += step
        angles.push(current + offset)
    }

    return angles
}

import type { Point } from "../types"

export const toClipPath = (points: Point[]) =>
    `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(",")})`

export * from "./geometry"
export * from "./units"

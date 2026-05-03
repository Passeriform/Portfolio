import type { Point } from "../types"

export const remToPx = (rem: number) =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize)

export const percentToPx = ([x, y]: Point, w: number, h: number): Point => [
    (x / 100) * w,
    (y / 100) * h,
]

export const pxToPercent = ([x, y]: Point, w: number, h: number): Point => [
    (x / w) * 100,
    (y / h) * 100,
]
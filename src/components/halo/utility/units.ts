import type { Point } from "../types"

export const remToPx = (rem: number) =>
    rem * Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

export const percentToPx = ([x, y]: Point, width: number, height: number) =>
    [(x / 100) * width, (y / 100) * height] as Point

export const pxToPercent = ([x, y]: Point, width: number, height: number) =>
    [(x / width) * 100, (y / height) * 100] as Point

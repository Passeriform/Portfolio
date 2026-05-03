import type { Point } from "./types"

/* oxlint-disable eslint/no-magic-numbers */
export const SOCIAL = {
    RIGHT: [
        [
            [60, 0],
            [0, 30],
            [0, 80],
            [100, 95],
        ],
        [
            [100, 5],
            [0, 25],
            [0, 70],
            [80, 100],
        ],
    ] as [Point[], Point[]],
} as const

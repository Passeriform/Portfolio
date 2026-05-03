import { defineConfig } from "oxfmt"

export default defineConfig({
    semi: false,
    jsdoc: true,
    sortImports: {
        newlinesBetween: false,
    },
    sortTailwindcss: true,
    tabWidth: 4,
})

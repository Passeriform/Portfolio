import { defineConfig } from "oxfmt"

export default defineConfig({
    jsdoc: true,
    semi: false,
    sortImports: {
        newlinesBetween: false,
    },
    sortTailwindcss: true,
    tabWidth: 4,
})

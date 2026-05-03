import { compiler } from "markdown-to-jsx/react"
import { type ReactNode, useEffect, useState } from "react"

export const useMarkdown = (url: string) => {
    const [parsed, setParsed] = useState<
        Record<"cta" | "experience" | "introduction" | "stats" | "subtitle", ReactNode> | undefined
    >()

    useEffect(() => {
        const parse = async () => {
            const response = await fetch(url)
            const raw = await response.text()
            /* oxlint-disable-next-line typescript/no-unsafe-type-assertion, unicorn/no-null */
            const tree = compiler(raw, { wrapper: null }) as Iterable<ReactNode>
            /* oxlint-disable-next-line unicorn/no-unreadable-array-destructuring */
            const [subtitle, , , introduction, experience, cta, , , stats] = tree
            setParsed({ cta, experience, introduction, stats, subtitle })
        }

        /* oxlint-disable-next-line typescript/no-floating-promises */
        parse()
    }, [])

    return parsed
}

export default useMarkdown

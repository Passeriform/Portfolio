import { compiler } from "markdown-to-jsx/react"
import { useEffect, useState, type ReactNode } from "react"

export const useMarkdown = (url: string) => {
    const [parsed, setParsed] = useState<
        Record<"subtitle" | "introduction" | "experience" | "cta" | "stats", ReactNode> | undefined
    >(undefined)

    useEffect(() => {
        const parse = async () => {
            const response = await fetch(url)
            const raw = await response.text()
            const tree = compiler(raw, { wrapper: null }) as Iterable<ReactNode>
            const [subtitle, , , introduction, experience, cta, , , stats] = tree
            setParsed({ subtitle, introduction, experience, cta, stats })
        }
        parse()
    }, [])

    return parsed
}

export default useMarkdown

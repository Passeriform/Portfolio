import { compiler } from "markdown-to-jsx/react"
import { useEffect, useState, type ReactNode } from "react"

export const useMarkdown = <T extends ReactNode>(url: string) => {
    const [parsed, setParsed] = useState<T[] | undefined>(undefined)

    useEffect(() => {
        const parse = async () => {
            const response = await fetch(url)
            const raw = await response.text()
            const tree = compiler(raw, { wrapper: null })
            setParsed(tree as T[])
        }
        parse()
    }, [])

    return parsed
}

export default useMarkdown

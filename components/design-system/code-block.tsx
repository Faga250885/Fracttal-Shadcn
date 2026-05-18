"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { translations, type Lang } from "./i18n"

SyntaxHighlighter.registerLanguage("tsx", tsx)

interface CodeBlockProps {
  code: string
  lang: Lang
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const t = translations[lang]

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-800 text-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            TSX
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          {copied ? (
            <Check className="size-3.5 text-green-400" />
          ) : (
            <Copy className="size-3.5" />
          )}
          <span>{copied ? t.copied : t.copy}</span>
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language="tsx"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.25rem 1.5rem",
          borderRadius: 0,
          fontSize: "12.5px",
          lineHeight: "1.65",
          background: "#1e1e1e",
        }}
        codeTagProps={{ style: { fontFamily: "var(--font-mono)" } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

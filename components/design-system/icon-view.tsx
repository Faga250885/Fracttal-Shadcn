"use client"

import React, { useState, useMemo } from "react"
import { Search, X, Copy, Download, Check } from "lucide-react"
import { renderToStaticMarkup } from "react-dom/server"
import { ALL_ICONS, ICONS_BY_CATEGORY, getIconCategory, type IconComponent } from "./icon-categories"
import { translations, type Lang } from "./i18n"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface IconViewProps {
  lang: Lang
  selectedCategory: string | null
}

function downloadIconSVG(name: string, Icon: IconComponent) {
  const svg = renderToStaticMarkup(
    React.createElement(Icon as React.ComponentType<object>, { size: 24 })
  )
  const blob = new Blob([svg], { type: "image/svg+xml" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${name}.svg`
  a.click()
  URL.revokeObjectURL(url)
}

export function IconView({ lang, selectedCategory }: IconViewProps) {
  const [query, setQuery] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const t = translations[lang]

  const baseIcons = useMemo(
    () => (selectedCategory ? (ICONS_BY_CATEGORY[selectedCategory] ?? []) : ALL_ICONS),
    [selectedCategory]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, "")
    if (!q) return baseIcons
    return baseIcons.filter(([name]) => name.toLowerCase().includes(q))
  }, [baseIcons, query])

  function handleCopy(name: string) {
    navigator.clipboard
      .writeText(`import { ${name} } from "lucide-react"`)
      .catch(() => {})
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <main className="flex-1 min-w-0 flex flex-col border-x border-zinc-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-8 shrink-0 h-[74px] flex items-center justify-between border-b border-zinc-100">
        <div>
          <h1 className="text-base font-semibold text-zinc-800 leading-none">
            {t.icons}
          </h1>
          <p className="text-[13px] text-zinc-400 mt-0.5">
            {filtered.length === ALL_ICONS.length
              ? `${ALL_ICONS.length} icons`
              : `${filtered.length} of ${baseIcons.length}`}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchIcons}
            className={cn("pl-8", query && "pr-8")}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-md p-0.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-sm text-zinc-400">
            {t.noIconsFound} &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))" }}
          >
            {filtered.map(([name, Icon]) => {
              const isCopied = copied === name
              return (
                <div
                  key={name}
                  className={cn(
                    "group relative flex flex-col items-center gap-2 rounded-lg px-1 py-3 text-center",
                    "transition-colors duration-100 hover:bg-zinc-100",
                    isCopied && "bg-zinc-100"
                  )}
                >
                  <Icon
                    size={24}
                    className="text-zinc-500 group-hover:text-zinc-800 transition-colors duration-100"
                  />

                  {/* Bottom slot — fixed height so the tile never grows */}
                  <div className="relative h-4 w-full">
                    <span className="absolute inset-0 flex items-center justify-center truncate text-[10px] leading-tight text-zinc-400 transition-opacity duration-100 group-hover:opacity-0">
                      {name}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
                      <button
                        onClick={() => handleCopy(name)}
                        title="Copy import"
                        className="flex items-center justify-center rounded-md p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 transition-colors cursor-pointer"
                      >
                        {isCopied
                          ? <Check className="size-3.5 text-zinc-800" />
                          : <Copy className="size-3.5" />
                        }
                      </button>
                      <button
                        onClick={() => downloadIconSVG(name, Icon)}
                        title="Download SVG"
                        className="flex items-center justify-center rounded-md p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 transition-colors cursor-pointer"
                      >
                        <Download className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

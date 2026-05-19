"use client"

import { useState, useMemo } from "react"
import * as LucideIcons from "lucide-react"
import { Search, Check, X } from "lucide-react"
import { translations, type Lang } from "./i18n"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type IconComponent = React.ComponentType<{ size?: number; className?: string }>
type IconEntry = [string, IconComponent]

// Lucide exports forwardRef objects {$$typeof, render, displayName}, not plain functions.
// Filter: is a non-null object, has a "render" property, and does NOT end with "Icon" (avoids duplicates).
const ALL_ICONS: IconEntry[] = (
  Object.entries(LucideIcons) as [string, unknown][]
).filter(([name, val]) => {
  if (name.endsWith("Icon")) return false
  if (!val || typeof val !== "object") return false
  return Object.prototype.hasOwnProperty.call(val, "render")
}) as IconEntry[]

interface IconViewProps {
  lang: Lang
}

export function IconView({ lang }: IconViewProps) {
  const [query, setQuery] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const t = translations[lang]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, "")
    if (!q) return ALL_ICONS
    return ALL_ICONS.filter(([name]) => name.toLowerCase().includes(q))
  }, [query])

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
              : `${filtered.length} of ${ALL_ICONS.length}`}
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
                <button
                  key={name}
                  onClick={() => handleCopy(name)}
                  title={`${name} — click to copy import`}
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-lg px-1 py-3 text-center",
                    "cursor-pointer transition-colors duration-100",
                    "hover:bg-zinc-100 active:bg-zinc-200",
                    isCopied && "bg-zinc-100"
                  )}
                >
                  {isCopied ? (
                    <Check size={24} className="text-zinc-800" />
                  ) : (
                    <Icon size={24} className="text-zinc-500 group-hover:text-zinc-800 transition-colors duration-100" />
                  )}
                  <span className="w-full truncate text-[10px] leading-tight text-zinc-400 group-hover:text-zinc-600 transition-colors duration-100">
                    {name}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

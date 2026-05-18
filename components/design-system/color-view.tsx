"use client"

import { useState } from "react"
import { Sun, Moon, Check, Copy } from "lucide-react"
import { colorGroups } from "./colors"
import { translations, type Lang } from "./i18n"
import { cn } from "@/lib/utils"

interface ColorViewProps {
  lang: Lang
}

export function ColorView({ lang }: ColorViewProps) {
  const [mode, setMode] = useState<"light" | "dark">("light")
  const [copied, setCopied] = useState<string | null>(null)
  const t = translations[lang]
  const isDark = mode === "dark"

  function handleCopy(label: string) {
    navigator.clipboard.writeText(label).catch(() => {})
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <main className="flex-1 min-w-0 flex flex-col border-x border-zinc-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="p-4 shrink-0 h-[74px] flex flex-col justify-center border-b border-zinc-200">
        <h1 className="text-base font-semibold text-zinc-800 leading-none">
          {t.colors}
        </h1>
        <p className="text-[13px] text-zinc-400 mt-0.5">{t.colorsDescription}</p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">

        {/* Light / Dark toggle */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-zinc-700">
            {isDark ? t.darkMode : t.lightMode}
          </h2>
          <div className="flex items-center gap-0.5 rounded-lg p-0.5 bg-zinc-100">
            <button
              onClick={() => setMode("light")}
              title={t.lightMode}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all",
                !isDark
                  ? "bg-white text-amber-500 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700",
              )}
            >
              <Sun className="size-3.5" />
              {t.lightMode}
            </button>
            <button
              onClick={() => setMode("dark")}
              title={t.darkMode}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all",
                isDark
                  ? "bg-zinc-800 text-indigo-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700",
              )}
            >
              <Moon className="size-3.5" />
              {t.darkMode}
            </button>
          </div>
        </div>

        {/* Color groups grid */}
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
          {colorGroups.map((group) => (
            <div
              key={group.id}
              className={cn(
                "rounded-2xl p-4 border transition-colors duration-200",
                group.wide && "col-span-2 xl:col-span-2",
                isDark
                  ? "bg-zinc-900 border-zinc-800"
                  : "bg-white border-zinc-100 shadow-sm",
              )}
            >
              {/* Group name */}
              <p
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-wider mb-3",
                  isDark ? "text-zinc-400" : "text-zinc-500",
                )}
              >
                {group.name}
              </p>

              {/* Swatches */}
              <div className="flex flex-wrap gap-4">
                {group.swatches.map((swatch) => {
                  const ci = isDark ? swatch.dark : swatch.light
                  const isCopied = copied === ci.label
                  return (
                    <div key={swatch.name} className="flex flex-col gap-1.5">
                      {/* Color square */}
                      <button
                        onClick={() => handleCopy(ci.label)}
                        title={`Copiar ${ci.label}`}
                        className={cn(
                          "group relative w-[76px] h-[76px] rounded-2xl border transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400",
                          isDark ? "border-white/5" : "border-black/5",
                        )}
                        style={{
                          backgroundColor: ci.color,
                          backgroundImage:
                            ci.color.includes("rgba") || ci.color.includes("1A") || ci.color.includes("0A")
                              ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='4' height='4' fill='%23ccc'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ccc'/%3E%3C/svg%3E\")"
                              : undefined,
                          backgroundSize: ci.color.includes("rgba") ? "8px 8px" : undefined,
                        }}
                      >
                        {/* Overlay on copy */}
                        <span
                          className={cn(
                            "absolute inset-0 rounded-2xl flex items-center justify-center transition-opacity duration-150",
                            "bg-black/25",
                            isCopied ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                          )}
                        >
                          {isCopied ? (
                            <Check className="size-4 text-white drop-shadow" />
                          ) : (
                            <Copy className="size-3.5 text-white drop-shadow" />
                          )}
                        </span>
                      </button>

                      {/* Label */}
                      <p
                        className={cn(
                          "text-[11px] font-medium leading-tight max-w-[76px]",
                          isDark ? "text-zinc-200" : "text-zinc-700",
                        )}
                      >
                        {swatch.name}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] font-mono leading-none",
                          isDark ? "text-zinc-500" : "text-zinc-400",
                        )}
                      >
                        {ci.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

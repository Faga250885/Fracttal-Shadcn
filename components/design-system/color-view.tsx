"use client"

import { useState } from "react"
import { Check, Sun, Moon } from "lucide-react"
import { colorGroups } from "./colors"
import { translations, type Lang } from "./i18n"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

  const pageBg = isDark ? "bg-zinc-950" : "bg-white"
  const divider  = isDark ? "border-zinc-800" : "border-zinc-100"
  const groupLabel = isDark ? "text-zinc-600" : "text-zinc-300"
  const swatchName = isDark ? "text-zinc-300" : "text-zinc-600"
  const swatchHex  = isDark ? "text-zinc-600" : "text-zinc-400"

  return (
    <main
      className={cn(
        "flex-1 min-w-0 flex flex-col border-x border-zinc-200 overflow-hidden transition-colors duration-300",
        pageBg
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "px-8 shrink-0 h-[74px] flex items-center justify-between border-b",
          divider
        )}
      >
        <div>
          <h1
            className={cn(
              "text-base font-semibold leading-none",
              isDark ? "text-white" : "text-zinc-800"
            )}
          >
            {t.colors}
          </h1>
          <p className={cn("text-[12px] mt-0.5", swatchHex)}>
            {t.colorsDescription}
          </p>
        </div>

        {/* Toggle */}
        <Tabs value={mode} onValueChange={(v) => setMode(v as "light" | "dark")}>
          <TabsList className="h-7 p-0.5">
            <TabsTrigger value="light" className="h-6 w-7 px-0" aria-label={t.lightMode}><Sun className="size-3.5" /></TabsTrigger>
            <TabsTrigger value="dark" className="h-6 w-7 px-0" aria-label={t.darkMode}><Moon className="size-3.5" /></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {colorGroups.map((group, gi) => (
          <div
            key={group.id}
            className={cn(
              "px-8 py-6 flex gap-8",
              gi !== 0 && `border-t ${divider}`
            )}
          >
            {/* Group label — fixed left column */}
            <div className="w-32 shrink-0 pt-1">
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-widest",
                  groupLabel
                )}
              >
                {group.name}
              </span>
            </div>

            {/* Swatches */}
            <div className="flex flex-wrap gap-x-3 gap-y-5">
              {group.swatches.map((swatch) => {
                const ci = isDark ? swatch.dark : swatch.light
                const isCopied = copied === ci.label
                const isTransparent =
                  ci.color.startsWith("rgba") ||
                  ci.color.endsWith("1A") ||
                  ci.color.endsWith("0A") ||
                  ci.color.endsWith("1F")

                return (
                  <div key={swatch.name} className="flex flex-col gap-2">
                    {/* Chip */}
                    <button
                      onClick={() => handleCopy(ci.label)}
                      title={ci.label}
                      className={cn(
                        "group relative h-9 w-24 rounded-lg transition-all duration-150 cursor-pointer",
                        "hover:scale-[1.04] active:scale-[0.97]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                        isDark
                          ? "ring-offset-zinc-950 focus-visible:ring-zinc-500"
                          : "ring-offset-white focus-visible:ring-zinc-300"
                      )}
                      style={{
                        backgroundColor: ci.color,
                        ...(isTransparent
                          ? {
                              backgroundImage:
                                "linear-gradient(45deg,#d4d4d4 25%,transparent 25%),linear-gradient(-45deg,#d4d4d4 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#d4d4d4 75%),linear-gradient(-45deg,transparent 75%,#d4d4d4 75%)",
                              backgroundSize: "6px 6px",
                              backgroundPosition:
                                "0 0,0 3px,3px -3px,-3px 0px",
                            }
                          : {}),
                      }}
                    >
                      {/* Copy overlay */}
                      <span
                        className={cn(
                          "absolute inset-0 rounded-lg flex items-center justify-center transition-all duration-150",
                          "bg-black/20 backdrop-blur-[1px]",
                          isCopied
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        )}
                      >
                        <Check
                          className={cn(
                            "transition-all duration-150",
                            isCopied ? "size-3.5 text-white" : "size-3 text-white/80"
                          )}
                        />
                      </span>
                    </button>

                    {/* Name + hex */}
                    <div className="w-24">
                      <p
                        className={cn(
                          "text-[11px] font-medium leading-tight truncate",
                          swatchName
                        )}
                      >
                        {swatch.name}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] font-mono mt-0.5 truncate",
                          swatchHex
                        )}
                      >
                        {ci.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

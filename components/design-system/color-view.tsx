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

  function handleCopy(variable: string) {
    navigator.clipboard.writeText(`var(${variable})`).catch(() => {})
    setCopied(variable)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <main
      className={cn(
        "flex-1 min-w-0 flex flex-col border-x border-zinc-200 overflow-hidden transition-colors duration-300",
        isDark ? "bg-zinc-950 dark" : "bg-white"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "px-8 shrink-0 h-[74px] flex items-center justify-between border-b",
          isDark ? "border-zinc-800" : "border-zinc-100"
        )}
      >
        <div>
          <h1 className={cn("text-base font-semibold leading-none", isDark ? "text-white" : "text-zinc-800")}>
            {t.colors}
          </h1>
          <p className={cn("text-[12px] mt-0.5", isDark ? "text-zinc-600" : "text-zinc-400")}>
            {t.colorsDescription}
          </p>
        </div>

        <Tabs value={mode} onValueChange={(v) => setMode(v as "light" | "dark")}>
          <TabsList className="h-7 p-0.5">
            <TabsTrigger value="light" className="h-6 w-7 px-0" aria-label={t.lightMode}>
              <Sun className="size-3.5" />
            </TabsTrigger>
            <TabsTrigger value="dark" className="h-6 w-7 px-0" aria-label={t.darkMode}>
              <Moon className="size-3.5" />
            </TabsTrigger>
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
              gi !== 0 && `border-t ${isDark ? "border-zinc-800" : "border-zinc-100"}`
            )}
          >
            {/* Group label */}
            <div className="w-32 shrink-0 pt-1">
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-widest",
                  isDark ? "text-zinc-600" : "text-zinc-300"
                )}
              >
                {group.name}
              </span>
            </div>

            {/* Swatches */}
            <div className="flex flex-wrap gap-x-3 gap-y-5">
              {group.swatches.map((swatch) => {
                const isCopied = copied === swatch.variable

                return (
                  <div key={swatch.variable} className="flex flex-col gap-2">
                    {/* Chip */}
                    <button
                      onClick={() => handleCopy(swatch.variable)}
                      title={`var(${swatch.variable})`}
                      className={cn(
                        "group relative h-9 w-24 rounded-lg transition-all duration-150 cursor-pointer",
                        "hover:scale-[1.04] active:scale-[0.97]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                        isDark
                          ? "ring-offset-zinc-950 focus-visible:ring-zinc-500"
                          : "ring-offset-white focus-visible:ring-zinc-300",
                        "border",
                        isDark ? "border-white/10" : "border-black/5"
                      )}
                      style={{ backgroundColor: `var(${swatch.variable})` }}
                    >
                      {/* Copy overlay */}
                      <span
                        className={cn(
                          "absolute inset-0 rounded-lg flex items-center justify-center transition-all duration-150",
                          "bg-black/20 backdrop-blur-[1px]",
                          isCopied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
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

                    {/* Name + variable */}
                    <div className="w-24">
                      <p
                        className={cn(
                          "text-[11px] font-medium leading-tight truncate",
                          isDark ? "text-zinc-300" : "text-zinc-600"
                        )}
                      >
                        {swatch.name}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] font-mono mt-0.5 truncate",
                          isDark ? "text-zinc-600" : "text-zinc-400"
                        )}
                      >
                        {swatch.variable}
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

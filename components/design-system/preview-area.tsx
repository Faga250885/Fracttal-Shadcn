"use client"

import { useState } from "react"
import { Sun, Moon, ChevronDown, ChevronUp } from "lucide-react"
import type { ComponentEntry } from "./types"
import { CodeBlock } from "./code-block"
import { ApiTable } from "./api-table"
import { API_REFERENCE } from "./api-reference-data"
import { translations, type Lang } from "./i18n"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PreviewAreaProps {
  component: ComponentEntry | undefined
  propValues: Record<string, unknown>
  lang: Lang
}

type Mode = "light" | "dark"

// Controles que no aportan al resumen (son contenido, no configuración)
const SKIP_KEYS = new Set([
  "children", "label", "placeholder", "description", "trigger", "content",
  "title", "triggerLabel", "actionLabel", "cancelLabel",
  "tab1", "tab2", "tab3", "tab4", "fallback",
])

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^(.)/, (s) => s.toUpperCase())
    .trim()
}

function buildSummary(
  component: ComponentEntry,
  propValues: Record<string, unknown>
): { label: string; value: string }[] {
  const tags: { label: string; value: string }[] = []

  for (const [key, control] of Object.entries(component.controls)) {
    if (SKIP_KEYS.has(key)) continue
    const value = propValues[key] ?? control.defaultValue
    const label = formatLabel(key)

    if (control.type === "select") {
      tags.push({ label, value: String(value) })
    } else if (control.type === "boolean") {
      if (value === true) tags.push({ label, value: "on" })
    } else if (control.type === "number") {
      if (value !== control.defaultValue) tags.push({ label, value: String(value) })
    }
  }

  return tags
}

export function PreviewArea({ component, propValues, lang }: PreviewAreaProps) {
  const [mode, setMode] = useState<Mode>("light")
  const [codeOpen, setCodeOpen] = useState(false)
  const t = translations[lang]
  const isDark = mode === "dark"

  return (
    <main className="flex-1 min-w-0 flex flex-col border-x border-zinc-200 bg-zinc-50 overflow-hidden">
      {/* Component header */}
      <div className="p-4 shrink-0 h-[74px] flex flex-col justify-center border-b border-zinc-200 bg-zinc-50">
        <h1 className="text-base font-semibold tracking-tight leading-none">
          {component?.name ?? "—"}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {component?.description[lang]}
        </p>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">

        {/* Preview + collapsible code */}
        <div className="px-4 pt-4">
          {/* Title row */}
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-sm font-semibold tracking-tight">{t.preview}</h2>
            {component && (
              <span className="text-[11px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                {component.filePath}
              </span>
            )}
          </div>

          {/* Canvas + code as one rounded card */}
          <div className={[
            "rounded-xl border overflow-hidden transition-colors duration-200",
            isDark ? "border-transparent" : "border-zinc-100",
          ].join(" ")}>

            {/* Canvas */}
            <div
              className={[
                "relative min-h-[260px] flex items-center justify-center px-8 pt-14 pb-8 transition-colors duration-200",
                isDark ? "bg-zinc-900 dark text-foreground" : "bg-white text-foreground",
              ].join(" ")}
            >
              {/* Dot pattern */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{
                  backgroundImage: `radial-gradient(circle, ${
                    isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                  } 1px, transparent 1px)`,
                  backgroundSize: "14px 14px",
                  maskImage:
                    "linear-gradient(to right, black 0%, transparent 22%, transparent 78%, black 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, black 0%, transparent 22%, transparent 78%, black 100%)",
                }}
              />

              {/* Summary chips */}
              {component && (
                <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[55%]">
                  {buildSummary(component, propValues).map(({ label, value }) => (
                    <span
                      key={label}
                      className={[
                        "text-[10px] px-1.5 py-0.5 rounded-md leading-none flex items-center gap-1",
                        isDark ? "bg-white/10 text-white/50" : "bg-black/5 text-zinc-400",
                      ].join(" ")}
                    >
                      <span className="font-medium">{label}</span>
                      <span className={isDark ? "text-white/30" : "text-zinc-300"}>·</span>
                      <span>{value}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Light / Dark toggle */}
              <div className="absolute top-3 right-3">
                <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
                  <TabsList className="h-7 p-0.5">
                    <TabsTrigger value="light" className="h-6 w-7 px-0">
                      <Sun className="size-3.5" />
                    </TabsTrigger>
                    <TabsTrigger value="dark" className="h-6 w-7 px-0">
                      <Moon className="size-3.5" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {component ? (
                component.render(propValues)
              ) : (
                <p className="text-sm text-muted-foreground">{t.selectFromLeft}</p>
              )}
            </div>

            {/* Collapsible code toggle */}
            {component && (
              <>
                <button
                  onClick={() => setCodeOpen(v => !v)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-t border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {codeOpen
                    ? <ChevronUp className="size-3.5 shrink-0" />
                    : <ChevronDown className="size-3.5 shrink-0" />
                  }
                  <span>{t.implementation}</span>
                  <span className="ml-auto text-zinc-600">
                    {codeOpen ? "Hide code" : "View code"}
                  </span>
                </button>

                {codeOpen && (
                  <div className="[&>div]:rounded-none [&>div]:border-0 [&>div]:border-t [&>div]:border-zinc-800">
                    <CodeBlock code={component.generateCode(propValues)} lang={lang} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* API Reference section */}
        {component && API_REFERENCE[component.id] && (
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-sm font-semibold tracking-tight">API Reference</h2>
              <span className="text-[11px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                {API_REFERENCE[component.id].length} props
              </span>
            </div>
            <ApiTable props={API_REFERENCE[component.id]} />
          </div>
        )}
      </div>
    </main>
  )
}


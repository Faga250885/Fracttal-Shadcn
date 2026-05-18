"use client"

import { useState } from "react"
import { Sun, Moon } from "lucide-react"
import type { ComponentEntry } from "./types"
import { CodeBlock } from "./code-block"
import { translations, type Lang } from "./i18n"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PreviewAreaProps {
  component: ComponentEntry | undefined
  propValues: Record<string, unknown>
  lang: Lang
}

type Mode = "light" | "dark"

export function PreviewArea({ component, propValues, lang }: PreviewAreaProps) {
  const [mode, setMode] = useState<Mode>("light")
  const t = translations[lang]
  const isDark = mode === "dark"

  return (
    <main className="flex-1 min-w-0 flex flex-col border-x border-zinc-200 bg-white overflow-hidden">
      {/* Component header */}
      <div className="p-4 shrink-0 h-[74px] flex flex-col justify-center border-b border-zinc-200">
        <h1 className="text-base font-semibold text-zinc-800 leading-none">
          {component?.name ?? "—"}
        </h1>
        <p className="text-[13px] text-zinc-400 mt-0.5">
          {component?.description[lang]}
        </p>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">

        {/* Preview section */}
        <div className="px-4 pt-4">
          {/* Title row — above the canvas */}
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-sm font-semibold text-zinc-800">{t.preview}</h2>
            {component && (
              <span className="text-[11px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                {component.filePath}
              </span>
            )}
          </div>

          {/* Canvas */}
          <div
            className={[
              "relative min-h-[260px] flex items-center justify-center p-4 rounded-xl transition-colors duration-200",
              isDark ? "bg-zinc-900 dark text-foreground border border-transparent" : "bg-white text-foreground border border-zinc-100",
            ].join(" ")}
          >
            {/* Light / Dark toggle */}
            <div className="absolute top-3 right-3">
              <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
                <TabsList className="h-7 p-0.5">
                  <TabsTrigger value="light" className="h-6 px-2 gap-1 text-[11px]">
                    <Sun className="size-3" />
                    {t.lightMode}
                  </TabsTrigger>
                  <TabsTrigger value="dark" className="h-6 px-2 gap-1 text-[11px]">
                    <Moon className="size-3" />
                    {t.darkMode}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {component ? (
              component.render(propValues)
            ) : (
              <p className="text-sm text-zinc-400">
                {t.selectFromLeft}
              </p>
            )}
          </div>
        </div>

        {/* Code section */}
        {component && (
          <div className="p-4 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-sm font-semibold text-zinc-800">
                {t.implementation}
              </h2>
              <span className="text-[11px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                {t.copyPaste}
              </span>
            </div>
            <CodeBlock code={component.generateCode(propValues)} lang={lang} />
          </div>
        )}

        {/* Examples section */}
        {component?.examples && component.examples.length > 0 && (
          <div className="p-4 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-sm font-semibold text-zinc-800">Ejemplos</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {component.examples.map((ex) => (
                <div key={ex.title} className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-zinc-500">{ex.title}</p>
                  <div
                    className={[
                      "rounded-xl p-4 flex items-center justify-center min-h-[80px] transition-colors duration-200",
                      isDark
                        ? "bg-zinc-900 dark text-foreground"
                        : "bg-zinc-100 text-foreground",
                    ].join(" ")}
                  >
                    {ex.render()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

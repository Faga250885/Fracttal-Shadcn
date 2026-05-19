"use client"

import { Palette, Layers, Shapes } from "lucide-react"
import { categorizedComponents } from "./registry"
import { colorGroups } from "./colors"
import { translations, type Lang } from "./i18n"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type ViewMode = "components" | "colors" | "icons"

interface LeftPanelProps {
  view: ViewMode
  onViewChange: (v: ViewMode) => void
  selectedId: string
  onSelect: (id: string) => void
  lang: Lang
  onLangChange: (lang: Lang) => void
}

export function LeftPanel({
  view,
  onViewChange,
  selectedId,
  onSelect,
  lang,
  onLangChange,
}: LeftPanelProps) {
  const t = translations[lang]

  return (
    <aside className="dark w-[307px] shrink-0 flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Brand header */}
      <div className="p-4 border-b border-zinc-800 h-[74px] flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <img src="/isotipo.svg" alt="Fracttal" className="size-[42px]" />
          <div className="leading-none">
            <p className="text-base font-semibold text-white">Helix</p>
            <p className="text-[13px] text-zinc-500 mt-0.5">Fracttal Design System</p>
          </div>
        </div>
      </div>

      {/* View toggle — Components / Colors */}
      <div className="px-4 pt-4 pb-3 border-b border-zinc-800">
        <Tabs value={view} onValueChange={(v) => onViewChange(v as ViewMode)}>
          <TabsList className="w-full">
            <TabsTrigger value="components" className="flex-1 gap-1 text-[11px]">
              <Layers className="size-3.5" />
              {t.components}
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex-1 gap-1 text-[11px]">
              <Palette className="size-3.5" />
              {t.colors}
            </TabsTrigger>
            <TabsTrigger value="icons" className="flex-1 gap-1 text-[11px]">
              <Shapes className="size-3.5" />
              {t.icons}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Navigation content */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-4">
        {view === "icons" ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center px-4">
            <Shapes className="size-8 text-zinc-700" />
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              {t.iconsDescription}
            </p>
          </div>
        ) : view === "components" ? (
          Object.entries(categorizedComponents).map(([category, comps]) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  {t.components}
                </p>
                <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded-full">
                  {comps.length}
                </span>
              </div>
              <ul className="space-y-0.5">
                {comps.map((comp) => (
                  <li key={comp.id}>
                    <button
                      onClick={() => onSelect(comp.id)}
                      className={[
                        "w-full text-left px-4 py-1.5 rounded-md text-sm transition-colors cursor-pointer",
                        selectedId === comp.id
                          ? "bg-blue-600 text-white font-medium"
                          : "text-zinc-400 hover:bg-[rgba(146,187,255,0.1)] hover:text-zinc-100",
                      ].join(" ")}
                    >
                      {comp.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          /* Colors section — groups listed as reference */
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                {t.colors}
              </p>
              <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded-full">
                {colorGroups.reduce((acc, g) => acc + g.swatches.length, 0)}
              </span>
            </div>
            <ul className="space-y-0.5">
              {colorGroups.map((group) => (
                <li key={group.id}>
                  <div className="w-full text-left px-4 py-1.5 rounded-md text-sm text-zinc-500 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-zinc-700 shrink-0" />
                    {group.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {(["en", "es"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              className={[
                "text-[11px] font-medium px-1.5 py-0.5 rounded transition-colors cursor-pointer",
                lang === l
                  ? "text-white bg-zinc-700"
                  : "text-zinc-500 hover:text-zinc-300",
              ].join(" ")}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-zinc-600">v1.0.0</p>
      </div>
    </aside>
  )
}

"use client"

import { categorizedComponents } from "./registry"
import { translations, type Lang } from "./i18n"

interface LeftPanelProps {
  selectedId: string
  onSelect: (id: string) => void
  lang: Lang
  onLangChange: (lang: Lang) => void
}

export function LeftPanel({ selectedId, onSelect, lang, onLangChange }: LeftPanelProps) {
  const t = translations[lang]

  return (
    <aside className="w-[307px] shrink-0 flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
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

      {/* Component tree */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(categorizedComponents).map(([category, comps]) => (
          <div key={category}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              {t.components}
            </p>
            <ul className="space-y-0.5">
              {comps.map((comp) => (
                <li key={comp.id}>
                  <button
                    onClick={() => onSelect(comp.id)}
                    className={[
                      "w-full text-left px-4 py-1.5 rounded-md text-sm transition-colors",
                      selectedId === comp.id
                        ? "bg-blue-600 text-white font-medium"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
                    ].join(" ")}
                  >
                    {comp.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {(["en", "es"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              className={[
                "text-[11px] font-medium px-1.5 py-0.5 rounded transition-colors",
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

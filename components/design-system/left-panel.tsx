"use client"

import { categorizedComponents } from "./registry"

interface LeftPanelProps {
  selectedId: string
  onSelect: (id: string) => void
}

export function LeftPanel({ selectedId, onSelect }: LeftPanelProps) {
  return (
    <aside className="w-64 shrink-0 flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Brand header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center p-1">
            <img src="/isotipo.svg" alt="Fracttal" className="size-full" />
          </div>
          <div className="leading-none">
            <p className="text-sm font-semibold text-white">Fracttal</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Design System</p>
          </div>
        </div>
      </div>

      {/* Component tree */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(categorizedComponents).map(([category, comps]) => (
          <div key={category}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              {category}
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
      <div className="p-4 border-t border-zinc-800">
        <p className="text-[11px] text-zinc-600">v1.0.0</p>
      </div>
    </aside>
  )
}

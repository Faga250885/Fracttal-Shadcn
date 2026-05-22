"use client"

import { type ApiProp } from "./api-reference-data"
import { cn } from "@/lib/utils"

export function ApiTable({ props }: { props: ApiProp[] }) {
  return (
    <div className="rounded-xl border border-zinc-200 overflow-hidden text-sm">
      {/* Header */}
      <div className="grid grid-cols-[160px_1fr_100px_1fr] border-b border-zinc-200 bg-zinc-50">
        {["Prop", "Tipo", "Default", "Descripción"].map((h) => (
          <div key={h} className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-zinc-100">
        {props.map((p) => (
          <div
            key={p.prop}
            className="grid grid-cols-[160px_1fr_100px_1fr] hover:bg-zinc-50/80 transition-colors"
          >
            {/* Prop name */}
            <div className="px-4 py-3 flex items-start gap-1.5">
              <code className="text-[11px] font-mono font-semibold text-zinc-800 leading-relaxed break-all">
                {p.prop}
              </code>
              {p.required && (
                <span className="mt-0.5 text-[9px] font-bold text-red-400 uppercase shrink-0">req</span>
              )}
            </div>

            {/* Type */}
            <div className="px-4 py-3">
              <code className={cn(
                "text-[10px] font-mono leading-relaxed break-all",
                p.type.startsWith("(") ? "text-violet-600" : "text-blue-600",
              )}>
                {p.type}
              </code>
            </div>

            {/* Default */}
            <div className="px-4 py-3">
              {p.default !== undefined ? (
                <code className="text-[11px] font-mono text-zinc-500">{p.default}</code>
              ) : (
                <span className="text-zinc-300 text-[11px]">—</span>
              )}
            </div>

            {/* Description */}
            <div className="px-4 py-3 text-[12px] text-zinc-500 leading-relaxed">
              {p.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

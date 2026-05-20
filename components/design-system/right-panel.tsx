"use client"

import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import type { ComponentEntry, ControlDefinition } from "./types"
import { translations, type Lang } from "./i18n"

interface RightPanelProps {
  component: ComponentEntry | undefined
  propValues: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
  lang: Lang
}

export function RightPanel({ component, propValues, onChange, lang }: RightPanelProps) {
  const t = translations[lang]
  return (
    <aside className="w-1/5 min-w-[240px] max-w-[380px] shrink-0 flex flex-col bg-white border-l border-zinc-200">
      <div className="p-4 border-b border-zinc-200 h-[74px] flex flex-col justify-center">
        <h2 className="text-base font-semibold tracking-tight">{t.controls}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{t.configureHere}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {component ? (
          Object.entries(component.controls).map(([key, control]) => (
            <ControlField
              key={key}
              propName={key}
              control={control}
              value={propValues[key]}
              onChange={(val) => onChange(key, val)}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            {t.selectToSeeControls}
          </p>
        )}
      </div>
    </aside>
  )
}

interface ControlFieldProps {
  propName: string
  control: ControlDefinition
  value: unknown
  onChange: (value: unknown) => void
}

function ControlField({ propName, control, value, onChange }: ControlFieldProps) {
  const label =
    propName === "children"
      ? "Label"
      : propName
          .replace(/([A-Z])/g, " $1")
          .replace(/^(.)/, (s) => s.toUpperCase())
          .trim()

  if (control.type === "select") {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground block">{label}</label>
        <Select value={value as string} onValueChange={(val) => onChange(val)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {control.options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  if (control.type === "boolean") {
    return (
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        <button
          role="switch"
          aria-checked={value as boolean}
          onClick={() => onChange(!(value as boolean))}
          className={[
            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
            value ? "bg-blue-600" : "bg-zinc-200",
          ].join(" ")}
        >
          <span
            className={[
              "inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform",
              value ? "translate-x-[18px]" : "translate-x-[2px]",
            ].join(" ")}
          />
        </button>
      </div>
    )
  }

  if (control.type === "text") {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground block">{label}</label>
        <Input
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    )
  }

  if (control.type === "number") {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground block">{label}</label>
        <Input
          type="number"
          value={value as number}
          min={control.min}
          max={control.max}
          step={control.step}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    )
  }

  return null
}

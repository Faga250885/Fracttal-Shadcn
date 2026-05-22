"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import type { ComponentEntry, ControlDefinition } from "./types"
import { translations, type Lang } from "./i18n"
import { ALL_ICONS, ICONS_MAP, type IconComponent } from "./icon-categories"
import { cn } from "@/lib/utils"

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

  if (control.type === "icon") {
    return (
      <IconPickerField
        label={label}
        value={value as string}
        onChange={onChange}
      />
    )
  }

  return null
}

// ─── Icon picker ──────────────────────────────────────────────────────────────

function IconPickerField({
  label, value, onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen]   = useState(false)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_ICONS
    return ALL_ICONS.filter(([name]) => name.toLowerCase().includes(q))
  }, [query])

  const SelectedIcon = value !== "none" ? ICONS_MAP.get(value) : null

  function select(name: string) {
    onChange(name)
    setOpen(false)
    setQuery("")
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground block">{label}</label>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-sm transition-colors cursor-pointer",
          open ? "border-blue-400 bg-blue-50" : "border-zinc-200 bg-white hover:bg-zinc-50",
        )}
      >
        {SelectedIcon
          ? <SelectedIcon className="size-4 shrink-0 text-zinc-600" />
          : <span className="size-4 shrink-0 rounded border border-dashed border-zinc-300" />
        }
        <span className="flex-1 text-left text-zinc-700 truncate">
          {value === "none" ? "none" : value}
        </span>
        {value !== "none" && (
          <span
            role="button"
            onClick={(e) => { e.stopPropagation(); onChange("none") }}
            className="shrink-0 text-zinc-300 hover:text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="size-3.5" />
          </span>
        )}
      </button>

      {/* Inline picker panel */}
      {open && (
        <div className="rounded-lg border border-zinc-200 bg-white shadow-sm overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-zinc-100">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400 pointer-events-none" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar icono..."
                className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-md pl-6 pr-2 py-1.5 outline-none focus:border-blue-400 text-zinc-700 placeholder:text-zinc-400"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="overflow-y-auto max-h-52 p-1.5">
            {/* None option */}
            <button
              onClick={() => select("none")}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-zinc-500 hover:bg-zinc-100 transition-colors cursor-pointer",
                value === "none" && "bg-blue-50 text-blue-600 font-medium",
              )}
            >
              <span className="size-4 shrink-0 rounded border border-dashed border-zinc-300" />
              none
            </button>

            <div
              className="grid gap-0.5 mt-1"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(32px, 1fr))" }}
            >
              {filtered.map(([name, Icon]) => (
                <button
                  key={name}
                  onClick={() => select(name)}
                  title={name}
                  className={cn(
                    "flex items-center justify-center rounded-md p-1.5 transition-colors cursor-pointer",
                    value === name
                      ? "bg-blue-100 text-blue-600"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800",
                  )}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-4 text-center text-xs text-zinc-400">Sin resultados</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

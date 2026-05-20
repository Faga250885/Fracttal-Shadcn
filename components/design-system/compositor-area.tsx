"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Sun, Moon, X, Trash2, Columns2, AlignJustify, Minus, Plus,
  ChevronsUpDown, AlertCircle, AlertTriangle, BellRing,
  AppWindow, ChevronDown, CircleUser, Tag,
  MousePointerClick, Calendar, CheckSquare, TextCursorInput,
  Gauge, CircleDot, ListFilter, SlidersHorizontal, ToggleLeft,
  LayoutDashboard, AlignLeft, Info,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { components } from "./registry"
import type { ComponentEntry } from "./types"

// ─── Types ────────────────────────────────────────────────────────────────────

type BaseId     = "paper" | "card" | "toolbar" | "drawer"
type Mode       = "light" | "dark"
type PaddingVal = "none" | "sm" | "md" | "lg"
type GapVal     = "none" | "sm" | "md" | "lg"

interface DroppedItem { id: string; name: string }

interface Section {
  id:   string
  type: "1col" | "2col" | "divider"
  /** col index → items. 1col uses [0], 2col uses [0] and [1] */
  cols: DroppedItem[][]
}

// ─── Registry helpers ─────────────────────────────────────────────────────────

const compMap: Record<string, ComponentEntry> = Object.fromEntries(
  components.map((c) => [c.id, c])
)
function getDefaultProps(entry: ComponentEntry): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(entry.controls).map(([k, ctrl]) => [k, ctrl.defaultValue])
  )
}

// ─── Palette data ─────────────────────────────────────────────────────────────

const ITEM_ICONS: Record<string, LucideIcon> = {
  accordion: ChevronsUpDown, alert: AlertCircle, "alert-dialog": AlertTriangle,
  sonner: BellRing, dialog: AppWindow, "dropdown-menu": ChevronDown,
  avatar: CircleUser, badge: Tag, button: MousePointerClick, calendar: Calendar,
  checkbox: CheckSquare, input: TextCursorInput, progress: Gauge,
  "radio-group": CircleDot, select: ListFilter, slider: SlidersHorizontal,
  switch: ToggleLeft, tabs: LayoutDashboard, textarea: AlignLeft, tooltip: Info,
}

const PALETTE_GROUPS = [
  { label: "Feedback",      items: [{ id: "alert", name: "Alert" }, { id: "alert-dialog", name: "Alert Dialog" }, { id: "sonner", name: "Sonner" }, { id: "tooltip", name: "Tooltip" }] },
  { label: "Overlay",       items: [{ id: "dialog", name: "Dialog" }, { id: "dropdown-menu", name: "Dropdown Menu" }] },
  { label: "Form & Inputs", items: [{ id: "button", name: "Button" }, { id: "calendar", name: "Calendar" }, { id: "checkbox", name: "Checkbox" }, { id: "input", name: "Input" }, { id: "radio-group", name: "Radio Group" }, { id: "select", name: "Select" }, { id: "slider", name: "Slider" }, { id: "switch", name: "Switch" }, { id: "textarea", name: "Textarea" }] },
  { label: "Display",       items: [{ id: "accordion", name: "Accordion" }, { id: "avatar", name: "Avatar" }, { id: "badge", name: "Badge" }, { id: "progress", name: "Progress" }, { id: "tabs", name: "Tabs" }] },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() { return Math.random().toString(36).slice(2) }

const PADDING_CLASS: Record<PaddingVal, string> = {
  none: "p-0", sm: "p-3", md: "p-6", lg: "p-10",
}
const GAP_CLASS: Record<GapVal, string> = {
  none: "gap-0", sm: "gap-2", md: "gap-4", lg: "gap-8",
}

// ─── Rendered component (no wrapper, full width) ──────────────────────────────

function RenderedItem({ item, onRemove }: { item: DroppedItem; onRemove: () => void }) {
  const entry = compMap[item.id]
  if (!entry) return null
  return (
    <div className="relative group w-full">
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 z-20 size-5 rounded-full bg-zinc-800 text-white items-center justify-center hidden group-hover:flex transition-opacity cursor-pointer hover:bg-red-500 shadow-sm"
      >
        <X className="size-2.5" />
      </button>
      <div className="w-full">
        {entry.render(getDefaultProps(entry))}
      </div>
    </div>
  )
}

// ─── Drop zone (full width, no visual box) ────────────────────────────────────

interface DropZoneProps {
  zoneId:   string
  items:    DroppedItem[]
  onDrop:   (zoneId: string, item: DroppedItem) => void
  onRemove: (zoneId: string, i: number) => void
  gap:      GapVal
  empty?:   boolean
}

function DropZone({ zoneId, items, onDrop, onRemove, gap, empty }: DropZoneProps) {
  const [over, setOver] = useState(false)

  function handleDragOver(e: React.DragEvent) { e.preventDefault(); setOver(true) }
  function handleDragLeave() { setOver(false) }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setOver(false)
    const data = e.dataTransfer.getData("application/compositor-comp")
    if (data) onDrop(zoneId, JSON.parse(data) as DroppedItem)
  }

  const hasItems = items.length > 0

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={[
        "w-full min-h-[48px] rounded-lg transition-all duration-150",
        over
          ? "ring-2 ring-blue-400 ring-offset-1 bg-blue-50/40 dark:bg-blue-950/20"
          : !hasItems
            ? "border-2 border-dashed border-zinc-200 dark:border-zinc-700"
            : "",
      ].join(" ")}
    >
      {hasItems ? (
        <div className={["flex flex-col w-full", GAP_CLASS[gap]].join(" ")}>
          {items.map((item, i) => (
            <RenderedItem
              key={`${item.id}-${i}`}
              item={item}
              onRemove={() => onRemove(zoneId, i)}
            />
          ))}
          {over && (
            <div className="h-8 rounded border-2 border-dashed border-blue-400 flex items-center justify-center text-[11px] text-blue-400 font-medium">
              Soltar aquí
            </div>
          )}
        </div>
      ) : (
        <div className={[
          "flex items-center justify-center h-12 text-[11px] font-medium",
          over ? "text-blue-400" : "text-zinc-300 dark:text-zinc-600",
        ].join(" ")}>
          {over ? "Soltar aquí" : (empty ? "" : "+")}
        </div>
      )}
    </div>
  )
}

// ─── Section row ──────────────────────────────────────────────────────────────

interface SectionRowProps {
  section:  Section
  gap:      GapVal
  onDrop:   (zoneId: string, item: DroppedItem) => void
  onRemove: (zoneId: string, i: number) => void
  onDelete: (id: string) => void
}

function SectionRow({ section, gap, onDrop, onRemove, onDelete }: SectionRowProps) {
  if (section.type === "divider") {
    return (
      <div className="relative group flex items-center gap-2">
        <hr className="flex-1 border-border" />
        <button
          onClick={() => onDelete(section.id)}
          className="size-5 rounded-full bg-zinc-100 text-zinc-400 items-center justify-center hidden group-hover:flex hover:bg-red-50 hover:text-red-500 cursor-pointer transition-colors"
        >
          <X className="size-3" />
        </button>
      </div>
    )
  }

  return (
    <div className="relative group">
      {/* Delete section button */}
      <button
        onClick={() => onDelete(section.id)}
        className="absolute -top-2 -right-2 z-20 size-5 rounded-full bg-zinc-200 text-zinc-500 items-center justify-center hidden group-hover:flex hover:bg-red-50 hover:text-red-500 cursor-pointer transition-colors shadow-sm"
      >
        <X className="size-3" />
      </button>

      {section.type === "1col" ? (
        <DropZone
          zoneId={`${section.id}-0`}
          items={section.cols[0] ?? []}
          onDrop={onDrop}
          onRemove={onRemove}
          gap={gap}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <DropZone
            zoneId={`${section.id}-0`}
            items={section.cols[0] ?? []}
            onDrop={onDrop}
            onRemove={onRemove}
            gap={gap}
          />
          <DropZone
            zoneId={`${section.id}-1`}
            items={section.cols[1] ?? []}
            onDrop={onDrop}
            onRemove={onRemove}
            gap={gap}
          />
        </div>
      )}
    </div>
  )
}

// ─── Base outer containers ────────────────────────────────────────────────────

const BASE_STYLES: Record<BaseId, string> = {
  paper:   "w-full max-w-2xl mx-auto bg-background rounded-xl shadow-sm border border-border",
  card:    "w-full max-w-lg mx-auto bg-card rounded-xl shadow-md border border-border",
  toolbar: "w-full max-w-2xl mx-auto bg-card rounded-xl shadow-sm border border-border",
  drawer:  "w-full max-w-2xl mx-auto bg-card rounded-xl shadow-sm border border-border flex overflow-hidden",
}

// ─── Segment buttons (Padding / Gap picker) ────────────────────────────────────

function SegmentPicker<T extends string>({
  label, options, value, onChange,
}: {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-zinc-500 font-medium shrink-0">{label}</span>
      <div className="flex">
        {options.map((opt, i) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={[
              "px-2.5 py-1 text-[11px] font-medium border transition-colors cursor-pointer",
              i === 0 ? "rounded-l-md" : i === options.length - 1 ? "rounded-r-md" : "",
              i > 0 ? "-ml-px" : "",
              value === opt.value
                ? "bg-zinc-900 text-white border-zinc-900 z-10 relative"
                : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Component palette ────────────────────────────────────────────────────────

function ComponentPalette() {
  const [search, setSearch] = useState("")
  const query = search.toLowerCase()

  function handleDragStart(e: React.DragEvent, item: DroppedItem) {
    e.dataTransfer.setData("application/compositor-comp", JSON.stringify(item))
    e.dataTransfer.effectAllowed = "copy"
  }

  const filtered = PALETTE_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((c) => c.name.toLowerCase().includes(query)),
  })).filter((g) => g.items.length > 0)

  return (
    <aside className="w-52 shrink-0 flex flex-col border-l border-zinc-200 bg-zinc-50 overflow-hidden">
      <div className="px-3 pt-3 pb-2 border-b border-zinc-200">
        <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Componentes</p>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          className="w-full text-xs bg-white border border-zinc-200 rounded-md px-2 py-1.5 outline-none focus:border-blue-400 text-zinc-700 placeholder:text-zinc-300"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {filtered.map((group) => (
          <div key={group.label}>
            <p className="px-1 mb-1 text-[10px] font-medium text-zinc-400">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = ITEM_ICONS[item.id]
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-zinc-600 bg-white border border-zinc-100 cursor-grab active:cursor-grabbing hover:border-blue-300 hover:text-zinc-900 hover:shadow-sm transition-all select-none"
                  >
                    {Icon && <Icon className="size-3.5 shrink-0 text-zinc-400" />}
                    <span>{item.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-[11px] text-zinc-400 text-center pt-4">Sin resultados</p>
        )}
      </div>
    </aside>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const BASES = [
  { id: "paper"   as BaseId, label: "Paper" },
  { id: "card"    as BaseId, label: "Card" },
  { id: "toolbar" as BaseId, label: "Toolbar" },
  { id: "drawer"  as BaseId, label: "Drawer" },
]

const PADDING_OPTIONS: { value: PaddingVal; label: string }[] = [
  { value: "none", label: "0" },
  { value: "sm",   label: "S" },
  { value: "md",   label: "M" },
  { value: "lg",   label: "L" },
]
const GAP_OPTIONS: { value: GapVal; label: string }[] = [
  { value: "none", label: "0" },
  { value: "sm",   label: "S" },
  { value: "md",   label: "M" },
  { value: "lg",   label: "L" },
]

function makeSection(type: Section["type"]): Section {
  return { id: uid(), type, cols: type === "2col" ? [[], []] : [[]] }
}

export function CompositorArea() {
  const [base, setBase]       = useState<BaseId>("paper")
  const [mode, setMode]       = useState<Mode>("light")
  const [padding, setPadding] = useState<PaddingVal>("md")
  const [gap, setGap]         = useState<GapVal>("md")
  const [sections, setSections] = useState<Section[]>([makeSection("1col")])
  const isDark = mode === "dark"

  // ── Section management ───────────────────────────────────────────────────
  function addSection(type: Section["type"]) {
    setSections((prev) => [...prev, makeSection(type)])
  }
  function deleteSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  // ── Drop / remove ────────────────────────────────────────────────────────
  function handleDrop(zoneId: string, item: DroppedItem) {
    const [sectionId, colStr] = zoneId.split("-")
    const colIdx = Number(colStr)
    setSections((prev) => prev.map((s) => {
      if (s.id !== sectionId) return s
      const cols = s.cols.map((col, i) => i === colIdx ? [...col, item] : col)
      return { ...s, cols }
    }))
  }
  function handleRemove(zoneId: string, itemIdx: number) {
    const [sectionId, colStr] = zoneId.split("-")
    const colIdx = Number(colStr)
    setSections((prev) => prev.map((s) => {
      if (s.id !== sectionId) return s
      const cols = s.cols.map((col, i) =>
        i === colIdx ? col.filter((_, j) => j !== itemIdx) : col
      )
      return { ...s, cols }
    }))
  }

  function handleBaseChange(id: BaseId) {
    setBase(id)
    setSections([makeSection("1col")])
  }

  return (
    <main className="flex-1 min-w-0 flex flex-col border-l border-zinc-200 bg-zinc-50 overflow-hidden">

      {/* Header */}
      <div className="px-4 shrink-0 h-[74px] flex flex-col justify-center border-b border-zinc-200 bg-zinc-50">
        <h1 className="text-base font-semibold text-zinc-800 leading-none">Compositor</h1>
        <p className="text-[13px] text-zinc-400 mt-0.5">
          Arrastra componentes desde la paleta hacia las zonas de la base
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Canvas area */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-4 pb-8 space-y-4">

            {/* Row 1: Base selector + light/dark */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-600 shrink-0">Base</span>
                <div className="flex items-center gap-1">
                  {BASES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleBaseChange(b.id)}
                      className={[
                        "px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
                        base === b.id
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700",
                      ].join(" ")}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
                <TabsList className="h-7 p-0.5">
                  <TabsTrigger value="light" className="h-6 w-7 px-0"><Sun className="size-3.5" /></TabsTrigger>
                  <TabsTrigger value="dark"  className="h-6 w-7 px-0"><Moon className="size-3.5" /></TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Row 2: Controls */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3 bg-white rounded-xl border border-zinc-100">
              <SegmentPicker label="Padding" options={PADDING_OPTIONS} value={padding} onChange={setPadding} />
              <div className="w-px h-4 bg-zinc-200" />
              <SegmentPicker label="Gap" options={GAP_OPTIONS} value={gap} onChange={setGap} />
              <div className="w-px h-4 bg-zinc-200" />
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-zinc-500 font-medium mr-0.5">Añadir</span>
                <button
                  onClick={() => addSection("1col")}
                  title="Sección de 1 columna"
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800 transition-colors cursor-pointer"
                >
                  <AlignJustify className="size-3" />
                  1 Col
                </button>
                <button
                  onClick={() => addSection("2col")}
                  title="Sección de 2 columnas"
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800 transition-colors cursor-pointer"
                >
                  <Columns2 className="size-3" />
                  2 Col
                </button>
                <button
                  onClick={() => addSection("divider")}
                  title="Añadir divisor"
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800 transition-colors cursor-pointer"
                >
                  <Minus className="size-3" />
                  Divider
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className={[
              "relative pt-4 rounded-xl transition-colors duration-200",
              isDark
                ? "bg-zinc-900 dark text-foreground border border-transparent"
                : "bg-white text-foreground border border-zinc-100",
            ].join(" ")}>

              {/* Dot pattern */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
                style={{
                  backgroundImage: `radial-gradient(circle, ${
                    isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                  } 1px, transparent 1px)`,
                  backgroundSize: "14px 14px",
                  maskImage: "linear-gradient(to right, black 0%, transparent 22%, transparent 78%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 22%, transparent 78%, black 100%)",
                }}
              />

              {/* Base chip */}
              <div className="absolute top-2 left-3">
                <span className={[
                  "text-[10px] px-1.5 py-0.5 rounded-md leading-none",
                  isDark ? "bg-white/10 text-white/50" : "bg-black/5 text-zinc-400",
                ].join(" ")}>
                  {BASES.find((b) => b.id === base)?.label}
                </span>
              </div>

              {/* Base container + sections */}
              <div className="relative flex items-start justify-center px-8 pb-8 pt-6">
                <div className={[BASE_STYLES[base], PADDING_CLASS[padding]].join(" ")}>
                  <div className={["flex flex-col w-full", GAP_CLASS[gap]].join(" ")}>
                    {sections.map((section) => (
                      <SectionRow
                        key={section.id}
                        section={section}
                        gap={gap}
                        onDrop={handleDrop}
                        onRemove={handleRemove}
                        onDelete={deleteSection}
                      />
                    ))}
                    {sections.length === 0 && (
                      <p className="text-center text-xs text-zinc-300 py-8">
                        Añade secciones con los controles de arriba
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Palette */}
        <ComponentPalette />
      </div>
    </main>
  )
}

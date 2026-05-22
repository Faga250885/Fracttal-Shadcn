"use client"

import { useState, useMemo } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Sun, Moon, X, Pencil, Eye, PenLine, Square, Columns2, LayoutGrid, Search, Plus, Ban,
  ChevronsUpDown, AlertCircle, AlertTriangle, BellRing,
  AppWindow, ChevronDown, CircleUser, Tag,
  MousePointerClick, Calendar, CheckSquare, TextCursorInput,
  Gauge, CircleDot, ListFilter, SlidersHorizontal, ToggleLeft,
  LayoutDashboard, AlignLeft, Info,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { components } from "./registry"
import type { ComponentEntry } from "./types"
import { RightPanel } from "./right-panel"
import type { Lang } from "./i18n"

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode       = "light" | "dark"
type PaddingVal = "none" | "sm" | "md" | "lg"
type GapVal     = "none" | "sm" | "md" | "lg"
type RadiusVal  = "none" | "sm" | "md" | "lg" | "full"
type DimMode    = "hug" | "fixed"

interface Dim { mode: DimMode; px: number }

interface DroppedItem {
  uid:   string
  id:    string
  name:  string
  props: Record<string, unknown>
}

interface Section {
  id:   string
  type: "1col" | "2col" | "3col"
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

// Components that require a trigger/overlay and cannot be composed statically
const COMPOSITOR_BLOCKED = new Set(["alert-dialog", "sonner", "tooltip", "dropdown-menu"])

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
const RADIUS_CLASS: Record<RadiusVal, string> = {
  none: "rounded-none", sm: "rounded-md", md: "rounded-xl", lg: "rounded-2xl", full: "rounded-3xl",
}

function dimStyle(dim: Dim): string | number {
  return dim.mode === "hug" ? "fit-content" : dim.px
}

// ─── Dimension input ──────────────────────────────────────────────────────────

function DimInput({ label, dim, onChange }: { label: string; dim: Dim; onChange: (d: Dim) => void }) {
  const [raw, setRaw] = useState(String(dim.px))

  const commit = () => {
    const n = parseInt(raw, 10)
    const clamped = isNaN(n) ? dim.px : Math.max(40, Math.min(2400, n))
    setRaw(String(clamped))
    onChange({ ...dim, px: clamped })
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-zinc-500 font-medium shrink-0 w-3">{label}</span>
      <div className="flex">
        {(["hug", "fixed"] as DimMode[]).map((m, i) => (
          <button
            key={m}
            onClick={() => onChange({ ...dim, mode: m })}
            className={[
              "px-2 py-1 text-[11px] font-medium border transition-colors cursor-pointer",
              i === 0 ? "rounded-l-md" : "rounded-r-md -ml-px",
              dim.mode === m
                ? "bg-zinc-900 text-white border-zinc-900 z-10 relative"
                : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50",
            ].join(" ")}
          >
            {m === "hug" ? "Hug" : "px"}
          </button>
        ))}
      </div>
      {dim.mode === "fixed" && (
        <input
          type="number"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur() }}
          className="w-16 text-[11px] bg-white border border-zinc-200 rounded-md px-2 py-1 outline-none focus:border-blue-400 text-zinc-700 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
      )}
    </div>
  )
}

// ─── Component drawer ─────────────────────────────────────────────────────────

function ComponentDrawer({
  onAdd, onClose,
}: {
  onAdd:   (raw: { id: string; name: string }) => void
  onClose: () => void
}) {
  const [search, setSearch] = useState("")
  const query = search.toLowerCase()
  const filtered = PALETTE_GROUPS
    .map((g) => ({ ...g, items: g.items.filter((c) => c.name.toLowerCase().includes(query)) }))
    .filter((g) => g.items.length > 0)

  return (
    <aside className="w-1/5 min-w-[240px] max-w-[380px] shrink-0 flex flex-col bg-white border-l border-zinc-200">
      <div className="px-4 border-b border-zinc-200 h-[74px] flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-base font-semibold text-zinc-800 leading-none">Componentes</h2>
          <p className="text-[13px] text-zinc-400 mt-0.5">Selecciona uno para añadir</p>
        </div>
        <button
          onClick={onClose}
          className="size-7 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="px-3 py-2 border-b border-zinc-100 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400 pointer-events-none" />
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar componente..."
            className="w-full text-sm bg-zinc-50 border border-zinc-200 rounded-md pl-7 pr-3 py-1.5 outline-none focus:border-blue-400 text-zinc-700 placeholder:text-zinc-400"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {filtered.map((group) => (
          <div key={group.label}>
            <p className="px-1 mb-1.5 text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = ITEM_ICONS[item.id]
                const blocked = COMPOSITOR_BLOCKED.has(item.id)
                return blocked ? (
                  <div
                    key={item.id}
                    title="No disponible en el compositor"
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-zinc-300 cursor-not-allowed select-none"
                  >
                    {Icon && <Icon className="size-4 shrink-0 text-zinc-300" />}
                    <span className="flex-1">{item.name}</span>
                    <Ban className="size-3.5 shrink-0 text-zinc-300" />
                  </div>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => onAdd(item)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer text-left"
                  >
                    {Icon && <Icon className="size-4 shrink-0 text-zinc-400" />}
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-zinc-400 text-center pt-6">Sin resultados</p>
        )}
      </div>
    </aside>
  )
}

// ─── Insertion indicator ──────────────────────────────────────────────────────

function InsertLine() {
  return (
    <div className="flex items-center gap-1 py-0.5 pointer-events-none">
      <div className="size-1.5 rounded-full bg-blue-500 shrink-0" />
      <div className="flex-1 h-0.5 bg-blue-500 rounded-full" />
    </div>
  )
}

// ─── Rendered component ───────────────────────────────────────────────────────

function RenderedItem({
  item, zoneId, index, selected, dragging, isPreview, onSelect, onRemove, onDragStart, onDragEnd,
}: {
  item:        DroppedItem
  zoneId:      string
  index:       number
  selected:    boolean
  dragging:    boolean
  isPreview:   boolean
  onSelect:    () => void
  onRemove:    () => void
  onDragStart: (uid: string, fromZoneId: string) => void
  onDragEnd:   () => void
}) {
  const entry = compMap[item.id]
  if (!entry) return null

  return (
    <div
      draggable={!isPreview}
      onDragStart={isPreview ? undefined : (e) => {
        e.dataTransfer.setData("application/compositor-move", JSON.stringify({ uid: item.uid, fromZoneId: zoneId, fromIdx: index }))
        e.dataTransfer.effectAllowed = "move"
        onDragStart(item.uid, zoneId)
      }}
      onDragEnd={isPreview ? undefined : onDragEnd}
      onClick={isPreview ? undefined : onSelect}
      className={[
        "relative w-full rounded-lg transition-all ring-offset-2",
        isPreview
          ? ""
          : [
              "group cursor-grab active:cursor-grabbing",
              selected ? "ring-2 ring-blue-500" : "hover:ring-2 hover:ring-blue-300 hover:ring-offset-1",
              dragging  ? "opacity-40" : "",
            ].join(" "),
      ].join(" ")}
    >
      {!isPreview && (
        <div className="absolute top-1.5 right-1.5 z-20 hidden group-hover:flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect() }}
            className="size-5 rounded-md bg-zinc-800/80 text-white flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors shadow-sm backdrop-blur-sm"
          >
            <Pencil className="size-2.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            className="size-5 rounded-md bg-zinc-800/80 text-white flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors shadow-sm backdrop-blur-sm"
          >
            <X className="size-2.5" />
          </button>
        </div>
      )}
      <div className="w-full flex [&>*]:w-full [&>*]:!max-w-none">
        {(entry.compositorRender ?? entry.render)(item.props)}
      </div>
    </div>
  )
}

// ─── Drop zone ────────────────────────────────────────────────────────────────

function DropZone({
  zoneId, items, selectedUid, draggingUid, active, isPreview, onActivate, onAdd, onMove, onRemove, onSelect,
  onDragStart, onDragEnd, gap,
}: {
  zoneId:      string
  items:       DroppedItem[]
  selectedUid: string | null
  draggingUid: string | null
  active:      boolean
  isPreview:   boolean
  onActivate:  (zoneId: string) => void
  onAdd:       (zoneId: string, raw: { id: string; name: string }, atIdx: number) => void
  onMove:      (uid: string, fromZoneId: string, toZoneId: string, toIdx: number) => void
  onRemove:    (zoneId: string, i: number) => void
  onSelect:    (uid: string) => void
  onDragStart: (uid: string, fromZoneId: string) => void
  onDragEnd:   () => void
  gap:         GapVal
}) {
  const [over, setOver]           = useState(false)
  const [insertIdx, setInsertIdx] = useState<number | null>(null)
  const hasItems = items.length > 0

  if (isPreview && !hasItems) return null

  function handleZoneDragOver(e: React.DragEvent) {
    e.preventDefault()
    setOver(true)
    if (!hasItems) setInsertIdx(0)
  }

  function handleItemDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault()
    e.stopPropagation()
    setOver(true)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setInsertIdx(e.clientY < rect.top + rect.height / 2 ? idx : idx + 1)
  }

  function handleDragLeave(e: React.DragEvent) {
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
      setOver(false)
      setInsertIdx(null)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const targetIdx = insertIdx ?? items.length
    setOver(false)
    setInsertIdx(null)

    const moveData = e.dataTransfer.getData("application/compositor-move")
    if (moveData) {
      const { uid, fromZoneId } = JSON.parse(moveData) as { uid: string; fromZoneId: string }
      onMove(uid, fromZoneId, zoneId, targetIdx)
      return
    }

    const newData = e.dataTransfer.getData("application/compositor-comp")
    if (newData) {
      onAdd(zoneId, JSON.parse(newData) as { id: string; name: string }, targetIdx)
    }
  }

  return (
    <div
      onDragOver={isPreview ? undefined : handleZoneDragOver}
      onDragLeave={isPreview ? undefined : handleDragLeave}
      onDrop={isPreview ? undefined : handleDrop}
      className={[
        "w-full rounded-lg transition-all duration-150",
        !hasItems ? "min-h-[48px]" : "",
        over && !hasItems
          ? "ring-2 ring-blue-400 ring-offset-1 bg-blue-50/40 dark:bg-blue-950/20"
          : active && !over && !hasItems
            ? "ring-2 ring-blue-500 ring-offset-1"
            : !hasItems
              ? "border-2 border-dashed border-zinc-200 dark:border-zinc-700"
              : "",
      ].join(" ")}
    >
      {hasItems ? (
        <div className={["flex flex-col w-full", GAP_CLASS[gap]].join(" ")}>
          {/* Insert line before first item */}
          {over && insertIdx === 0 && <InsertLine />}

          {items.map((item, i) => (
            <div key={item.uid} onDragOver={(e) => handleItemDragOver(e, i)}>
              <RenderedItem
                item={item}
                zoneId={zoneId}
                index={i}
                selected={selectedUid === item.uid}
                dragging={draggingUid === item.uid}
                isPreview={isPreview}
                onSelect={() => onSelect(item.uid)}
                onRemove={() => onRemove(zoneId, i)}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
              {/* Insert line after each item */}
              {over && insertIdx === i + 1 && <InsertLine />}
            </div>
          ))}

        </div>
      ) : !isPreview ? (
        <button
          onClick={(e) => { e.stopPropagation(); onActivate(zoneId) }}
          className={[
            "w-full flex items-center justify-center h-12 gap-1 text-[11px] font-medium rounded-lg transition-colors cursor-pointer",
            active
              ? "text-blue-500 bg-blue-50"
              : "text-zinc-300 hover:text-zinc-500 hover:bg-zinc-50 dark:text-zinc-600",
          ].join(" ")}
        >
          <Plus className="size-3.5" />
          {active ? "Selecciona un componente" : "Añadir componente"}
        </button>
      ) : null}
    </div>
  )
}

// ─── Section row ──────────────────────────────────────────────────────────────

function SectionRow({
  section, gap, selectedUid, draggingUid, activeZoneId, isPreview,
  onActivate, onAdd, onMove, onRemove, onSelect, onDragStart, onDragEnd, onDelete,
}: {
  section:      Section
  gap:          GapVal
  selectedUid:  string | null
  draggingUid:  string | null
  activeZoneId: string | null
  isPreview:    boolean
  onActivate:   (zoneId: string) => void
  onAdd:        (zoneId: string, raw: { id: string; name: string }, atIdx: number) => void
  onMove:       (uid: string, fromZoneId: string, toZoneId: string, toIdx: number) => void
  onRemove:     (zoneId: string, i: number) => void
  onSelect:     (uid: string) => void
  onDragStart:  (uid: string, fromZoneId: string) => void
  onDragEnd:    () => void
  onDelete:     (id: string) => void
}) {
  const sharedZoneProps = {
    gap, selectedUid, draggingUid, isPreview,
    onActivate, onAdd, onMove, onRemove, onSelect, onDragStart, onDragEnd,
  }
  const isEmpty = section.cols.every((col) => col.length === 0)
  if (isPreview && isEmpty) return null

  return (
    <div className="relative group">
      {!isPreview && isEmpty && (
        <button
          onClick={() => onDelete(section.id)}
          className="absolute top-1.5 right-1.5 z-20 size-5 rounded-md bg-zinc-800/80 text-white items-center justify-center hidden group-hover:flex hover:bg-red-500 cursor-pointer transition-colors shadow-sm backdrop-blur-sm"
        >
          <X className="size-2.5" />
        </button>
      )}

      {section.type === "1col" ? (
        <DropZone
          zoneId={`${section.id}-0`}
          items={section.cols[0] ?? []}
          active={activeZoneId === `${section.id}-0`}
          {...sharedZoneProps}
        />
      ) : section.type === "2col" ? (
        <div className="grid grid-cols-2 gap-3">
          <DropZone zoneId={`${section.id}-0`} items={section.cols[0] ?? []} active={activeZoneId === `${section.id}-0`} {...sharedZoneProps} />
          <DropZone zoneId={`${section.id}-1`} items={section.cols[1] ?? []} active={activeZoneId === `${section.id}-1`} {...sharedZoneProps} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <DropZone zoneId={`${section.id}-0`} items={section.cols[0] ?? []} active={activeZoneId === `${section.id}-0`} {...sharedZoneProps} />
          <DropZone zoneId={`${section.id}-1`} items={section.cols[1] ?? []} active={activeZoneId === `${section.id}-1`} {...sharedZoneProps} />
          <DropZone zoneId={`${section.id}-2`} items={section.cols[2] ?? []} active={activeZoneId === `${section.id}-2`} {...sharedZoneProps} />
        </div>
      )}
    </div>
  )
}

// ─── Segment picker ───────────────────────────────────────────────────────────

function SegmentPicker<T extends string>({
  label, options, value, onChange,
}: {
  label:    string
  options:  { value: T; label: string }[]
  value:    T
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

// ─── Constants ────────────────────────────────────────────────────────────────

const PADDING_OPTIONS: { value: PaddingVal; label: string }[] = [
  { value: "none", label: "0" }, { value: "sm", label: "S" },
  { value: "md",   label: "M" }, { value: "lg", label: "L" },
]
const GAP_OPTIONS: { value: GapVal; label: string }[] = [
  { value: "none", label: "0" }, { value: "sm", label: "S" },
  { value: "md",   label: "M" }, { value: "lg", label: "L" },
]
const RADIUS_OPTIONS: { value: RadiusVal; label: string }[] = [
  { value: "none", label: "0" }, { value: "sm",  label: "S" },
  { value: "md",   label: "M" }, { value: "lg",  label: "L" },
  { value: "full", label: "•" },
]

function makeSection(type: Section["type"]): Section {
  const cols = type === "3col" ? [[], [], []] : type === "2col" ? [[], []] : [[]]
  return { id: uid(), type, cols }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function CompositorArea({ lang }: { lang: Lang }) {
  const [mode, setMode]         = useState<Mode>("light")
  const [padding, setPadding]   = useState<PaddingVal>("md")
  const [gap, setGap]           = useState<GapVal>("md")
  const [radius, setRadius]     = useState<RadiusVal>("md")
  const [width, setWidth]       = useState<Dim>({ mode: "fixed", px: 480 })
  const [height, setHeight]     = useState<Dim>({ mode: "hug",   px: 320 })
  const [sections, setSections] = useState<Section[]>([makeSection("1col")])
  const [selectedUid, setSelectedUid]         = useState<string | null>(null)
  const [activeZoneId, setActiveZoneId]       = useState<string | null>(null)
  const [draggingUid, setDraggingUid]         = useState<string | null>(null)
  const [isPreview, setIsPreview]             = useState(false)
  const isDark = mode === "dark"

  const selectedItem = useMemo(() => {
    if (!selectedUid) return null
    for (const section of sections) {
      for (const col of section.cols) {
        const found = col.find((i) => i.uid === selectedUid)
        if (found) return found
      }
    }
    return null
  }, [selectedUid, sections])

  // ── Section management ───────────────────────────────────────────────────
  function addSection(type: Section["type"]) {
    setSections((prev) => [...prev, makeSection(type)])
  }
  function deleteSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  // ── Add new component to zone ────────────────────────────────────────────
  function handleAdd(zoneId: string, raw: { id: string; name: string }, atIdx: number) {
    const entry = compMap[raw.id]
    if (!entry) return
    const item: DroppedItem = { uid: uid(), id: raw.id, name: raw.name, props: getDefaultProps(entry) }
    const [sectionId, colStr] = zoneId.split("-")
    const colIdx = Number(colStr)
    setSections((prev) => prev.map((s) => {
      if (s.id !== sectionId) return s
      return {
        ...s,
        cols: s.cols.map((col, i) => {
          if (i !== colIdx) return col
          const idx = Math.min(atIdx, col.length)
          return [...col.slice(0, idx), item, ...col.slice(idx)]
        }),
      }
    }))
    setSelectedUid(item.uid)
    setActiveZoneId(null)
  }

  // ── Move existing component between / within zones ───────────────────────
  function handleMove(itemUid: string, fromZoneId: string, toZoneId: string, toIdx: number) {
    setSections((prev) => {
      let moved: DroppedItem | null = null

      // Remove from source
      const withRemoved = prev.map((section) => ({
        ...section,
        cols: section.cols.map((col) => {
          const idx = col.findIndex((i) => i.uid === itemUid)
          if (idx === -1) return col
          moved = col[idx]
          return col.filter((_, j) => j !== idx)
        }),
      }))

      if (!moved) return prev

      // Insert into target
      const [toSectionId, toColStr] = toZoneId.split("-")
      const toColIdx = Number(toColStr)

      return withRemoved.map((section) => {
        if (section.id !== toSectionId) return section
        return {
          ...section,
          cols: section.cols.map((col, i) => {
            if (i !== toColIdx) return col
            const insertAt = Math.min(toIdx, col.length)
            return [...col.slice(0, insertAt), moved!, ...col.slice(insertAt)]
          }),
        }
      })
    })
  }

  // ── Remove ───────────────────────────────────────────────────────────────
  function handleRemove(zoneId: string, itemIdx: number) {
    const [sectionId, colStr] = zoneId.split("-")
    const colIdx = Number(colStr)
    setSections((prev) => prev.map((s) => {
      if (s.id !== sectionId) return s
      return { ...s, cols: s.cols.map((col, i) => i === colIdx ? col.filter((_, j) => j !== itemIdx) : col) }
    }))
    setSelectedUid(null)
  }

  // ── Prop changes ─────────────────────────────────────────────────────────
  function handlePropChange(key: string, value: unknown) {
    if (!selectedUid || !selectedItem) return
    const entry = compMap[selectedItem.id]
    setSections((prev) => prev.map((section) => ({
      ...section,
      cols: section.cols.map((col) =>
        col.map((item) => {
          if (item.uid !== selectedUid) return item
          const cascaded = entry?.cascade?.(key, value, item.props) ?? {}
          return { ...item, props: { ...item.props, [key]: value, ...cascaded } }
        })
      ),
    })))
  }

  function handleActivateZone(zoneId: string) {
    setActiveZoneId(zoneId)
    setSelectedUid(null)
  }

  const containerStyle: React.CSSProperties = {
    width:     dimStyle(width),
    height:    dimStyle(height),
    overflowY: height.mode === "fixed" ? "auto" : undefined,
    minWidth:  width.mode === "hug" ? undefined : dimStyle(width),
  }

  const showDrawer     = !isPreview && activeZoneId !== null
  const showRightPanel = !isPreview && !showDrawer && selectedItem !== null

  return (
    <main className="flex-1 min-w-0 flex flex-col border-l border-zinc-200 bg-zinc-50 overflow-hidden">

      {/* Header */}
      <div className="px-4 shrink-0 h-[74px] flex flex-col justify-center border-b border-zinc-200 bg-zinc-50">
        <h1 className="text-base font-semibold text-zinc-800 leading-none">Compositor</h1>
        <p className="text-[13px] text-zinc-400 mt-0.5">
          Haz click en una zona para añadir · Arrastra para reordenar
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Canvas column */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-4 pb-8 space-y-4">

            {/* Controls bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3 bg-white rounded-xl border border-zinc-100">
              <DimInput label="W" dim={width}  onChange={setWidth}  />
              <div className="w-px h-4 bg-zinc-200" />
              <DimInput label="H" dim={height} onChange={setHeight} />
              <div className="w-px h-4 bg-zinc-200" />
              <SegmentPicker label="Padding" options={PADDING_OPTIONS} value={padding} onChange={setPadding} />
              <div className="w-px h-4 bg-zinc-200" />
              <SegmentPicker label="Gap"     options={GAP_OPTIONS}     value={gap}     onChange={setGap}     />
              <div className="w-px h-4 bg-zinc-200" />
              <SegmentPicker label="Radius"  options={RADIUS_OPTIONS}  value={radius}  onChange={setRadius}  />
              <div className="w-px h-4 bg-zinc-200" />
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-zinc-500 font-medium mr-0.5">Contenedores</span>
                <button onClick={() => addSection("1col")}    className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800 transition-colors cursor-pointer"><Square    className="size-3" />1</button>
                <button onClick={() => addSection("2col")}    className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800 transition-colors cursor-pointer"><Columns2   className="size-3" />2</button>
                <button onClick={() => addSection("3col")}    className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800 transition-colors cursor-pointer"><LayoutGrid className="size-3" />3</button>
              </div>
            </div>

            {/* Canvas */}
            <div
              className={[
                "relative pt-4 rounded-xl transition-colors duration-200",
                isDark
                  ? "bg-zinc-900 dark text-foreground border border-transparent"
                  : "bg-white text-foreground border border-zinc-100",
              ].join(" ")}
              onClick={() => { setSelectedUid(null); setActiveZoneId(null) }}
            >
              {/* Dot pattern */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
                style={{
                  backgroundImage: `radial-gradient(circle, ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} 1px, transparent 1px)`,
                  backgroundSize: "14px 14px",
                  maskImage: "linear-gradient(to right, black 0%, transparent 22%, transparent 78%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 22%, transparent 78%, black 100%)",
                }}
              />

              {/* Top-left: edit/preview toggle */}
              <div className="absolute top-3 left-3">
                <Tabs
                  value={isPreview ? "preview" : "edit"}
                  onValueChange={(v) => {
                    const next = v === "preview"
                    setIsPreview(next)
                    if (next) { setSelectedUid(null); setActiveZoneId(null) }
                  }}
                >
                  <TabsList className="h-7 p-0.5">
                    <TabsTrigger value="edit"    className="h-6 w-7 px-0"><PenLine className="size-3.5" /></TabsTrigger>
                    <TabsTrigger value="preview" className="h-6 w-7 px-0"><Eye     className="size-3.5" /></TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Top-right: light/dark toggle */}
              <div className="absolute top-3 right-3">
                <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
                  <TabsList className="h-7 p-0.5">
                    <TabsTrigger value="light" className="h-6 w-7 px-0"><Sun  className="size-3.5" /></TabsTrigger>
                    <TabsTrigger value="dark"  className="h-6 w-7 px-0"><Moon className="size-3.5" /></TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Base container */}
              <div className="relative flex flex-col items-center px-8 pb-8 pt-6 gap-2">
                <div
                  className={[
                    "bg-background border border-border shadow-sm mx-auto",
                    PADDING_CLASS[padding],
                    RADIUS_CLASS[radius],
                  ].join(" ")}
                  style={containerStyle}
                >
                  <div className={["flex flex-col w-full", GAP_CLASS[gap]].join(" ")}>
                    {sections.map((section) => (
                      <SectionRow
                        key={section.id}
                        section={section}
                        gap={gap}
                        selectedUid={selectedUid}
                        draggingUid={draggingUid}
                        activeZoneId={activeZoneId}
                        isPreview={isPreview}
                        onActivate={handleActivateZone}
                        onAdd={handleAdd}
                        onMove={handleMove}
                        onRemove={handleRemove}
                        onSelect={(u) => { setSelectedUid(u); setActiveZoneId(null) }}
                        onDragStart={(u) => setDraggingUid(u)}
                        onDragEnd={() => setDraggingUid(null)}
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
                {/* Dimension badge below base */}
                <span className="text-[10px] font-mono text-zinc-400">
                  {width.mode === "hug" ? "auto" : `${width.px}px`}
                  {" × "}
                  {height.mode === "hug" ? "auto" : `${height.px}px`}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right side: component drawer or property editor */}
        {showDrawer && (
          <ComponentDrawer
            onAdd={(raw) => handleAdd(activeZoneId!, raw, Infinity)}
            onClose={() => setActiveZoneId(null)}
          />
        )}
        {showRightPanel && (
          <RightPanel
            component={compMap[selectedItem!.id]}
            propValues={selectedItem!.props}
            onChange={handlePropChange}
            lang={lang}
          />
        )}
      </div>
    </main>
  )
}

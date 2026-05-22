"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Palette, Layers, Shapes, ChevronDown, PuzzleIcon, Home,
  // Component item icons
  ChevronsUpDown, AlertCircle, AlertTriangle, BellRing,
  AppWindow, ChevronDown as ChevronDownIcon, CircleUser, Tag,
  MousePointerClick, Calendar, CheckSquare, TextCursorInput,
  Gauge, CircleDot, ListFilter, SlidersHorizontal, ToggleLeft,
  LayoutDashboard, AlignLeft, Info,
  // Icon category icons
  LayoutGrid, ArrowRight, FolderOpen, Circle, Type, BarChart2, MessageSquare,
  Clock, Play, MapPin, User, Shield, Code2, Monitor, Leaf, Utensils,
  DollarSign, Wrench, Heart, Building2, BookOpen, Calculator,
  ShoppingBag, Share2, Gamepad2, Sparkles, Box,
  Pipette, Radius, CaseSensitive,
} from "lucide-react"
import { categorizedComponents } from "./registry"
import { colorGroups, type ColorSwatch } from "./colors"
import { CATEGORY_COUNTS } from "./icon-categories"
import { translations, type Lang } from "./i18n"
import { TOKEN_SECTIONS, type TokenSectionId } from "./token-view"
import { theme } from "@/theme/tokens"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type ViewMode = "inicio" | "tokens" | "icons"

// ─── Component groups ────────────────────────────────────────────────────────

interface CompGroup {
  id: string
  label: string
  ids: string[]
}

const COMP_GROUPS: CompGroup[] = [
  {
    id: "feedback",
    label: "Feedback",
    ids: ["alert", "alert-dialog", "sonner", "tooltip"],
  },
  {
    id: "overlay",
    label: "Overlay",
    ids: ["dialog", "dropdown-menu"],
  },
  {
    id: "form",
    label: "Form & Inputs",
    ids: ["button", "button-group", "calendar", "checkbox", "input", "radio-group", "select", "slider", "switch", "textarea"],
  },
  {
    id: "display",
    label: "Display",
    ids: ["accordion", "avatar", "badge", "progress", "tabs"],
  },
]

// Icon per component id
const COMP_ITEM_ICONS: Record<string, LucideIcon> = {
  accordion:      ChevronsUpDown,
  alert:          AlertCircle,
  "alert-dialog": AlertTriangle,
  sonner:         BellRing,
  dialog:         AppWindow,
  "dropdown-menu": ChevronDownIcon,
  avatar:         CircleUser,
  badge:          Tag,
  button:         MousePointerClick,
  "button-group": LayoutGrid,
  calendar:       Calendar,
  checkbox:       CheckSquare,
  input:          TextCursorInput,
  progress:       Gauge,
  "radio-group":  CircleDot,
  select:         ListFilter,
  slider:         SlidersHorizontal,
  switch:         ToggleLeft,
  tabs:           LayoutDashboard,
  textarea:       AlignLeft,
  tooltip:        Info,
}

// ─── Token section → icon mapping ────────────────────────────────────────────

const TOKEN_SECTION_ICONS: Record<string, LucideIcon> = {
  colors:     Pipette,
  radius:     Radius,
  typography: CaseSensitive,
}

// ─── Icon category → icon mapping ────────────────────────────────────────────

const ICON_CATEGORY_ICONS: Record<string, LucideIcon> = {
  arrows:    ArrowRight,
  files:     FolderOpen,
  shapes:    Circle,
  text:      Type,
  layout:    LayoutGrid,
  charts:    BarChart2,
  comms:     MessageSquare,
  datetime:  Clock,
  media:     Play,
  maps:      MapPin,
  users:     User,
  security:  Shield,
  dev:       Code2,
  devices:   Monitor,
  nature:    Leaf,
  food:      Utensils,
  finance:   DollarSign,
  tools:     Wrench,
  health:    Heart,
  buildings: Building2,
  education: BookOpen,
  math:      Calculator,
  shopping:  ShoppingBag,
  social:    Share2,
  games:     Gamepad2,
  zodiac:    Sparkles,
  other:     Box,
}

// ─── Color item with copy ─────────────────────────────────────────────────────

const lightTokens = theme.light as Record<string, string>
const darkTokens  = theme.dark  as Record<string, string>

function tokenValue(variable: string): string {
  const key = variable.replace(/^--/, "")
  return lightTokens[key] ?? darkTokens[key] ?? variable
}

function ColorItem({ swatch }: { swatch: ColorSwatch }) {
  const [copied, setCopied] = useState(false)
  const value = tokenValue(swatch.variable)

  function handleCopy() {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <li>
      <button
        onClick={handleCopy}
        title={`Copy: ${value}`}
        className="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-sm text-zinc-400 hover:bg-[rgba(146,187,255,0.1)] hover:text-zinc-100 transition-colors cursor-pointer group"
      >
        <span className="truncate">{swatch.name}</span>
        <span className={[
          "font-mono text-[10px] shrink-0 transition-colors",
          copied ? "text-green-400" : "text-zinc-600 group-hover:text-zinc-400",
        ].join(" ")}>
          {copied ? "copied!" : value}
        </span>
      </button>
    </li>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface LeftPanelProps {
  view: ViewMode
  onViewChange: (v: ViewMode) => void
  selectedId: string
  onSelect: (id: string) => void
  lang: Lang
  onLangChange: (lang: Lang) => void
  selectedIconCategory: string | null
  onIconCategorySelect: (id: string | null) => void
  compositorOpen: boolean
  onCompositorToggle: (open: boolean) => void
  tokenSection: TokenSectionId | null
  onTokenSectionSelect: (id: TokenSectionId) => void
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export function LeftPanel({
  view,
  onViewChange,
  selectedId,
  onSelect,
  lang,
  onLangChange,
  selectedIconCategory,
  onIconCategorySelect,
  compositorOpen,
  onCompositorToggle,
  tokenSection,
  onTokenSectionSelect,
}: LeftPanelProps) {
  const t = translations[lang]
  const totalIcons = CATEGORY_COUNTS.reduce((acc, c) => acc + c.count, 0)
  const [componentsExpanded, setComponentsExpanded] = useState(true)

  // Flat component list indexed by ID for lookup
  const allComps = Object.values(categorizedComponents).flat()
  const compById = Object.fromEntries(allComps.map((c) => [c.id, c]))

  return (
    <aside className="dark w-1/5 min-w-[290px] max-w-[380px] shrink-0 flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">

      {/* Brand header */}
      <div className="p-4 border-b border-zinc-800 h-[74px] flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <img src="/isotipo.svg" alt="Fracttal" className="size-[42px]" />
          <div className="leading-none">
            <p className="text-base font-semibold text-white">Julia</p>
            <p className="text-[13px] text-zinc-500 mt-0.5">Design System</p>
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="px-4 pt-4">
        <Tabs value={view} onValueChange={(v) => onViewChange(v as ViewMode)}>
          <TabsList className="w-full">
            <TabsTrigger value="inicio" className="flex-1 gap-1 text-[11px]">
              <Home className="size-3.5" />
              {t.inicio}
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex-1 gap-1 text-[11px]">
              <Palette className="size-3.5" />
              {t.tokens}
            </TabsTrigger>
            <TabsTrigger value="icons" className="flex-1 gap-1 text-[11px]">
              <Shapes className="size-3.5" />
              {t.icons}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Navigation content */}
      <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">

        {/* ── Inicio view ── */}
        {view === "inicio" && (
          <div className="flex flex-col gap-1">

            {/* Componentes (expandable) */}
            <div>
              <button
                onClick={() => setComponentsExpanded((v) => !v)}
                className="group w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors cursor-pointer hover:bg-zinc-800"
              >
                <Layers className="size-3.5 shrink-0 text-zinc-500 group-hover:text-zinc-300" />
                <span className="flex-1 text-left text-sm font-medium text-zinc-300 group-hover:text-white">
                  Componentes
                </span>
                <ChevronDown className={cn(
                  "size-3.5 text-zinc-600 shrink-0 transition-transform duration-200",
                  componentsExpanded ? "rotate-0" : "-rotate-90",
                )} />
              </button>

              {componentsExpanded && (
                <div className="mt-1 flex flex-col gap-1">
                  {COMP_GROUPS.map((group, i) => {
                    const items = group.ids.map((id) => compById[id]).filter(Boolean)
                    return (
                      <div key={group.id}>
                        {i > 0 && <div className="h-px bg-zinc-800 mx-2 my-1" />}
                        <p className="px-2 py-1.5 text-[10px] font-medium text-zinc-500">
                          {group.label}
                        </p>
                        <ul className="flex flex-col gap-0.5">
                          {items.map((comp) => {
                            const isSelected = selectedId === comp.id && !compositorOpen
                            const ItemIcon = COMP_ITEM_ICONS[comp.id]
                            return (
                              <li key={comp.id}>
                                <button
                                  onClick={() => onSelect(comp.id)}
                                  className={cn(
                                    "w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer",
                                    isSelected
                                      ? "bg-blue-600 text-white font-medium"
                                      : "text-zinc-400 hover:bg-[rgba(146,187,255,0.1)] hover:text-zinc-100",
                                  )}
                                >
                                  {ItemIcon && (
                                    <ItemIcon className={cn(
                                      "size-3.5 shrink-0",
                                      isSelected ? "text-white" : "text-zinc-600",
                                    )} />
                                  )}
                                  {comp.name}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Compositor (no expandible) */}
            <button
              onClick={() => { onCompositorToggle(true) }}
              className={cn(
                "group w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer",
                compositorOpen
                  ? "bg-blue-600 text-white font-medium"
                  : "text-zinc-400 hover:bg-[rgba(146,187,255,0.1)] hover:text-zinc-100",
              )}
            >
              <PuzzleIcon className={cn(
                "size-3.5 shrink-0",
                compositorOpen ? "text-white" : "text-zinc-600 group-hover:text-zinc-300",
              )} />
              <span className="flex-1">Compositor</span>
              <span className={cn(
                "text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0",
                compositorOpen ? "bg-white/20 text-white" : "bg-blue-500/20 text-blue-400",
              )}>beta</span>
            </button>

          </div>
        )}

        {/* ── Tokens view ── */}
        {view === "tokens" && (
          <ul className="flex flex-col gap-0.5">
            {TOKEN_SECTIONS.map(({ id, label }) => {
              const SectionIcon = TOKEN_SECTION_ICONS[id] ?? Box
              return (
                <li key={id}>
                  <button
                    onClick={() => onTokenSectionSelect(id)}
                    className={cn(
                      "w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer",
                      tokenSection === id
                        ? "bg-blue-600 text-white font-medium"
                        : "text-zinc-400 hover:bg-[rgba(146,187,255,0.1)] hover:text-zinc-100",
                    )}
                  >
                    <SectionIcon className={cn("size-3.5 shrink-0", tokenSection === id ? "text-white" : "text-zinc-600")} />
                    <span>{label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        {/* ── Icons ── */}
        {view === "icons" && (
          <ul className="space-y-0.5">
            <li>
              <button
                onClick={() => onIconCategorySelect(null)}
                className={[
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer",
                  selectedIconCategory === null
                    ? "bg-blue-600 text-white font-medium"
                    : "text-zinc-400 hover:bg-[rgba(146,187,255,0.1)] hover:text-zinc-100",
                ].join(" ")}
              >
                <Shapes className="size-3.5 shrink-0" />
                <span className="flex-1 text-left">All</span>
                <span className={[
                  "text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0",
                  selectedIconCategory === null ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-500",
                ].join(" ")}>
                  {totalIcons}
                </span>
              </button>
            </li>

            {CATEGORY_COUNTS.map(({ id, label, count }) => {
              const CatIcon = ICON_CATEGORY_ICONS[id] ?? Box
              return (
                <li key={id}>
                  <button
                    onClick={() => onIconCategorySelect(id)}
                    className={[
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer",
                      selectedIconCategory === id
                        ? "bg-blue-600 text-white font-medium"
                        : "text-zinc-400 hover:bg-[rgba(146,187,255,0.1)] hover:text-zinc-100",
                    ].join(" ")}
                  >
                    <CatIcon className="size-3.5 shrink-0" />
                    <span className="flex-1 text-left">{label}</span>
                    <span className={[
                      "text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0",
                      selectedIconCategory === id ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-500",
                    ].join(" ")}>
                      {count}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
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

"use client"

import { useEffect, useRef, useState } from "react"
import { theme } from "@/theme/tokens"
import { type Lang } from "./i18n"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

// ── Token source maps ─────────────────────────────────────────────────────────

const lightMap = Object.fromEntries(
  Object.entries(theme.light).map(([k, v]) => [`--${k}`, v as string])
)
const darkMap = Object.fromEntries(
  Object.entries(theme.dark).map(([k, v]) => [`--${k}`, v as string])
)

// ── Token data ────────────────────────────────────────────────────────────────

interface TokenDef {
  name: string
  cssVar: string
  classes: string[]
}

interface ColorGroup {
  id: string
  label: string
  tokens: TokenDef[]
}

const COLOR_GROUPS: ColorGroup[] = [
  {
    id: "base", label: "Base",
    tokens: [
      { name: "background", cssVar: "--background", classes: ["bg-background"] },
      { name: "foreground", cssVar: "--foreground", classes: ["text-foreground"] },
    ],
  },
  {
    id: "primary", label: "Primary",
    tokens: [
      { name: "primary",            cssVar: "--primary",            classes: ["bg-primary", "text-primary", "border-primary", "ring-primary"] },
      { name: "primary-foreground", cssVar: "--primary-foreground", classes: ["text-primary-foreground"] },
    ],
  },
  {
    id: "secondary", label: "Secondary",
    tokens: [
      { name: "secondary",            cssVar: "--secondary",            classes: ["bg-secondary", "text-secondary"] },
      { name: "secondary-foreground", cssVar: "--secondary-foreground", classes: ["text-secondary-foreground"] },
    ],
  },
  {
    id: "muted", label: "Muted",
    tokens: [
      { name: "muted",            cssVar: "--muted",            classes: ["bg-muted", "text-muted"] },
      { name: "muted-foreground", cssVar: "--muted-foreground", classes: ["text-muted-foreground"] },
    ],
  },
  {
    id: "accent", label: "Accent",
    tokens: [
      { name: "accent",            cssVar: "--accent",            classes: ["bg-accent", "text-accent"] },
      { name: "accent-foreground", cssVar: "--accent-foreground", classes: ["text-accent-foreground"] },
    ],
  },
  {
    id: "destructive", label: "Destructive",
    tokens: [
      { name: "destructive",            cssVar: "--destructive",            classes: ["bg-destructive", "text-destructive", "border-destructive"] },
      { name: "destructive-foreground", cssVar: "--destructive-foreground", classes: ["text-destructive-foreground"] },
    ],
  },
  {
    id: "card", label: "Card",
    tokens: [
      { name: "card",            cssVar: "--card",            classes: ["bg-card"] },
      { name: "card-foreground", cssVar: "--card-foreground", classes: ["text-card-foreground"] },
    ],
  },
  {
    id: "popover", label: "Popover",
    tokens: [
      { name: "popover",            cssVar: "--popover",            classes: ["bg-popover"] },
      { name: "popover-foreground", cssVar: "--popover-foreground", classes: ["text-popover-foreground"] },
    ],
  },
  {
    id: "border", label: "Border & Ring",
    tokens: [
      { name: "border", cssVar: "--border", classes: ["border-border"] },
      { name: "input",  cssVar: "--input",  classes: ["border-input"] },
      { name: "ring",   cssVar: "--ring",   classes: ["ring-ring", "outline-ring"] },
    ],
  },
  {
    id: "status", label: "Status",
    tokens: [
      { name: "warning",            cssVar: "--warning",            classes: ["bg-warning", "text-warning", "border-warning"] },
      { name: "warning-foreground", cssVar: "--warning-foreground", classes: ["text-warning-foreground"] },
      { name: "success",            cssVar: "--success",            classes: ["bg-success", "text-success", "border-success"] },
      { name: "success-foreground", cssVar: "--success-foreground", classes: ["text-success-foreground"] },
      { name: "info",               cssVar: "--info",               classes: ["bg-info", "text-info", "border-info"] },
      { name: "info-foreground",    cssVar: "--info-foreground",    classes: ["text-info-foreground"] },
    ],
  },
  {
    id: "charts", label: "Charts",
    tokens: [
      { name: "chart-1", cssVar: "--chart-1", classes: ["bg-chart-1", "text-chart-1", "fill-chart-1", "stroke-chart-1"] },
      { name: "chart-2", cssVar: "--chart-2", classes: ["bg-chart-2", "text-chart-2", "fill-chart-2", "stroke-chart-2"] },
      { name: "chart-3", cssVar: "--chart-3", classes: ["bg-chart-3", "text-chart-3", "fill-chart-3", "stroke-chart-3"] },
      { name: "chart-4", cssVar: "--chart-4", classes: ["bg-chart-4", "text-chart-4", "fill-chart-4", "stroke-chart-4"] },
      { name: "chart-5", cssVar: "--chart-5", classes: ["bg-chart-5", "text-chart-5", "fill-chart-5", "stroke-chart-5"] },
    ],
  },
]

const BASE_RADIUS = 0.5
const RADIUS_SCALE = [
  { id: "sm",  cssVar: "--radius-sm",  tailwind: "rounded-sm",  value: `${(BASE_RADIUS * 0.6).toFixed(2)}rem` },
  { id: "md",  cssVar: "--radius-md",  tailwind: "rounded-md",  value: `${(BASE_RADIUS * 0.8).toFixed(2)}rem` },
  { id: "lg",  cssVar: "--radius-lg",  tailwind: "rounded-lg",  value: `${BASE_RADIUS}rem` },
  { id: "xl",  cssVar: "--radius-xl",  tailwind: "rounded-xl",  value: `${(BASE_RADIUS * 1.4).toFixed(2)}rem` },
  { id: "2xl", cssVar: "--radius-2xl", tailwind: "rounded-2xl", value: `${(BASE_RADIUS * 1.8).toFixed(2)}rem` },
  { id: "3xl", cssVar: "--radius-3xl", tailwind: "rounded-3xl", value: `${(BASE_RADIUS * 2.2).toFixed(2)}rem` },
  { id: "4xl", cssVar: "--radius-4xl", tailwind: "rounded-4xl", value: `${(BASE_RADIUS * 2.6).toFixed(2)}rem` },
]

const TYPOGRAPHY_STYLES = [
  { name: "H1",         label: "Heading 1",     el: "h1",         classes: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",                         sample: "Taxing Laughter: The Joke Tax Chronicles" },
  { name: "H2",         label: "Heading 2",     el: "h2",         classes: "scroll-m-20 text-3xl font-semibold tracking-tight",                                        sample: "The People of the Kingdom" },
  { name: "H3",         label: "Heading 3",     el: "h3",         classes: "scroll-m-20 text-2xl font-semibold tracking-tight",                                        sample: "The Joke Tax" },
  { name: "H4",         label: "Heading 4",     el: "h4",         classes: "scroll-m-20 text-xl font-semibold tracking-tight",                                         sample: "People stopped telling jokes" },
  { name: "p",          label: "Paragraph",     el: "p",          classes: "leading-7",                                                                                sample: "The king, seeing how much he was feared, sent tax collectors to every corner of his realm to collect the joke tax." },
  { name: "Lead",       label: "Lead",          el: "p",          classes: "text-xl text-muted-foreground",                                                            sample: "A modal dialog that interrupts the user with important content." },
  { name: "Large",      label: "Large",         el: "div",        classes: "text-lg font-semibold",                                                                    sample: "Are you absolutely sure?" },
  { name: "Small",      label: "Small",         el: "small",      classes: "text-sm font-medium leading-none",                                                         sample: "Email address" },
  { name: "Muted",      label: "Muted",         el: "p",          classes: "text-sm text-muted-foreground",                                                            sample: "Enter your email address." },
  { name: "Code",       label: "Inline code",   el: "code",       classes: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",        sample: "@radix-ui/react-alert-dialog" },
  { name: "Blockquote", label: "Blockquote",    el: "blockquote", classes: "border-l-2 pl-6 italic",                                                                   sample: "After all, everyone enjoys a good joke, so it's only fair that they should pay for the privilege." },
]

// ── Copy chip ─────────────────────────────────────────────────────────────────

function CopyChip({ label }: { label: string }) {
  const [copied, setCopied] = useState(false)

  function copy(e: React.MouseEvent) {
    e.stopPropagation()
    navigator.clipboard.writeText(label).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      onClick={copy}
      title={`Copiar "${label}"`}
      className={cn(
        "font-mono text-[10px] px-1.5 py-0.5 rounded border transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0",
        copied
          ? "bg-green-50 border-green-300 text-green-700"
          : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700",
      )}
    >
      {copied ? "✓ copiado" : label}
    </button>
  )
}

// ── Swatch pair: light + dark separated ──────────────────────────────────────

function SwatchPair({ lightColor, darkColor }: { lightColor: string; darkColor: string }) {
  return (
    <div className="flex gap-1.5 shrink-0">
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-8 h-6 rounded border border-black/10" style={{ backgroundColor: lightColor }} title={lightColor} />
        <span className="text-[9px] leading-none text-zinc-400">Light</span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-8 h-6 rounded border border-black/10" style={{ backgroundColor: darkColor }} title={darkColor} />
        <span className="text-[9px] leading-none text-zinc-400">Dark</span>
      </div>
    </div>
  )
}

// ── Section anchor ────────────────────────────────────────────────────────────

export const TOKEN_SECTIONS = [
  { id: "colors",     label: "Colores" },
  { id: "radius",     label: "Radio de borde" },
  { id: "typography", label: "Tipografía" },
] as const

export type TokenSectionId = (typeof TOKEN_SECTIONS)[number]["id"]

// ── Main component ────────────────────────────────────────────────────────────

export function TokenView({
  lang,
  activeSection,
}: {
  lang: Lang
  activeSection: TokenSectionId | null
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Partial<Record<TokenSectionId, HTMLElement | null>>>({})

  useEffect(() => {
    if (!activeSection || !scrollRef.current) return
    const el = sectionRefs.current[activeSection]
    if (el) scrollRef.current.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" })
  }, [activeSection])

  return (
    <main className="flex-1 min-w-0 flex flex-col overflow-hidden border-l border-zinc-200 bg-white">
      {/* Header */}
      <div className="px-8 h-[74px] shrink-0 flex items-center border-b border-zinc-100">
        <div>
          <h1 className="text-base font-semibold tracking-tight leading-none">Tokens</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            CSS variables y clases Tailwind — haz click en cualquier chip para copiar
          </p>
        </div>
      </div>

      {/* Scrollable body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="px-8 py-6 flex flex-col gap-10">

          {/* ── Colors ── */}
          <section ref={(el) => { sectionRefs.current.colors = el }}>
            <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-6 text-zinc-400">
              Colores
            </h2>

            <div className="flex items-center gap-4 px-2 mb-1">
              <div className="shrink-0 w-[70px]" />
              <span className="text-[10px] font-semibold w-44 shrink-0 text-zinc-400">Token</span>
              <span className="text-[10px] font-semibold w-56 shrink-0 text-zinc-400">CSS variable</span>
              <span className="text-[10px] font-semibold text-zinc-400">Tailwind classes</span>
            </div>

            <div className="flex flex-col gap-5">
              {COLOR_GROUPS.map((group) => (
                <div key={group.id}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider px-2 mb-1 text-zinc-400">
                    {group.label}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {group.tokens.map((token) => (
                      <div
                        key={token.name}
                        className="flex items-center gap-4 px-2 py-1.5 rounded-md transition-colors hover:bg-zinc-50"
                      >
                        <SwatchPair
                          lightColor={lightMap[token.cssVar] ?? "transparent"}
                          darkColor={darkMap[token.cssVar]  ?? "transparent"}
                        />
                        <span className="text-sm font-mono w-44 truncate shrink-0 text-zinc-700">
                          {token.name}
                        </span>
                        <div className="w-56 shrink-0">
                          <CopyChip label={token.cssVar} />
                        </div>
                        <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                          {token.classes.map((cls) => (
                            <CopyChip key={cls} label={cls} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="bg-zinc-100" />

          {/* ── Radius ── */}
          <section ref={(el) => { sectionRefs.current.radius = el }}>
            <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-6 text-zinc-400">
              Radio de borde
            </h2>

            <div className="flex flex-wrap gap-6">
              {RADIUS_SCALE.map((r) => (
                <div key={r.id} className="flex flex-col items-center gap-3">
                  <div
                    className="size-14 border-2 bg-zinc-100 border-zinc-300"
                    style={{ borderRadius: `var(${r.cssVar})` }}
                  />
                  <div className="flex flex-col items-center gap-1">
                    <CopyChip label={r.tailwind} />
                    <CopyChip label={r.cssVar} />
                    <span className="text-[10px] font-mono text-zinc-400">{r.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="bg-zinc-100" />

          {/* ── Typography ── */}
          <section ref={(el) => { sectionRefs.current.typography = el }}>
            <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-6 text-zinc-400">
              Tipografía
            </h2>

            <div className="flex flex-col gap-3">
              {TYPOGRAPHY_STYLES.map((style) => {
                const El = style.el as keyof JSX.IntrinsicElements
                return (
                  <div key={style.name} className="px-4 py-4 rounded-md border border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{style.label}</span>
                      <code className="text-[10px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded font-mono">&lt;{style.el}&gt;</code>
                    </div>
                    <El className={cn(style.classes, "text-zinc-800")}>{style.sample}</El>
                    <div className="mt-3 pt-3 border-t border-zinc-100">
                      <CopyChip label={style.classes} />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <div className="h-8" />
        </div>
      </div>
    </main>
  )
}

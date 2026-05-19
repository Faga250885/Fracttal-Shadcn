"use client"

import { useState } from "react"
import { components } from "./registry"
import type { ComponentEntry } from "./types"
import type { Lang } from "./i18n"
import { LeftPanel, type ViewMode } from "./left-panel"
import { PreviewArea } from "./preview-area"
import { RightPanel } from "./right-panel"
import { ColorView } from "./color-view"
import { IconView } from "./icon-view"

function defaultValues(component: ComponentEntry): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(component.controls).map(([key, ctrl]) => [
      key,
      ctrl.defaultValue,
    ])
  )
}

export function DSViewer() {
  const initial = components[0]
  const [view, setView] = useState<ViewMode>("components")
  const [selectedId, setSelectedId] = useState<string>(initial?.id ?? "")
  const [propValues, setPropValues] = useState<Record<string, unknown>>(
    initial ? defaultValues(initial) : {}
  )
  const [lang, setLang] = useState<Lang>("en")
  const [iconCategory, setIconCategory] = useState<string | null>(null)

  const selected = components.find((c) => c.id === selectedId)

  function handleSelect(id: string) {
    const comp = components.find((c) => c.id === id)
    if (!comp) return
    setSelectedId(id)
    setPropValues(defaultValues(comp))
  }

  function handleChange(key: string, value: unknown) {
    setPropValues((prev) => {
      const cascaded = selected?.cascade?.(key, value, prev) ?? {}
      return { ...prev, [key]: value, ...cascaded }
    })
  }

  function handleViewChange(v: ViewMode) {
    setView(v)
    if (v !== "icons") setIconCategory(null)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      <LeftPanel
        view={view}
        onViewChange={handleViewChange}
        selectedId={selectedId}
        onSelect={handleSelect}
        lang={lang}
        onLangChange={setLang}
        selectedIconCategory={iconCategory}
        onIconCategorySelect={setIconCategory}
      />

      {view === "colors" ? (
        <ColorView lang={lang} />
      ) : view === "icons" ? (
        <IconView lang={lang} selectedCategory={iconCategory} />
      ) : (
        <>
          <PreviewArea component={selected} propValues={propValues} lang={lang} />
          <RightPanel component={selected} propValues={propValues} onChange={handleChange} lang={lang} />
        </>
      )}
    </div>
  )
}

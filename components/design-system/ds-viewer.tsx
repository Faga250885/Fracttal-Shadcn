"use client"

import { useState } from "react"
import { components } from "./registry"
import type { ComponentEntry } from "./types"
import type { Lang } from "./i18n"
import { LeftPanel, type ViewMode } from "./left-panel"
import { PreviewArea } from "./preview-area"
import { RightPanel } from "./right-panel"
import { ColorView } from "./color-view"

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

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      <LeftPanel
        view={view}
        onViewChange={setView}
        selectedId={selectedId}
        onSelect={handleSelect}
        lang={lang}
        onLangChange={setLang}
      />

      {view === "colors" ? (
        <ColorView lang={lang} />
      ) : (
        <>
          <PreviewArea component={selected} propValues={propValues} lang={lang} />
          <RightPanel component={selected} propValues={propValues} onChange={handleChange} lang={lang} />
        </>
      )}
    </div>
  )
}

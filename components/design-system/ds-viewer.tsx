"use client"

import { useState } from "react"
import { components } from "./registry"
import type { ComponentEntry } from "./types"
import { LeftPanel } from "./left-panel"
import { PreviewArea } from "./preview-area"
import { RightPanel } from "./right-panel"

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
  const [selectedId, setSelectedId] = useState<string>(initial?.id ?? "")
  const [propValues, setPropValues] = useState<Record<string, unknown>>(
    initial ? defaultValues(initial) : {}
  )

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
    <div className="flex h-screen overflow-hidden bg-white">
      <LeftPanel selectedId={selectedId} onSelect={handleSelect} />
      <PreviewArea component={selected} propValues={propValues} />
      <RightPanel
        component={selected}
        propValues={propValues}
        onChange={handleChange}
      />
    </div>
  )
}

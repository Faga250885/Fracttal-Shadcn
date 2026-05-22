import { ReactNode } from "react"

export type ComponentExample = {
  title: string
  render: () => ReactNode
}

export type SelectControl = {
  type: "select"
  options: string[]
  defaultValue: string
}

export type BooleanControl = {
  type: "boolean"
  defaultValue: boolean
}

export type TextControl = {
  type: "text"
  defaultValue: string
}

export type NumberControl = {
  type: "number"
  defaultValue: number
  min?: number
  max?: number
  step?: number
}

export type ControlDefinition =
  | SelectControl
  | BooleanControl
  | TextControl
  | NumberControl

export type ComponentEntry = {
  id: string
  name: string
  description: { en: string; es: string }
  category: string
  filePath: string
  controls: Record<string, ControlDefinition>
  cascade?: (key: string, value: unknown, current: Record<string, unknown>) => Record<string, unknown>
  render: (props: Record<string, unknown>) => ReactNode
  /** Optional render used inside the Compositor (replaces `render` there). */
  compositorRender?: (props: Record<string, unknown>) => ReactNode
  generateCode: (props: Record<string, unknown>) => string
  examples?: ComponentExample[]
}

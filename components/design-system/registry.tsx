"use client"

import { Loader2, Search, User, Lock, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import type { ComponentEntry } from "./types"

export const components: ComponentEntry[] = [
  {
    id: "button",
    name: "Button",
    description:
      "Displays a button or a component that looks like a button.",
    category: "Componentes",
    filePath: "components/ui/button.tsx",
    controls: {
      children: { type: "text", defaultValue: "Button" },
      variant: {
        type: "select",
        options: [
          "default",
          "destructive",
          "outline",
          "secondary",
          "ghost",
          "link",
        ],
        defaultValue: "default",
      },
      size: {
        type: "select",
        options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
        defaultValue: "default",
      },
      disabled: { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { size, children, variant, disabled } = props as {
        size: string
        children: string
        disabled: boolean
        variant: string
      }
      const isIcon =
        typeof size === "string" && size.startsWith("icon")
      return (
        <Button size={size as never} variant={variant as never} disabled={disabled}>
          {isIcon ? <Loader2 /> : (children || "Button")}
        </Button>
      )
    },
    generateCode: (props) => {
      const { children, size, variant, disabled } = props as {
        children: string
        size: string
        variant: string
        disabled: boolean
      }
      const isIcon = size.startsWith("icon")

      const attrs: string[] = []
      if (variant !== "default") attrs.push(`variant="${variant}"`)
      if (size !== "default") attrs.push(`size="${size}"`)
      if (disabled) attrs.push("disabled")

      // Inline if 0-1 attrs, multiline if 2+
      let buttonJsx: string
      if (attrs.length <= 1) {
        const attrStr = attrs.length ? " " + attrs[0] : ""
        const content = isIcon ? "<Loader2 />" : (children || "Button")
        buttonJsx = `<Button${attrStr}>${content}</Button>`
      } else {
        const lines = [
          "<Button",
          ...attrs.map((a) => `  ${a}`),
          ">",
          `  ${isIcon ? "<Loader2 />" : (children || "Button")}`,
          "</Button>",
        ]
        buttonJsx = lines.join("\n")
      }

      const indented = buttonJsx
        .split("\n")
        .map((l) => `    ${l}`)
        .join("\n")

      const imports = [
        isIcon ? 'import { Loader2 } from "lucide-react"' : null,
        'import { Button } from "@/components/ui/button"',
      ]
        .filter(Boolean)
        .join("\n")

      return `${imports}

export default function Example() {
  return (
${indented}
  )
}`
    },
  },
  {
    id: "input",
    name: "Input",
    description: "Displays a form input field for text-based data entry.",
    category: "Componentes",
    filePath: "components/ui/input.tsx",
    controls: {
      type: {
        type: "select",
        options: ["text", "email", "password", "number", "search", "url", "tel", "file"],
        defaultValue: "email",
      },
      label: { type: "text", defaultValue: "Email" },
      placeholder: { type: "text", defaultValue: "tucorreo@ejemplo.com" },
      description: { type: "text", defaultValue: "" },
      disabled: { type: "boolean", defaultValue: false },
      required: { type: "boolean", defaultValue: false },
      invalid: { type: "boolean", defaultValue: false },
      showIcon: { type: "boolean", defaultValue: false },
      showButton: { type: "boolean", defaultValue: false },
    },
    cascade: (key, value) => {
      if (key !== "type") return {}
      const presets: Record<string, { label: string; placeholder: string }> = {
        text:     { label: "Nombre",      placeholder: "Ej. Juan García" },
        email:    { label: "Email",       placeholder: "tucorreo@ejemplo.com" },
        password: { label: "Contraseña",  placeholder: "••••••••" },
        number:   { label: "Cantidad",    placeholder: "0" },
        search:   { label: "",            placeholder: "Buscar..." },
        url:      { label: "Sitio web",   placeholder: "https://ejemplo.com" },
        tel:      { label: "Teléfono",    placeholder: "+34 600 000 000" },
        file:     { label: "Archivo",     placeholder: "" },
      }
      return presets[value as string] ?? {}
    },
    render: (props) => {
      const { label, placeholder, type, disabled, description, required, invalid, showIcon, showButton } = props as {
        label: string
        placeholder: string
        type: string
        disabled: boolean
        description: string
        required: boolean
        invalid: boolean
        showIcon: boolean
        showButton: boolean
      }

      const inputEl = (
        <div className={showIcon ? "relative flex-1 min-w-0" : showButton ? "flex-1 min-w-0" : ""}>
          {showIcon && (
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder={placeholder}
            type={type as never}
            disabled={disabled}
            required={required || undefined}
            aria-invalid={invalid ? "true" : undefined}
            className={showIcon ? "pl-8" : undefined}
          />
        </div>
      )

      return (
        <div className="w-72 flex flex-col gap-1.5">
          {label && (
            <label className="text-sm font-medium text-foreground">
              {label}
              {required && (
                <span className="text-destructive ml-1" aria-hidden="true">*</span>
              )}
            </label>
          )}
          {showButton ? (
            <div className="flex gap-2">
              {inputEl}
              <Button size="sm">Enviar</Button>
            </div>
          ) : inputEl}
          {description && !invalid && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {invalid && (
            <p className="text-xs text-destructive">El campo no es válido.</p>
          )}
        </div>
      )
    },
    generateCode: (props) => {
      const { label, placeholder, type, disabled, description, required, invalid, showIcon, showButton } = props as {
        label: string
        placeholder: string
        type: string
        disabled: boolean
        description: string
        required: boolean
        invalid: boolean
        showIcon: boolean
        showButton: boolean
      }

      const inputAttrs: string[] = []
      if (type !== "text") inputAttrs.push(`type="${type}"`)
      if (placeholder) inputAttrs.push(`placeholder="${placeholder}"`)
      if (disabled) inputAttrs.push("disabled")
      if (required) inputAttrs.push("required")
      if (invalid) inputAttrs.push('aria-invalid="true"')
      if (showIcon) inputAttrs.push('className="pl-8"')

      const inputTag =
        inputAttrs.length <= 1
          ? `<Input${inputAttrs.length ? " " + inputAttrs[0] : ""} />`
          : ["<Input", ...inputAttrs.map((a) => `  ${a}`), "/>"].join("\n")

      const iconLine = showIcon
        ? `<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />\n    `
        : ""

      const wrappedInput = showIcon
        ? `<div className="relative">\n    ${iconLine}${inputTag.split("\n").join("\n    ")}\n    </div>`
        : inputTag

      const labelContent = label
        ? `${label}${required ? `{" "}<span className="text-destructive" aria-hidden="true">*</span>` : ""}`
        : ""

      const labelLine = label
        ? `<label className="text-sm font-medium">\n      ${labelContent}\n    </label>\n    `
        : ""

      const descLine = description && !invalid
        ? `\n    <p className="text-xs text-muted-foreground">${description}</p>`
        : ""

      const errorLine = invalid
        ? `\n    <p className="text-xs text-destructive">El campo no es válido.</p>`
        : ""

      const buttonLine = showButton ? `\n    <Button>Enviar</Button>` : ""

      const inner = showButton
        ? `${labelLine}<div className="flex gap-2">\n      ${wrappedInput.split("\n").join("\n      ")}\n      <Button>Enviar</Button>\n    </div>${descLine}${errorLine}`
        : `${labelLine}${wrappedInput}${descLine}${errorLine}`

      const indented = inner
        .split("\n")
        .map((l) => `    ${l}`)
        .join("\n")

      const imports = [
        showIcon ? 'import { Search } from "lucide-react"' : null,
        showButton ? 'import { Button } from "@/components/ui/button"' : null,
        'import { Input } from "@/components/ui/input"',
      ]
        .filter(Boolean)
        .join("\n")

      return `${imports}

export default function Example() {
  return (
${indented}
  )
}`
    },
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "A set of layered sections of content — known as tab panels — that are displayed one at a time.",
    category: "Componentes",
    filePath: "components/ui/tabs.tsx",
    controls: {
      variant: {
        type: "select",
        options: ["default", "line"],
        defaultValue: "default",
      },
      orientation: {
        type: "select",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      },
      tab1: { type: "text", defaultValue: "Cuenta" },
      tab2: { type: "text", defaultValue: "Contraseña" },
      tab3: { type: "text", defaultValue: "Notificaciones" },
      disabled: { type: "boolean", defaultValue: false },
      icons: {
        type: "select",
        options: ["ninguno", "con texto", "solo iconos"],
        defaultValue: "ninguno",
      },
    },
    render: (props) => {
      const { variant, orientation, tab1, tab2, tab3, disabled, icons } = props as {
        variant: "default" | "line"
        orientation: "horizontal" | "vertical"
        tab1: string
        tab2: string
        tab3: string
        disabled: boolean
        icons: "ninguno" | "con texto" | "solo iconos"
      }
      const iconEls = [<User className="size-4" />, <Lock className="size-4" />, <Bell className="size-4" />]
      const labels = [tab1 || "Tab 1", tab2 || "Tab 2", tab3 || "Tab 3"]
      const keys = ["tab1", "tab2", "tab3"]
      const showIcon = icons !== "ninguno"
      const showLabel = icons !== "solo iconos"
      return (
        <Tabs defaultValue="tab1" orientation={orientation} className="w-80">
          <TabsList variant={variant}>
            {keys.map((k, i) => (
              <TabsTrigger key={k} value={k} disabled={disabled && i === 1}>
                {showIcon && iconEls[i]}
                {showLabel && labels[i]}
              </TabsTrigger>
            ))}
          </TabsList>
          {keys.map((k, i) => (
            <TabsContent key={k} value={k}>
              <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
                Contenido de {labels[i]}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )
    },
    generateCode: (props) => {
      const { variant, orientation, tab1, tab2, tab3, disabled, icons } = props as {
        variant: string
        orientation: string
        tab1: string
        tab2: string
        tab3: string
        disabled: boolean
        icons: string
      }

      const showIcon = icons !== "ninguno"
      const showLabel = icons !== "solo iconos"

      const tabsAttrs: string[] = ['defaultValue="tab1"']
      if (orientation !== "horizontal") tabsAttrs.push(`orientation="${orientation}"`)

      const listAttrs: string[] = []
      if (variant !== "default") listAttrs.push(`variant="${variant}"`)

      const tabsOpen = tabsAttrs.length === 1
        ? `<Tabs ${tabsAttrs[0]}>`
        : `<Tabs\n  ${tabsAttrs.join("\n  ")}\n>`

      const listOpen = listAttrs.length === 0 ? `<TabsList>` : `<TabsList ${listAttrs[0]}>`

      const labels = [tab1 || "Tab 1", tab2 || "Tab 2", tab3 || "Tab 3"]
      const keys = ["tab1", "tab2", "tab3"]
      const iconNames = ["User", "Lock", "Bell"]

      const triggers = keys.map((k, i) => {
        const attrs: string[] = [`value="${k}"`]
        if (disabled && i === 1) attrs.push("disabled")
        const iconPart = showIcon ? `<${iconNames[i]} className="size-4" />` : ""
        const labelPart = showLabel ? labels[i] : ""
        return `  <TabsTrigger ${attrs.join(" ")}>${iconPart}${labelPart}</TabsTrigger>`
      }).join("\n")

      const panels = keys.map((k, i) => [
        `<TabsContent value="${k}">`,
        `  <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">`,
        `    Contenido de ${labels[i]}`,
        `  </div>`,
        `</TabsContent>`,
      ].join("\n")).join("\n")

      const body = [
        tabsOpen,
        `  ${listOpen}`,
        triggers.split("\n").map(l => `  ${l}`).join("\n"),
        `  </TabsList>`,
        panels.split("\n").map(l => `  ${l}`).join("\n"),
        `</Tabs>`,
      ].join("\n")

      const indented = body.split("\n").map(l => `    ${l}`).join("\n")

      const iconImport = showIcon
        ? `import { ${iconNames.join(", ")} } from "lucide-react"\n` : ""

      return `${iconImport}import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Example() {
  return (
${indented}
  )
}`
    },
  },
  {
    id: "select",
    name: "Select",
    description: "Displays a list of options for the user to pick from — triggered by a button.",
    category: "Componentes",
    filePath: "components/ui/select.tsx",
    controls: {
      placeholder: { type: "text", defaultValue: "Selecciona una opción" },
      size: {
        type: "select",
        options: ["default", "sm"],
        defaultValue: "default",
      },
      disabled: { type: "boolean", defaultValue: false },
      invalid: { type: "boolean", defaultValue: false },
      groups: { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { placeholder, size, disabled, invalid, groups } = props as {
        placeholder: string
        size: "default" | "sm"
        disabled: boolean
        invalid: boolean
        groups: boolean
      }
      return (
        <Select>
          <SelectTrigger
            size={size}
            className="w-52"
            disabled={disabled}
            aria-invalid={invalid ? "true" : undefined}
          >
            <SelectValue placeholder={placeholder || "Selecciona una opción"} />
          </SelectTrigger>
          <SelectContent>
            {groups ? (
              <>
                <SelectGroup>
                  <SelectLabel>Frutas</SelectLabel>
                  <SelectItem value="manzana">Manzana</SelectItem>
                  <SelectItem value="naranja">Naranja</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Verduras</SelectLabel>
                  <SelectItem value="zanahoria">Zanahoria</SelectItem>
                  <SelectItem value="brocoli">Brócoli</SelectItem>
                  <SelectItem value="espinaca">Espinaca</SelectItem>
                </SelectGroup>
              </>
            ) : (
              <>
                <SelectItem value="manzana">Manzana</SelectItem>
                <SelectItem value="naranja">Naranja</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="uva">Uva</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      )
    },
    generateCode: (props) => {
      const { placeholder, size, disabled, invalid, groups } = props as {
        placeholder: string
        size: string
        disabled: boolean
        invalid: boolean
        groups: boolean
      }

      const triggerAttrs: string[] = ['className="w-52"']
      if (size !== "default") triggerAttrs.push(`size="${size}"`)
      if (disabled) triggerAttrs.push("disabled")
      if (invalid) triggerAttrs.push('aria-invalid="true"')

      const triggerAttrStr = triggerAttrs.join(" ")
      const ph = placeholder || "Selecciona una opción"

      const items = groups
        ? [
            `<SelectGroup>`,
            `  <SelectLabel>Frutas</SelectLabel>`,
            `  <SelectItem value="manzana">Manzana</SelectItem>`,
            `  <SelectItem value="naranja">Naranja</SelectItem>`,
            `  <SelectItem value="banana">Banana</SelectItem>`,
            `</SelectGroup>`,
            `<SelectSeparator />`,
            `<SelectGroup>`,
            `  <SelectLabel>Verduras</SelectLabel>`,
            `  <SelectItem value="zanahoria">Zanahoria</SelectItem>`,
            `  <SelectItem value="brocoli">Brócoli</SelectItem>`,
            `  <SelectItem value="espinaca">Espinaca</SelectItem>`,
            `</SelectGroup>`,
          ].join("\n")
        : [
            `<SelectItem value="manzana">Manzana</SelectItem>`,
            `<SelectItem value="naranja">Naranja</SelectItem>`,
            `<SelectItem value="banana">Banana</SelectItem>`,
            `<SelectItem value="uva">Uva</SelectItem>`,
            `<SelectItem value="mango">Mango</SelectItem>`,
          ].join("\n")

      const body = [
        `<Select>`,
        `  <SelectTrigger ${triggerAttrStr}>`,
        `    <SelectValue placeholder="${ph}" />`,
        `  </SelectTrigger>`,
        `  <SelectContent>`,
        items.split("\n").map(l => `    ${l}`).join("\n"),
        `  </SelectContent>`,
        `</Select>`,
      ].join("\n")

      const indented = body.split("\n").map(l => `    ${l}`).join("\n")

      const named = groups
        ? "Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue"
        : "Select, SelectContent, SelectItem, SelectTrigger, SelectValue"

      return `import { ${named} } from "@/components/ui/select"

export default function Example() {
  return (
${indented}
  )
}`
    },
  },
]

export const categorizedComponents = components.reduce<
  Record<string, ComponentEntry[]>
>((acc, comp) => {
  if (!acc[comp.category]) acc[comp.category] = []
  acc[comp.category].push(comp)
  return acc
}, {})

"use client"

import React from "react"
import { Loader2, Search, Mail, User, Lock, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
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
    description: {
      en: "Displays a button or a component that looks like a button.",
      es: "Muestra un botón o un componente que se parece a un botón.",
    },
    category: "Components",
    filePath: "components/ui/button.tsx",
    controls: {
      children: { type: "text", defaultValue: "Button" },
      variant: {
        type: "select",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
        defaultValue: "default",
      },
      size: {
        type: "select",
        options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
        defaultValue: "default",
      },
      icon: {
        type: "select",
        options: ["none", "start", "end"],
        defaultValue: "none",
      },
      loading: { type: "boolean", defaultValue: false },
      disabled: { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { size, children, variant, disabled, loading, icon } = props as {
        size: string; children: string; variant: string
        disabled: boolean; loading: boolean; icon: string
      }
      const isIconSize = size.startsWith("icon")

      let content: React.ReactNode
      if (loading) {
        content = <><Loader2 className="animate-spin" />{!isIconSize && (children || "Button")}</>
      } else if (isIconSize) {
        content = <Mail />
      } else if (icon === "start") {
        content = <><Mail />{children || "Button"}</>
      } else if (icon === "end") {
        content = <>{children || "Button"}<Mail /></>
      } else {
        content = <>{children || "Button"}</>
      }

      return (
        <Button size={size as never} variant={variant as never} disabled={disabled || loading}>
          {content}
        </Button>
      )
    },
    generateCode: (props) => {
      const { children, size, variant, disabled, loading, icon } = props as {
        children: string; size: string; variant: string
        disabled: boolean; loading: boolean; icon: string
      }
      const isIconSize = size.startsWith("icon")
      const needsMailIcon = isIconSize || icon === "start" || icon === "end"
      const needsLoader = loading

      let innerContent: string
      if (loading) {
        innerContent = isIconSize
          ? `\n  <Loader2 className="animate-spin" />\n`
          : `\n  <Loader2 className="animate-spin" />\n  ${children || "Button"}\n`
      } else if (isIconSize) {
        innerContent = `\n  <Mail />\n`
      } else if (icon === "start") {
        innerContent = `\n  <Mail />\n  ${children || "Button"}\n`
      } else if (icon === "end") {
        innerContent = `\n  ${children || "Button"}\n  <Mail />\n`
      } else {
        innerContent = children || "Button"
      }

      const attrs: string[] = []
      if (variant !== "default") attrs.push(`variant="${variant}"`)
      if (size !== "default") attrs.push(`size="${size}"`)
      if (disabled || loading) attrs.push("disabled")

      const attrStr = attrs.length
        ? attrs.length === 1
          ? ` ${attrs[0]}`
          : `\n  ${attrs.join("\n  ")}\n`
        : ""

      const multilineAttrs = attrs.length >= 2
      const buttonJsx = multilineAttrs
        ? `<Button${attrStr}>${innerContent.startsWith("\n") ? innerContent : `\n  ${innerContent}\n`}</Button>`
        : `<Button${attrStr}>${innerContent}</Button>`

      const indented = buttonJsx.split("\n").map((l) => `    ${l}`).join("\n")

      const lucideImports: string[] = []
      if (needsLoader) lucideImports.push("Loader2")
      if (needsMailIcon && !loading) lucideImports.push("Mail")
      const lucideLine = lucideImports.length
        ? `import { ${lucideImports.join(", ")} } from "lucide-react"\n` : ""

      return `${lucideLine}import { Button } from "@/components/ui/button"

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
    description: {
      en: "Displays a form input field for text-based data entry.",
      es: "Muestra un campo de formulario para la entrada de texto.",
    },
    category: "Components",
    filePath: "components/ui/input.tsx",
    controls: {
      type: {
        type: "select",
        options: ["text", "email", "password", "number", "search", "url", "tel", "file"],
        defaultValue: "email",
      },
      label: { type: "text", defaultValue: "Email" },
      placeholder: { type: "text", defaultValue: "your@email.com" },
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
        text:     { label: "Name",     placeholder: "e.g. John Smith" },
        email:    { label: "Email",    placeholder: "your@email.com" },
        password: { label: "Password", placeholder: "••••••••" },
        number:   { label: "Amount",   placeholder: "0" },
        search:   { label: "",         placeholder: "Search..." },
        url:      { label: "Website",  placeholder: "https://example.com" },
        tel:      { label: "Phone",    placeholder: "+1 800 000 0000" },
        file:     { label: "File",     placeholder: "" },
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
              <Button size="sm">Send</Button>
            </div>
          ) : inputEl}
          {description && !invalid && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {invalid && (
            <p className="text-xs text-destructive">This field is not valid.</p>
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
        ? `\n    <p className="text-xs text-destructive">This field is not valid.</p>`
        : ""

      const buttonLine = showButton ? `\n    <Button>Send</Button>` : ""

      const inner = showButton
        ? `${labelLine}<div className="flex gap-2">\n      ${wrappedInput.split("\n").join("\n      ")}\n      <Button>Send</Button>\n    </div>${descLine}${errorLine}`
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
    description: {
      en: "A set of layered sections of content — known as tab panels — that are displayed one at a time.",
      es: "Un conjunto de secciones de contenido apiladas, conocidas como paneles de pestañas, que se muestran de una en una.",
    },
    category: "Components",
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
      tab1: { type: "text", defaultValue: "Account" },
      tab2: { type: "text", defaultValue: "Password" },
      tab3: { type: "text", defaultValue: "Notifications" },
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
                Content of {labels[i]}
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
        `    Content of ${labels[i]}`,
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
    description: {
      en: "Displays a list of options for the user to pick from — triggered by a button.",
      es: "Muestra una lista de opciones para que el usuario elija — activada por un botón.",
    },
    category: "Components",
    filePath: "components/ui/select.tsx",
    controls: {
      placeholder: { type: "text", defaultValue: "Select an option" },
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
            <SelectValue placeholder={placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {groups ? (
              <>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Vegetables</SelectLabel>
                  <SelectItem value="carrot">Carrot</SelectItem>
                  <SelectItem value="broccoli">Broccoli</SelectItem>
                  <SelectItem value="spinach">Spinach</SelectItem>
                </SelectGroup>
              </>
            ) : (
              <>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
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
      const ph = placeholder || "Select an option"

      const items = groups
        ? [
            `<SelectGroup>`,
            `  <SelectLabel>Fruits</SelectLabel>`,
            `  <SelectItem value="apple">Apple</SelectItem>`,
            `  <SelectItem value="orange">Orange</SelectItem>`,
            `  <SelectItem value="banana">Banana</SelectItem>`,
            `</SelectGroup>`,
            `<SelectSeparator />`,
            `<SelectGroup>`,
            `  <SelectLabel>Vegetables</SelectLabel>`,
            `  <SelectItem value="carrot">Carrot</SelectItem>`,
            `  <SelectItem value="broccoli">Broccoli</SelectItem>`,
            `  <SelectItem value="spinach">Spinach</SelectItem>`,
            `</SelectGroup>`,
          ].join("\n")
        : [
            `<SelectItem value="apple">Apple</SelectItem>`,
            `<SelectItem value="orange">Orange</SelectItem>`,
            `<SelectItem value="banana">Banana</SelectItem>`,
            `<SelectItem value="grape">Grape</SelectItem>`,
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
  {
    id: "switch",
    name: "Switch",
    description: {
      en: "A control that allows the user to toggle between checked and unchecked states.",
      es: "Un control que permite al usuario alternar entre estados activado y desactivado.",
    },
    category: "Components",
    filePath: "components/ui/switch.tsx",
    controls: {
      checked: { type: "boolean", defaultValue: false },
      size: {
        type: "select",
        options: ["default", "sm", "lg"],
        defaultValue: "default",
      },
      disabled: { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { checked, size, disabled } = props as {
        checked: boolean
        size: "default" | "sm" | "lg"
        disabled: boolean
      }
      return (
        <Switch
          key={String(checked)}
          defaultChecked={checked}
          size={size}
          disabled={disabled}
        />
      )
    },
    generateCode: (props) => {
      const { checked, size, disabled } = props as {
        checked: boolean
        size: string
        disabled: boolean
      }

      const attrs: string[] = []
      if (checked) attrs.push("defaultChecked")
      if (size !== "default") attrs.push(`size="${size}"`)
      if (disabled) attrs.push("disabled")

      const attrStr = attrs.length === 0
        ? ""
        : attrs.length === 1
          ? ` ${attrs[0]}`
          : `\n  ${attrs.join("\n  ")}\n`

      const tag = attrs.length >= 2
        ? `<Switch${attrStr}/>`
        : `<Switch${attrStr} />`

      const indented = tag.split("\n").map((l) => `    ${l}`).join("\n")

      return `import { Switch } from "@/components/ui/switch"

export default function Example() {
  return (
${indented}
  )
}`
    },
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: {
      en: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      es: "Un popup que muestra información relacionada con un elemento al recibir el foco o pasar el cursor sobre él.",
    },
    category: "Components",
    filePath: "components/ui/tooltip.tsx",
    controls: {
      content: { type: "text", defaultValue: "This is a tooltip" },
      side: {
        type: "select",
        options: ["top", "right", "bottom", "left"],
        defaultValue: "top",
      },
      trigger: { type: "text", defaultValue: "Hover me" },
    },
    render: (props) => {
      const { content, side, trigger } = props as {
        content: string
        side: "top" | "right" | "bottom" | "left"
        trigger: string
      }
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">{trigger || "Hover me"}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>
              {content || "This is a tooltip"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    generateCode: (props) => {
      const { content, side, trigger } = props as {
        content: string
        side: string
        trigger: string
      }

      const contentAttrs = side !== "top" ? ` side="${side}"` : ""

      return `import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">${trigger || "Hover me"}</Button>
        </TooltipTrigger>
        <TooltipContent${contentAttrs}>
          ${content || "This is a tooltip"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`
    },
  },
  {
    id: "calendar",
    name: "Calendar",
    description: {
      en: "A calendar component for selecting single dates or date ranges.",
      es: "Un componente de calendario para seleccionar fechas individuales o rangos de fechas.",
    },
    category: "Components",
    filePath: "components/ui/calendar.tsx",
    controls: {
      mode: {
        type: "select",
        options: ["single", "range"],
        defaultValue: "single",
      },
      showOutsideDays: { type: "boolean", defaultValue: true },
    },
    render: (props) => {
      const { mode, showOutsideDays } = props as { mode: string; showOutsideDays: boolean }

      function SingleCalendar() {
        const [date, setDate] = React.useState<Date | undefined>(undefined)
        return (
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            showOutsideDays={showOutsideDays}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700"
          />
        )
      }

      function RangeCalendar() {
        const [range, setRange] = React.useState<{ from: Date | undefined; to?: Date } | undefined>(undefined)
        return (
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange as never}
            showOutsideDays={showOutsideDays}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700"
          />
        )
      }

      return mode === "range" ? <RangeCalendar /> : <SingleCalendar />
    },
    generateCode: (props) => {
      const { mode, showOutsideDays } = props as { mode: string; showOutsideDays: boolean }
      const isRange = mode === "range"
      const stateVar = isRange ? "range" : "date"
      const stateSetter = isRange ? "setRange" : "setDate"
      const stateType = isRange ? `{ from: Date | undefined; to?: Date } | undefined` : `Date | undefined`
      const rangeImport = isRange ? `\nimport type { DateRange } from "react-day-picker"` : ""

      const attrs = [
        `mode="${mode}"`,
        `selected={${stateVar}}`,
        `onSelect={${stateSetter}}`,
        !showOutsideDays && `showOutsideDays={false}`,
        `className="rounded-xl border border-zinc-200"`,
      ].filter(Boolean) as string[]

      const calendarJsx = ["<Calendar", ...attrs.map(a => `  ${a}`), "/>"].join("\n")
      const indented = calendarJsx.split("\n").map(l => `    ${l}`).join("\n")

      return `"use client"

import { useState } from "react"${rangeImport}
import { Calendar } from "@/components/ui/calendar"

export default function Example() {
  const [${stateVar}, ${stateSetter}] = useState<${stateType}>(undefined)
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

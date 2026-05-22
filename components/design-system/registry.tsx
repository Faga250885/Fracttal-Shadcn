"use client"

import React from "react"
import {
  Loader2, Search, Mail, User, Lock, Bell,
  Tag, Info, AlertCircle,
  CreditCard, Settings, Users, UserPlus, Plus, LogOut, Trash2,
  LayoutGrid, Activity, PanelLeft,
  PanelTop, PanelBottom, PanelRight,
  Circle, Square, Triangle, Star,
  Apple, Banana, Grape, Cherry, Citrus, Carrot, Leaf, Sprout,
} from "lucide-react"

// ─── Button icon helper ───────────────────────────────────────────────────────

function ButtonIcon({ name, className }: { name: string; className?: string }) {
  if (!name || name === "none") return null
  const Icon = ICONS_MAP.get(name)
  return Icon ? <Icon className={className} /> : null
}

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogFooter, AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel, AlertDialogMedia,
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  Avatar, AvatarImage, AvatarFallback,
  AvatarBadge, AvatarGroup, AvatarGroupCount,
} from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger,
  DropdownMenuSubContent, DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import type { ComponentEntry } from "./types"
import { ICONS_MAP } from "./icon-categories"

export const components: ComponentEntry[] = [

  // ─── ACCORDION ───────────────────────────────────────────────────────────────
  {
    id: "accordion",
    name: "Accordion",
    description: {
      en: "A vertically stacked set of interactive headings that reveal or hide associated content.",
      es: "Un conjunto de encabezados interactivos apilados verticalmente que muestran u ocultan contenido.",
    },
    category: "Components",
    filePath: "components/ui/accordion.tsx",
    controls: {
      type:         { type: "select",  options: ["single", "multiple"], defaultValue: "single" },
      itemCount:    { type: "select",  options: ["2", "3", "4"], defaultValue: "3" },
      collapsible:  { type: "boolean", defaultValue: true },
      defaultOpen:  { type: "boolean", defaultValue: true },
      bordered:     { type: "boolean", defaultValue: false },
      disabled:     { type: "boolean", defaultValue: false },
      showIcons:    { type: "boolean", defaultValue: false },
    },
    cascade: (key, value, current) => {
      if (key === "bordered" && value === true) return { defaultOpen: true }
      return {}
    },
    render: (props) => {
      const { type, itemCount, collapsible, defaultOpen, bordered, disabled, showIcons } = props as {
        type: "single" | "multiple"
        itemCount: string
        collapsible: boolean
        defaultOpen: boolean
        bordered: boolean
        disabled: boolean
        showIcons: boolean
      }
      const count = Number(itemCount) || 3
      const SAMPLE_ICONS = [Info, Settings, Activity, LayoutGrid]
      const items = [
        { value: "item-1", trigger: "Is it accessible?",    content: "Yes. It adheres to the WAI-ARIA design pattern." },
        { value: "item-2", trigger: "Is it styled?",         content: "Yes. It comes with default styles that match the other components' aesthetic." },
        { value: "item-3", trigger: "Is it animated?",       content: "Yes. It's animated by default, but you can disable it if you prefer." },
        { value: "item-4", trigger: "Can I customize it?",   content: "Yes. You can customize the styles using Tailwind CSS classes." },
      ].slice(0, count)

      const accordionProps =
        type === "single"
          ? { type: "single" as const, defaultValue: defaultOpen ? "item-1" : undefined, collapsible }
          : { type: "multiple" as const, defaultValue: defaultOpen ? ["item-1"] : [] }

      const remountKey = `${bordered}-${defaultOpen}-${type}`

      return (
        <Accordion key={remountKey} {...accordionProps} className={bordered ? "w-80 border rounded-lg px-4" : "w-80"}>
          {items.map((item, i) => {
            const Icon = SAMPLE_ICONS[i]
            return (
              <AccordionItem key={item.value} value={item.value} disabled={disabled}>
                <AccordionTrigger>
                  {showIcons ? (
                    <span className="flex items-center gap-2">
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      {item.trigger}
                    </span>
                  ) : item.trigger}
                </AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      )
    },
    generateCode: (props) => {
      const { type, itemCount, collapsible, defaultOpen, bordered, disabled } = props as {
        type: string; itemCount: string; collapsible: boolean; defaultOpen: boolean
        bordered: boolean; disabled: boolean
      }
      const count = Number(itemCount) || 3
      const items = [
        { value: "item-1", trigger: "Is it accessible?",   content: "Yes. It adheres to the WAI-ARIA design pattern." },
        { value: "item-2", trigger: "Is it styled?",        content: "Yes. It comes with default styles that match the other components' aesthetic." },
        { value: "item-3", trigger: "Is it animated?",      content: "Yes. It's animated by default, but you can disable it if you prefer." },
        { value: "item-4", trigger: "Can I customize it?",  content: "Yes. You can customize the styles using Tailwind CSS classes." },
      ].slice(0, count)

      const { showIcons } = props as { showIcons: boolean }
      const ICON_NAMES = ["Info", "Settings", "Activity", "LayoutGrid"]
      const rootAttrs: string[] = [`type="${type}"`]
      if (type === "single") {
        if (defaultOpen) rootAttrs.push(`defaultValue="item-1"`)
        if (collapsible) rootAttrs.push(`collapsible`)
      } else {
        if (defaultOpen) rootAttrs.push(`defaultValue={["item-1"]}`)
      }
      rootAttrs.push(bordered ? `className="w-80 border rounded-lg px-4"` : `className="w-80"`)

      const triggerContent = (text: string, iconName: string) => showIcons
        ? `<span className="flex items-center gap-2">\n        <${iconName} className="size-4 shrink-0 text-muted-foreground" />\n        ${text}\n      </span>`
        : text

      const itemRows = items.map((item, i) => {
        const disabledAttr = disabled ? " disabled" : ""
        return [
          `  <AccordionItem value="${item.value}"${disabledAttr}>`,
          `    <AccordionTrigger>${triggerContent(item.trigger, ICON_NAMES[i])}</AccordionTrigger>`,
          `    <AccordionContent>${item.content}</AccordionContent>`,
          `  </AccordionItem>`,
        ].join("\n")
      }).join("\n")

      const attrStr = rootAttrs.join(" ")
      const body = `<Accordion ${attrStr}>\n${itemRows}\n</Accordion>`
      const indented = body.split("\n").map(l => `    ${l}`).join("\n")
      const lucideImport = showIcons
        ? `import { ${ICON_NAMES.slice(0, count).join(", ")} } from "lucide-react"\n`
        : ""
      return `${lucideImport}import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── ALERT ───────────────────────────────────────────────────────────────────
  {
    id: "alert",
    name: "Alert",
    description: {
      en: "Displays a callout for user attention — informational or destructive.",
      es: "Muestra un aviso para llamar la atención del usuario — informativo o destructivo.",
    },
    category: "Components",
    filePath: "components/ui/alert.tsx",
    controls: {
      variant:     { type: "select",  options: ["default","destructive"], defaultValue: "default" },
      title:       { type: "text",    defaultValue: "Heads up!" },
      description: { type: "text",    defaultValue: "You can add components to your app using the CLI." },
      showIcon:    { type: "boolean", defaultValue: true },
      showAction:  { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { variant, title, description, showIcon, showAction } = props as {
        variant: "default" | "destructive"; title: string; description: string
        showIcon: boolean; showAction: boolean
      }
      return (
        <Alert variant={variant} className="max-w-sm">
          {showIcon && (variant === "destructive" ? <AlertCircle /> : <Info />)}
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && <AlertDescription>{description}</AlertDescription>}
          {showAction && (
            <AlertAction>
              <Button size="xs" variant={variant}>Dismiss</Button>
            </AlertAction>
          )}
        </Alert>
      )
    },
    generateCode: (props) => {
      const { variant, title, description, showIcon, showAction } = props as {
        variant: string; title: string; description: string; showIcon: boolean; showAction: boolean
      }
      const variantAttr = variant !== "default" ? ` variant="${variant}"` : ""
      const iconTag = showIcon ? (variant === "destructive" ? `\n  <AlertCircle />` : `\n  <Info />`) : ""
      const titleTag = title ? `\n  <AlertTitle>${title}</AlertTitle>` : ""
      const descTag  = description ? `\n  <AlertDescription>${description}</AlertDescription>` : ""
      const btnVariantAttr = variant !== "default" ? ` variant="${variant}"` : ""
      const actionTag = showAction ? `\n  <AlertAction>\n    <Button size="xs"${btnVariantAttr}>Dismiss</Button>\n  </AlertAction>` : ""
      const body = `<Alert${variantAttr}>${iconTag}${titleTag}${descTag}${actionTag}\n</Alert>`
      const indented = body.split("\n").map(l=>`    ${l}`).join("\n")
      const iconName = showIcon ? (variant === "destructive" ? "AlertCircle" : "Info") : null
      const iconLine = iconName ? `import { ${iconName} } from "lucide-react"\n` : ""
      const alertImports = ["Alert", title && "AlertTitle", description && "AlertDescription", showAction && "AlertAction"].filter(Boolean).join(", ")
      const buttonLine = showAction ? `import { Button } from "@/components/ui/button"\n` : ""
      return `${iconLine}${buttonLine}import { ${alertImports} } from "@/components/ui/alert"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── ALERT DIALOG ────────────────────────────────────────────────────────────
  {
    id: "alert-dialog",
    name: "Alert Dialog",
    description: {
      en: "A modal dialog that interrupts the user with important content and expects a response.",
      es: "Un diálogo modal que interrumpe al usuario con contenido importante y espera una respuesta.",
    },
    category: "Components",
    filePath: "components/ui/alert-dialog.tsx",
    controls: {
      triggerLabel:  { type: "text",    defaultValue: "Delete account" },
      title:         { type: "text",    defaultValue: "Are you absolutely sure?" },
      description:   { type: "text",    defaultValue: "This action cannot be undone. This will permanently delete your account and remove your data from our servers." },
      actionLabel:   { type: "text",    defaultValue: "Continue" },
      cancelLabel:   { type: "text",    defaultValue: "Cancel" },
      size:          { type: "select",  options: ["default", "sm"], defaultValue: "default" },
      actionVariant: { type: "select",  options: ["default", "destructive", "outline", "secondary"], defaultValue: "destructive" },
      showMedia:     { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { triggerLabel, title, description, actionLabel, cancelLabel, size, actionVariant, showMedia } = props as {
        triggerLabel: string; title: string; description: string
        actionLabel: string; cancelLabel: string
        size: "default" | "sm"; actionVariant: "default" | "destructive" | "outline" | "secondary"
        showMedia: boolean
      }
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">{triggerLabel || "Open dialog"}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent size={size}>
            <AlertDialogHeader>
              {showMedia && (
                <AlertDialogMedia>
                  <AlertCircle />
                </AlertDialogMedia>
              )}
              <AlertDialogTitle>{title || "Are you sure?"}</AlertDialogTitle>
              <AlertDialogDescription>
                {description || "This action cannot be undone."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{cancelLabel || "Cancel"}</AlertDialogCancel>
              <AlertDialogAction variant={actionVariant}>
                {actionLabel || "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    },
    generateCode: (props) => {
      const { triggerLabel, title, description, actionLabel, cancelLabel, size, actionVariant, showMedia } = props as {
        triggerLabel: string; title: string; description: string
        actionLabel: string; cancelLabel: string; size: string
        actionVariant: string; showMedia: boolean
      }
      const sizeAttr   = size !== "default"          ? ` size="${size}"`             : ""
      const actionAttr = actionVariant !== "default"  ? ` variant="${actionVariant}"` : ""
      const mediaBlock = showMedia
        ? `\n              <AlertDialogMedia>\n                <AlertCircle />\n              </AlertDialogMedia>`
        : ""
      const iconLine = showMedia ? `import { AlertCircle } from "lucide-react"\n` : ""
      const named = ["AlertDialog", "AlertDialogAction", "AlertDialogCancel",
        "AlertDialogContent", "AlertDialogDescription", "AlertDialogFooter",
        "AlertDialogHeader", showMedia ? "AlertDialogMedia" : null,
        "AlertDialogTitle", "AlertDialogTrigger"].filter(Boolean).join(", ")
      return `${iconLine}import { Button } from "@/components/ui/button"
import {
  ${named}
} from "@/components/ui/alert-dialog"

export default function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">${triggerLabel || "Open dialog"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent${sizeAttr}>
        <AlertDialogHeader>${mediaBlock}
          <AlertDialogTitle>${title || "Are you sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            ${description || "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>${cancelLabel || "Cancel"}</AlertDialogCancel>
          <AlertDialogAction${actionAttr}>${actionLabel || "Continue"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`
    },
  },

  // ─── SONNER ──────────────────────────────────────────────────────────────────
  {
    id: "sonner",
    name: "Sonner",
    description: {
      en: "A toast notification system — stack, dismiss, and style messages with ease.",
      es: "Sistema de notificaciones toast — apila, descarta y estiliza mensajes fácilmente.",
    },
    category: "Components",
    filePath: "components/ui/sonner.tsx",
    controls: {
      type:        { type: "select",  options: ["default", "success", "error", "warning", "info", "loading", "promise"], defaultValue: "default" },
      message:     { type: "text",    defaultValue: "Your changes have been saved." },
      description: { type: "text",    defaultValue: "" },
      position:    { type: "select",  options: ["top-left","top-center","top-right","bottom-left","bottom-center","bottom-right"], defaultValue: "bottom-center" },
      duration:     { type: "select",  options: ["2000","4000","8000","Infinity"], defaultValue: "4000" },
      dismissButton: { type: "boolean", defaultValue: true },
    },
    render: (props) => {
      const { type, message, description, position, duration, dismissButton } = props as {
        type: string; message: string; description: string
        position: "top-left"|"top-center"|"top-right"|"bottom-left"|"bottom-center"|"bottom-right"
        duration: string; dismissButton: boolean
      }
      const msg = message || "Your changes have been saved."
      function fire() {
        let id: string | number = ""

        const cancelButton = dismissButton
          ? (
            <Button size="sm" variant="default" className="ml-auto shrink-0" onClick={() => toast.dismiss(id)}>
              Dismiss
            </Button>
          )
          : undefined

        const opts = {
          description: description || undefined,
          position,
          duration: duration === "Infinity" ? Infinity : Number(duration),
          ...(cancelButton ? { cancel: cancelButton } : {}),
        }

        if (type === "success")      id = toast.success(msg, opts)
        else if (type === "error")   id = toast.error(msg, opts)
        else if (type === "warning") id = toast.warning(msg, opts)
        else if (type === "info")    id = toast.info(msg, opts)
        else if (type === "loading") id = toast.loading(msg, opts)
        else if (type === "promise") {
          toast.promise(
            new Promise<string>((res) => setTimeout(() => res("Done!"), 2000)),
            { loading: "Loading...", success: msg, error: "Something went wrong.", position }
          )
        } else id = toast(msg, opts)
      }

      return (
        <Button onClick={fire} variant="outline">
          Show sonner
        </Button>
      )
    },
    generateCode: (props) => {
      const { type, message, description, position, duration, dismissButton } = props as {
        type: string; message: string; description: string; position: string; duration: string; dismissButton: boolean
      }
      const msg = message || "Your changes have been saved."
      const optsLines: string[] = []
      if (description) optsLines.push(`  description: "${description}",`)
      if (position !== "bottom-right") optsLines.push(`  position: "${position}",`)
      if (duration !== "4000") optsLines.push(`  duration: ${duration === "Infinity" ? "Infinity" : duration},`)
      const hasCancelBtn = dismissButton && type !== "promise"
      if (hasCancelBtn) optsLines.push(`  cancel: (\n    <Button size="sm" className="ml-auto" onClick={() => toast.dismiss(id)}>\n      Dismiss\n    </Button>\n  ),`)
      const opts = optsLines.length ? `{\n${optsLines.join("\n")}\n}` : ""

      const fn = type === "default" ? "toast" : type === "promise" ? "toast.promise" : `toast.${type}`

      let toastCall = ""
      if (type === "promise") {
        toastCall = `toast.promise(\n  fetchData(),\n  { loading: "Loading...", success: "${msg}", error: "Error." }\n)`
      } else if (hasCancelBtn) {
        toastCall = `${fn}("${msg}"${opts ? `, ${opts}` : ""})`
      } else {
        toastCall = opts ? `${fn}("${msg}", ${opts})` : `${fn}("${msg}")`
      }

      const funcBody = hasCancelBtn
        ? `  function handleClick() {\n    let id: string | number\n    id = ${toastCall}\n  }`
        : `  // onClick={() => ${toastCall}}`

      return `import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function Example() {
${funcBody}

  return (
    <Button variant="outline" onClick={handleClick}>
      Show toast
    </Button>
  )
}

// Mount <Toaster /> once in your root layout:
// import { Toaster } from "@/components/ui/sonner"
// <Toaster richColors position="bottom-right" />`
    },
  },

  // ─── DIALOG ──────────────────────────────────────────────────────────────────
  {
    id: "dialog",
    name: "Dialog",
    description: {
      en: "A modal window that overlays the page content and requires user interaction.",
      es: "Una ventana modal que se superpone al contenido y requiere interacción del usuario.",
    },
    category: "Components",
    filePath: "components/ui/dialog.tsx",
    controls: {
      triggerLabel:    { type: "text",    defaultValue: "Open dialog" },
      title:           { type: "text",    defaultValue: "Edit profile" },
      description:     { type: "text",    defaultValue: "Make changes to your profile here. Click save when you're done." },
      actionLabel:     { type: "text",    defaultValue: "Save changes" },
      size:            { type: "select",  options: ["sm", "default", "lg", "xl"], defaultValue: "default" },
      actionVariant:   { type: "select",  options: ["default", "destructive", "secondary", "outline"], defaultValue: "default" },
      showCloseButton: { type: "boolean", defaultValue: true },
      showFooterClose: { type: "boolean", defaultValue: true },
    },
    render: (props) => {
      const { triggerLabel, title, description, actionLabel, size, actionVariant, showCloseButton, showFooterClose } = props as {
        triggerLabel: string; title: string; description: string; actionLabel: string
        size: string; actionVariant: "default" | "destructive" | "secondary" | "outline"
        showCloseButton: boolean; showFooterClose: boolean
      }
      const sizeClass: Record<string, string> = {
        sm: "sm:max-w-sm", default: "sm:max-w-md", lg: "sm:max-w-lg", xl: "sm:max-w-xl",
      }
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{triggerLabel || "Open dialog"}</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={showCloseButton} className={sizeClass[size] ?? "sm:max-w-md"}>
            <DialogHeader>
              <DialogTitle>{title || "Edit profile"}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            <DialogFooter showCloseButton={showFooterClose}>
              <Button variant={actionVariant}>{actionLabel || "Save changes"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
    generateCode: (props) => {
      const { triggerLabel, title, description, actionLabel, size, actionVariant, showCloseButton, showFooterClose } = props as {
        triggerLabel: string; title: string; description: string; actionLabel: string
        size: string; actionVariant: string; showCloseButton: boolean; showFooterClose: boolean
      }
      const sizeClass: Record<string, string> = {
        sm: "sm:max-w-sm", default: "sm:max-w-md", lg: "sm:max-w-lg", xl: "sm:max-w-xl",
      }
      const contentAttrs: string[] = []
      if (sizeClass[size] !== "sm:max-w-md") contentAttrs.push(`className="${sizeClass[size]}"`)
      if (!showCloseButton) contentAttrs.push(`showCloseButton={false}`)
      const contentAttrStr = contentAttrs.length ? ` ${contentAttrs.join(" ")}` : ""
      const actionAttr = actionVariant !== "default" ? ` variant="${actionVariant}"` : ""
      const descLine = description ? `\n          <DialogDescription>\n            ${description}\n          </DialogDescription>` : ""
      const footerClose = showFooterClose ? ` showCloseButton` : ""
      const named = [
        "Dialog", "DialogContent", "DialogDescription", "DialogFooter",
        "DialogHeader", "DialogTitle", "DialogTrigger",
      ].join(", ")
      return `import { Button } from "@/components/ui/button"
import {
  ${named}
} from "@/components/ui/dialog"

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">${triggerLabel || "Open dialog"}</Button>
      </DialogTrigger>
      <DialogContent${contentAttrStr}>
        <DialogHeader>
          <DialogTitle>${title || "Edit profile"}</DialogTitle>${descLine}
        </DialogHeader>
        <DialogFooter${footerClose}>
          <Button${actionAttr}>${actionLabel || "Save changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`
    },
  },

  // ─── DROPDOWN MENU ───────────────────────────────────────────────────────────
  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    description: {
      en: "Displays a menu to the user — triggered by a button — with support for items, groups, submenus, shortcuts, checkboxes, and radio items.",
      es: "Muestra un menú al usuario — activado por un botón — con soporte para items, grupos, submenús, atajos, checkboxes e items de radio.",
    },
    category: "Components",
    filePath: "components/ui/dropdown-menu.tsx",
    controls: {
      trigger:      { type: "text",    defaultValue: "Open menu" },
      variant:      { type: "select",  options: ["default", "checkboxes", "radio", "submenu"], defaultValue: "default" },
      side:         { type: "select",  options: ["bottom", "top", "left", "right"], defaultValue: "bottom" },
      align:        { type: "select",  options: ["start", "center", "end"], defaultValue: "start" },
      showShortcuts:{ type: "boolean", defaultValue: true },
      showIcons:    { type: "boolean", defaultValue: false },
      showLabel:    { type: "boolean", defaultValue: true },
      destructive:  { type: "boolean", defaultValue: true },
    },
    render: (props) => {
      const { trigger, variant, side, align, showShortcuts, showIcons, showLabel, destructive } = props as {
        trigger: string; variant: string; side: "bottom"|"top"|"left"|"right"
        align: "start"|"center"|"end"; showShortcuts: boolean; showIcons: boolean
        showLabel: boolean; destructive: boolean
      }

      // Variante checkboxes — extraída como componente para cumplir Rules of Hooks
      function CheckboxesMenu() {
        const [showStatus, setShowStatus] = React.useState(true)
        const [showPanel, setShowPanel]   = React.useState(false)
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{trigger || "Open menu"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} align={align} className="w-48">
              <DropdownMenuGroup>
                {showLabel && <DropdownMenuLabel>View options</DropdownMenuLabel>}
                <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
                  {showIcons && <LayoutGrid />}
                  Status bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
                  {showIcons && <Activity />}
                  Activity panel
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked disabled>
                  {showIcons && <PanelLeft />}
                  Sidebar (locked)
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }

      // Variante radio — extraída como componente para cumplir Rules of Hooks
      function RadioMenu() {
        const [position, setPosition] = React.useState("bottom")
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{trigger || "Open menu"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} align={align} className="w-44">
              <DropdownMenuGroup>
                {showLabel && <DropdownMenuLabel>Panel position</DropdownMenuLabel>}
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="top">
                    {showIcons && <PanelTop />}
                    Top
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    {showIcons && <PanelBottom />}
                    Bottom
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    {showIcons && <PanelRight />}
                    Right
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }

      if (variant === "checkboxes") return <CheckboxesMenu />
      if (variant === "radio") return <RadioMenu />

      if (variant === "submenu") return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{trigger || "Open menu"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} align={align} className="w-48">
              <DropdownMenuGroup>
                {showLabel && <DropdownMenuLabel>My account</DropdownMenuLabel>}
                <DropdownMenuItem>
                  {showIcons && <User />}
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {showIcons && <Settings />}
                    More options
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      {showIcons && <Settings />}
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {showIcons && <CreditCard />}
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {showIcons && <Users />}
                      Team
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              {destructive && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    {showIcons && <Trash2 />}
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )

      // default
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{trigger || "Open menu"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={side} align={align} className="w-52">
            <DropdownMenuGroup>
              {showLabel && <DropdownMenuLabel>My account</DropdownMenuLabel>}
              <DropdownMenuItem>
                {showIcons && <User />}
                Profile
                {showShortcuts && <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {showIcons && <CreditCard />}
                Billing
                {showShortcuts && <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {showIcons && <Settings />}
                Settings
                {showShortcuts && <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                {showIcons && <Users />}
                Team
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                {showIcons && <UserPlus />}
                Invite users
                {showShortcuts && <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {showIcons && <Plus />}
                New team
                {showShortcuts && <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {destructive && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  {showIcons && <LogOut />}
                  Log out
                  {showShortcuts && <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    generateCode: (props) => {
      const { trigger, variant, side, align, showShortcuts, showIcons, showLabel, destructive } = props as {
        trigger: string; variant: string; side: string; align: string
        showShortcuts: boolean; showIcons: boolean; showLabel: boolean; destructive: boolean
      }
      const contentAttrs = [
        side !== "bottom" && `side="${side}"`,
        align !== "start" && `align="${align}"`,
      ].filter(Boolean).join(" ")

      // helper: icon JSX line (4-space indent inside item)
      const icon = (name: string) => showIcons ? `\n          <${name} />` : ""
      // helper: shortcut JSX
      const sc = (s: string) => showShortcuts ? `\n          <DropdownMenuShortcut>${s}</DropdownMenuShortcut>` : ""

      if (variant === "checkboxes") {
        const iconImport = showIcons ? `\nimport { LayoutGrid, Activity, PanelLeft } from "lucide-react"` : ""
        const labelBlock = showLabel
          ? `\n        <DropdownMenuLabel>View options</DropdownMenuLabel>`
          : ""
        return `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuLabel, DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"${iconImport}

export default function Example() {
  const [showStatus, setShowStatus] = useState(true)
  const [showPanel, setShowPanel] = useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">${trigger || "Open menu"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>${labelBlock}
          <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>${icon("LayoutGrid")}
            Status bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>${icon("Activity")}
            Activity panel
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked disabled>${icon("PanelLeft")}
            Sidebar (locked)
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`
      }

      if (variant === "radio") {
        const radioIconImport = showIcons ? `\nimport { PanelTop, PanelBottom, PanelRight } from "lucide-react"` : ""
        const ri = (name: string) => showIcons ? `\n            <${name} />` : ""
        return `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuLabel,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"${radioIconImport}

export default function Example() {
  const [position, setPosition] = useState("bottom")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">${trigger || "Open menu"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>${showLabel ? `\n          <DropdownMenuLabel>Panel position</DropdownMenuLabel>` : ""}
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">${ri("PanelTop")}
              Top
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">${ri("PanelBottom")}
              Bottom
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">${ri("PanelRight")}
              Right
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`
      }

      if (variant === "submenu") {
        const iconImport = showIcons ? `\nimport { User, Settings, CreditCard, Users, Trash2 } from "lucide-react"` : ""
        const labelBlock = showLabel ? `\n        <DropdownMenuLabel>My account</DropdownMenuLabel>` : ""
        const destructiveBlock = destructive
          ? `\n      <DropdownMenuSeparator />\n      <DropdownMenuItem variant="destructive">${icon("Trash2")}\n        Delete\n      </DropdownMenuItem>`
          : ""
        const subImports = ["DropdownMenu", "DropdownMenuTrigger", "DropdownMenuContent",
          "DropdownMenuGroup", showLabel && "DropdownMenuLabel",
          "DropdownMenuItem", "DropdownMenuSeparator",
          "DropdownMenuSub", "DropdownMenuSubTrigger", "DropdownMenuSubContent",
        ].filter(Boolean).join(", ")
        return `import { Button } from "@/components/ui/button"
import {
  ${subImports}
} from "@/components/ui/dropdown-menu"${iconImport}

export default function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">${trigger || "Open menu"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent${contentAttrs ? ` ${contentAttrs}` : ""} className="w-48">
        <DropdownMenuGroup>${labelBlock}
          <DropdownMenuItem>${icon("User")}
            Profile
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>${icon("Settings")}
              More options
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>${icon("Settings")}
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>${icon("CreditCard")}
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>${icon("Users")}
                Team
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>${destructiveBlock}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`
      }

      // default variant
      const iconImport = showIcons ? `\nimport { User, CreditCard, Settings, Users, UserPlus, Plus, LogOut } from "lucide-react"` : ""
      const labelBlock = showLabel ? `\n        <DropdownMenuLabel>My account</DropdownMenuLabel>` : ""
      const destructiveBlock = destructive
        ? `\n      <DropdownMenuSeparator />\n      <DropdownMenuItem variant="destructive">${icon("LogOut")}\n        Log out${sc("⇧⌘Q")}\n      </DropdownMenuItem>`
        : ""
      const imports = ["DropdownMenu", "DropdownMenuTrigger", "DropdownMenuContent",
        "DropdownMenuGroup", showLabel && "DropdownMenuLabel",
        "DropdownMenuItem", destructive && "DropdownMenuSeparator",
        showShortcuts && "DropdownMenuShortcut",
      ].filter(Boolean).join(", ")
      return `import { Button } from "@/components/ui/button"
import {
  ${imports}
} from "@/components/ui/dropdown-menu"${iconImport}

export default function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">${trigger || "Open menu"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent${contentAttrs ? ` ${contentAttrs}` : ""} className="w-52">
        <DropdownMenuGroup>${labelBlock}
          <DropdownMenuItem>${icon("User")}
            Profile${sc("⇧⌘P")}
          </DropdownMenuItem>
          <DropdownMenuItem>${icon("CreditCard")}
            Billing${sc("⌘B")}
          </DropdownMenuItem>
          <DropdownMenuItem>${icon("Settings")}
            Settings${sc("⌘S")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>${icon("Users")}
            Team
          </DropdownMenuItem>
          <DropdownMenuItem disabled>${icon("UserPlus")}
            Invite users${sc("⌘I")}
          </DropdownMenuItem>
          <DropdownMenuItem>${icon("Plus")}
            New team${sc("⌘T")}
          </DropdownMenuItem>
        </DropdownMenuGroup>${destructiveBlock}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`
    },
  },

  // ─── AVATAR ──────────────────────────────────────────────────────────────────
  {
    id: "avatar",
    name: "Avatar",
    description: {
      en: "An image element with a fallback for representing a user.",
      es: "Un elemento de imagen con fallback para representar a un usuario.",
    },
    category: "Components",
    filePath: "components/ui/avatar.tsx",
    controls: {
      size:      { type: "select",  options: ["sm","default","lg"], defaultValue: "default" },
      type:      { type: "select",  options: ["single","group"],    defaultValue: "single" },
      withImage: { type: "boolean", defaultValue: false },
      fallback:  { type: "text",    defaultValue: "JD" },
      showBadge: { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { size, type, withImage, fallback, showBadge } = props as {
        size: "sm" | "default" | "lg"; type: string; withImage: boolean; fallback: string; showBadge: boolean
      }
      const fb = fallback || "JD"
      const imgSrcs = [
        "https://i.pravatar.cc/150?img=12",
        "https://i.pravatar.cc/150?img=34",
        "https://i.pravatar.cc/150?img=56",
        "https://i.pravatar.cc/150?img=78",
      ]
      const initials = ["JD","AB","KL","MN"]

      if (type === "group") {
        return (
          <AvatarGroup>
            {initials.map((init, i) => (
              <Avatar key={`${init}-${withImage}`} size={size}>
                {withImage && <AvatarImage src={imgSrcs[i]} alt={init} />}
                <AvatarFallback>{init}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        )
      }

      return (
        <Avatar key={String(withImage)} size={size}>
          {withImage && <AvatarImage src={imgSrcs[0]} alt={fb} />}
          <AvatarFallback>{fb}</AvatarFallback>
          {showBadge && <AvatarBadge />}
        </Avatar>
      )
    },
    generateCode: (props) => {
      const { size, type, withImage, fallback, showBadge } = props as {
        size: string; type: string; withImage: boolean; fallback: string; showBadge: boolean
      }
      const fb = fallback || "JD"
      const sizeAttr = size !== "default" ? ` size="${size}"` : ""
      const imgTag = withImage ? `\n  <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="${fb}" />` : ""
      const badgeTag = showBadge && type === "single" ? `\n  <AvatarBadge />` : ""

      if (type === "group") {
        const initials = ["JD","AB","KL","MN"]
        const imgSrcs  = ["https://i.pravatar.cc/150?img=12","https://i.pravatar.cc/150?img=34","https://i.pravatar.cc/150?img=56","https://i.pravatar.cc/150?img=78"]
        const avatars = initials.map((init, i) => {
          const img = withImage ? `\n    <AvatarImage src="${imgSrcs[i]}" alt="${init}" />` : ""
          return `  <Avatar${sizeAttr}>${img}\n    <AvatarFallback>${init}</AvatarFallback>\n  </Avatar>`
        }).join("\n")
        const body = `<AvatarGroup>\n${avatars}\n  <AvatarGroupCount>+3</AvatarGroupCount>\n</AvatarGroup>`
        const indented = body.split("\n").map(l=>`    ${l}`).join("\n")
        const named = withImage
          ? "Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount"
          : "Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount"
        return `import { ${named} } from "@/components/ui/avatar"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
      }

      const body = `<Avatar${sizeAttr}>${imgTag}\n  <AvatarFallback>${fb}</AvatarFallback>${badgeTag}\n</Avatar>`
      const indented = body.split("\n").map(l=>`    ${l}`).join("\n")
      const parts = ["Avatar", withImage && "AvatarImage", "AvatarFallback", showBadge && "AvatarBadge"].filter(Boolean).join(", ")
      return `import { ${parts} } from "@/components/ui/avatar"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── BADGE ───────────────────────────────────────────────────────────────────
  {
    id: "badge",
    name: "Badge",
    description: {
      en: "Displays a small status descriptor for UI elements.",
      es: "Muestra un pequeño descriptor de estado para elementos de la interfaz.",
    },
    category: "Components",
    filePath: "components/ui/badge.tsx",
    controls: {
      children: { type: "text",   defaultValue: "Badge" },
      variant:  { type: "select", options: ["default","secondary","destructive","outline","ghost"], defaultValue: "default" },
      icon:     { type: "select", options: ["none","start","end"], defaultValue: "none" },
    },
    render: (props) => {
      const { children, variant, icon } = props as { children: string; variant: string; icon: string }
      return (
        <Badge variant={variant as never}>
          {icon === "start" && <Tag data-icon="inline-start" />}
          {children || "Badge"}
          {icon === "end" && <Tag data-icon="inline-end" />}
        </Badge>
      )
    },
    generateCode: (props) => {
      const { children, variant, icon } = props as { children: string; variant: string; icon: string }
      const attrs: string[] = []
      if (variant !== "default") attrs.push(`variant="${variant}"`)
      const attrStr = attrs.length ? ` ${attrs[0]}` : ""
      const iconStart = icon === "start" ? `<Tag data-icon="inline-start" />` : ""
      const iconEnd   = icon === "end"   ? `<Tag data-icon="inline-end" />`   : ""
      const label = children || "Badge"
      const inner = [iconStart, label, iconEnd].filter(Boolean).join("")
      const indented = `    <Badge${attrStr}>${inner}</Badge>`
      const iconLine = icon !== "none" ? `import { Tag } from "lucide-react"\n` : ""
      return `${iconLine}import { Badge } from "@/components/ui/badge"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── BUTTON ──────────────────────────────────────────────────────────────────
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
      children:  { type: "text",    defaultValue: "Button" },
      variant:   { type: "select",  options: ["default","destructive","outline","secondary","ghost","link"], defaultValue: "default" },
      size:      { type: "select",  options: ["default","xs","sm","lg","icon","icon-xs","icon-sm","icon-lg"], defaultValue: "default" },
      iconLeft:  { type: "icon", defaultValue: "none" },
      iconRight: { type: "icon", defaultValue: "none" },
      loading:   { type: "boolean", defaultValue: false },
      disabled:  { type: "boolean", defaultValue: false },
      invalid:   { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { size, children, variant, disabled, loading, iconLeft, iconRight, invalid } = props as {
        size: string; children: string; variant: string
        disabled: boolean; loading: boolean
        iconLeft: string; iconRight: string
        invalid: boolean
      }
      const isIconSize = size.startsWith("icon")
      let content: React.ReactNode
      if (loading) {
        content = <><Loader2 className="animate-spin" />{!isIconSize && (children || "Button")}</>
      } else if (isIconSize) {
        const singleIcon = iconLeft !== "none" ? iconLeft : iconRight !== "none" ? iconRight : "Mail"
        content = <ButtonIcon name={singleIcon} />
      } else {
        content = (
          <>
            {iconLeft !== "none" && <ButtonIcon name={iconLeft} />}
            {children || "Button"}
            {iconRight !== "none" && <ButtonIcon name={iconRight} />}
          </>
        )
      }
      return (
        <Button size={size as never} variant={variant as never}
          disabled={disabled || loading} aria-invalid={invalid ? "true" : undefined}>
          {content}
        </Button>
      )
    },
    generateCode: (props) => {
      const { children, size, variant, disabled, loading, iconLeft, iconRight, invalid } = props as {
        children: string; size: string; variant: string
        disabled: boolean; loading: boolean
        iconLeft: string; iconRight: string
        invalid: boolean
      }
      const isIconSize = size.startsWith("icon")
      const singleIcon = iconLeft !== "none" ? iconLeft : iconRight !== "none" ? iconRight : "Mail"

      let inner: string
      if (loading) {
        inner = isIconSize
          ? `\n  <Loader2 className="animate-spin" />\n`
          : `\n  <Loader2 className="animate-spin" />\n  ${children || "Button"}\n`
      } else if (isIconSize) {
        inner = `\n  <${singleIcon} />\n`
      } else {
        const leftPart  = iconLeft  !== "none" ? `\n  <${iconLeft} />` : ""
        const rightPart = iconRight !== "none" ? `\n  <${iconRight} />` : ""
        const hasIcons  = leftPart || rightPart
        inner = hasIcons
          ? `${leftPart}\n  ${children || "Button"}${rightPart}\n`
          : children || "Button"
      }

      const attrs: string[] = []
      if (variant !== "default") attrs.push(`variant="${variant}"`)
      if (size    !== "default") attrs.push(`size="${size}"`)
      if (disabled || loading)   attrs.push("disabled")
      if (invalid)               attrs.push('aria-invalid="true"')
      const attrStr = attrs.length === 0 ? "" : attrs.length === 1 ? ` ${attrs[0]}` : `\n  ${attrs.join("\n  ")}\n`
      const ml  = attrs.length >= 2
      const tag = ml
        ? `<Button${attrStr}>${inner.startsWith("\n") ? inner : `\n  ${inner}\n`}</Button>`
        : `<Button${attrStr}>${inner}</Button>`
      const indented = tag.split("\n").map(l => `    ${l}`).join("\n")

      const usedIcons = new Set<string>()
      if (loading) usedIcons.add("Loader2")
      else if (isIconSize) usedIcons.add(singleIcon)
      else {
        if (iconLeft  !== "none") usedIcons.add(iconLeft)
        if (iconRight !== "none") usedIcons.add(iconRight)
      }
      const iconImport = usedIcons.size
        ? `import { ${[...usedIcons].join(", ")} } from "lucide-react"\n`
        : ""
      return `${iconImport}import { Button } from "@/components/ui/button"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── BUTTON GROUP ────────────────────────────────────────────────────────────
  {
    id: "button-group",
    name: "Button Group",
    description: {
      en: "A container that groups related buttons together with consistent styling.",
      es: "Un contenedor que agrupa botones relacionados con estilos consistentes.",
    },
    category: "Components",
    filePath: "components/ui/button-group.tsx",
    controls: {
      orientation: { type: "select",  options: ["horizontal","vertical"], defaultValue: "horizontal" },
      variant:     { type: "select",  options: ["default","outline","secondary","ghost"], defaultValue: "outline" },
      size:        { type: "select",  options: ["default","xs","sm","lg"], defaultValue: "default" },
      buttonCount: { type: "select",  options: ["2","3","4"], defaultValue: "3" },
      button1:     { type: "text",    defaultValue: "Circle" },
      button2:     { type: "text",    defaultValue: "Square" },
      button3:     { type: "text",    defaultValue: "Triangle" },
      button4:     { type: "text",    defaultValue: "Star" },
      showIcons:   { type: "boolean", defaultValue: false },
      separator:   { type: "boolean", defaultValue: false },
      disabled:    { type: "boolean", defaultValue: false },
    },
    controlVisible: (key, props) => {
      if (key === "separator") return props.variant === "ghost"
      const match = key.match(/^button(\d)$/)
      if (match) return Number(match[1]) <= Number(props.buttonCount ?? 3)
      return true
    },
    render: (props) => {
      const { orientation, variant, size, buttonCount, button1, button2, button3, button4, showIcons, separator, disabled } = props as {
        orientation: "horizontal" | "vertical"
        variant: string; size: string; buttonCount: string
        button1: string; button2: string; button3: string; button4: string
        showIcons: boolean; separator: boolean; disabled: boolean
      }
      const count = Number(buttonCount) || 3
      const ICONS = [Circle, Square, Triangle, Star]
      const labels = [button1 || "Circle", button2 || "Square", button3 || "Triangle", button4 || "Star"].slice(0, count)
      return (
        <ButtonGroup orientation={orientation}>
          {labels.map((lbl, i) => {
            const Icon = ICONS[i]
            return (
              <React.Fragment key={i}>
                {separator && i > 0 && <ButtonGroupSeparator orientation={orientation === "vertical" ? "horizontal" : "vertical"} />}
                <Button
                  variant={variant as never}
                  size={size as never}
                  disabled={disabled}
                  className={orientation === "vertical" ? "justify-start" : undefined}
                >
                  {showIcons && <Icon className="size-4" />}
                  {lbl}
                </Button>
              </React.Fragment>
            )
          })}
        </ButtonGroup>
      )
    },
    generateCode: (props) => {
      const { orientation, variant, size, buttonCount, button1, button2, button3, button4, showIcons, separator, disabled } = props as {
        orientation: string; variant: string; size: string; buttonCount: string
        button1: string; button2: string; button3: string; button4: string
        showIcons: boolean; separator: boolean; disabled: boolean
      }
      const count = Number(buttonCount) || 3
      const ICON_NAMES = ["Circle", "Square", "Triangle", "Star"]
      const labels = [button1 || "Circle", button2 || "Square", button3 || "Triangle", button4 || "Star"].slice(0, count)
      const btnAttrs: string[] = []
      if (variant !== "default") btnAttrs.push(`variant="${variant}"`)
      if (size    !== "default") btnAttrs.push(`size="${size}"`)
      if (disabled) btnAttrs.push("disabled")
      if (orientation === "vertical") btnAttrs.push(`className="justify-start"`)
      const btnAttrStr = btnAttrs.length ? " " + btnAttrs.join(" ") : ""
      const orientationAttr = orientation !== "horizontal" ? ` orientation="${orientation}"` : ""
      const rows = labels.map((lbl, i) => {
        const iconPart = showIcons ? `<${ICON_NAMES[i]} className="size-4" />` : ""
        const inner = iconPart ? `${iconPart}${lbl}` : lbl
        const btn = `  <Button${btnAttrStr}>${inner}</Button>`
        const sepTag = orientation === "vertical" ? `  <ButtonGroupSeparator orientation="horizontal" />` : `  <ButtonGroupSeparator />`
        return separator && i > 0 ? `${sepTag}\n${btn}` : btn
      }).join("\n")
      const body = `<ButtonGroup${orientationAttr}>\n${rows}\n</ButtonGroup>`
      const indented = body.split("\n").map(l => `    ${l}`).join("\n")
      const lucideImport = showIcons
        ? `import { ${ICON_NAMES.slice(0, count).join(", ")} } from "lucide-react"\n`
        : ""
      const bgImport = separator
        ? `import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"`
        : `import { ButtonGroup } from "@/components/ui/button-group"`
      return `${lucideImport}import { Button } from "@/components/ui/button"\n${bgImport}\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── CALENDAR ────────────────────────────────────────────────────────────────
  {
    id: "calendar",
    name: "Calendar",
    description: {
      en: "A calendar component for selecting single dates, multiple dates, or date ranges.",
      es: "Un componente de calendario para seleccionar fechas individuales, múltiples o rangos.",
    },
    category: "Components",
    filePath: "components/ui/calendar.tsx",
    controls: {
      mode:           { type: "select",  options: ["single","multiple","range"], defaultValue: "single" },
      numberOfMonths: { type: "select",  options: ["1","2"], defaultValue: "1" },
      showOutsideDays:{ type: "boolean", defaultValue: true },
      fixedWeeks:     { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { mode, showOutsideDays, numberOfMonths, fixedWeeks } = props as {
        mode: string; showOutsideDays: boolean; numberOfMonths: string
        fixedWeeks: boolean
      }
      const months = Number(numberOfMonths) || 1
      const cls = "rounded-xl border border-border"
      const shared = { numberOfMonths: months, showOutsideDays, fixedWeeks, className: cls }

      function SingleCalendar() {
        const [date, setDate] = React.useState<Date | undefined>(undefined)
        return <Calendar mode="single" selected={date} onSelect={setDate} {...shared} />
      }
      function MultipleCalendar() {
        const [dates, setDates] = React.useState<Date[] | undefined>(undefined)
        return <Calendar mode="multiple" selected={dates} onSelect={setDates} {...shared} />
      }
      function RangeCalendar() {
        const [range, setRange] = React.useState<{ from: Date | undefined; to?: Date } | undefined>(undefined)
        return <Calendar mode="range" selected={range} onSelect={setRange as never} {...shared} />
      }

      if (mode === "range") return <RangeCalendar />
      if (mode === "multiple") return <MultipleCalendar />
      return <SingleCalendar />
    },
    generateCode: (props) => {
      const { mode, showOutsideDays, numberOfMonths, fixedWeeks } = props as {
        mode: string; showOutsideDays: boolean; numberOfMonths: string
        fixedWeeks: boolean
      }
      const months = Number(numberOfMonths) || 1
      const isRange = mode === "range"
      const isMultiple = mode === "multiple"
      const stateType = isRange
        ? "{ from: Date | undefined; to?: Date } | undefined"
        : isMultiple ? "Date[] | undefined" : "Date | undefined"
      const stateVar = isRange ? "range" : isMultiple ? "dates" : "date"
      const stateSetter = isRange ? "setRange" : isMultiple ? "setDates" : "setDate"
      const attrs = [
        `mode="${mode}"`,
        `selected={${stateVar}}`,
        `onSelect={${stateSetter}}`,
        months > 1 && `numberOfMonths={${months}}`,
        !showOutsideDays && `showOutsideDays={false}`,
        fixedWeeks && `fixedWeeks`,
        `className="rounded-xl border border-border"`,
      ].filter(Boolean) as string[]
      const tag = ["<Calendar", ...attrs.map(a=>`  ${a}`), "/>"].join("\n")
      const indented = tag.split("\n").map(l=>`    ${l}`).join("\n")
      return `"use client"\n\nimport { useState } from "react"\nimport { Calendar } from "@/components/ui/calendar"\n\nexport default function Example() {\n  const [${stateVar}, ${stateSetter}] = useState<${stateType}>(undefined)\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── CHECKBOX ────────────────────────────────────────────────────────────────
  {
    id: "checkbox",
    name: "Checkbox",
    description: {
      en: "A control that allows the user to toggle a boolean value.",
      es: "Un control que permite al usuario alternar un valor booleano.",
    },
    category: "Components",
    filePath: "components/ui/checkbox.tsx",
    controls: {
      label:       { type: "text",    defaultValue: "Accept terms and conditions" },
      description: { type: "text",    defaultValue: "" },
      checked:       { type: "boolean", defaultValue: false },
      indeterminate: { type: "boolean", defaultValue: false },
      disabled:      { type: "boolean", defaultValue: false },
      invalid:       { type: "boolean", defaultValue: false },
      group:         { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { label, description, checked, indeterminate, disabled, invalid, group } = props as {
        label: string; description: string; checked: boolean; indeterminate: boolean
        disabled: boolean; invalid: boolean; group: boolean
      }
      if (group) {
        const items = [
          { id: "analytics", label: "Enable analytics", checked: true },
          { id: "emails",    label: "Marketing emails",  checked: false },
          { id: "updates",   label: "Product updates",   checked: true },
        ]
        return (
          <div className="flex flex-col gap-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox id={item.id} defaultChecked={item.checked} disabled={disabled} />
                <label htmlFor={item.id} className="text-sm font-medium cursor-pointer">{item.label}</label>
              </div>
            ))}
          </div>
        )
      }
      return (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Checkbox id="cb-demo" key={String(checked) + String(indeterminate)}
              defaultChecked={indeterminate ? "indeterminate" : checked}
              disabled={disabled} aria-invalid={invalid ? "true" : undefined} />
            <label htmlFor="cb-demo" className="text-sm font-medium cursor-pointer leading-none">
              {label || "Accept terms and conditions"}
            </label>
          </div>
          {description && !invalid && <p className="text-xs text-muted-foreground ml-6">{description}</p>}
          {invalid && <p className="text-xs text-destructive ml-6">This field is required.</p>}
        </div>
      )
    },
    generateCode: (props) => {
      const { label, description, checked, indeterminate, disabled, invalid, group } = props as {
        label: string; description: string; checked: boolean; indeterminate: boolean
        disabled: boolean; invalid: boolean; group: boolean
      }
      if (group) {
        const items = [
          { id: "analytics", label: "Enable analytics", checked: true },
          { id: "emails",    label: "Marketing emails",  checked: false },
          { id: "updates",   label: "Product updates",   checked: true },
        ]
        const rows = items.map(it => {
          const attrs = [`id="${it.id}"`, ...(it.checked ? ["defaultChecked"] : []), ...(disabled ? ["disabled"] : [])]
          return `  <div className="flex items-center gap-2">\n    <Checkbox ${attrs.join(" ")} />\n    <label htmlFor="${it.id}" className="text-sm font-medium cursor-pointer">${it.label}</label>\n  </div>`
        }).join("\n")
        const indented = `  <div className="flex flex-col gap-3">\n${rows.split("\n").map(l=>`  ${l}`).join("\n")}\n  </div>`
        return `import { Checkbox } from "@/components/ui/checkbox"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
      }
      const attrs: string[] = [`id="cb-demo"`]
      if (indeterminate) attrs.push(`checked="indeterminate"`)
      else if (checked) attrs.push("defaultChecked")
      if (disabled) attrs.push("disabled")
      if (invalid) attrs.push('aria-invalid="true"')
      const cbTag = `<Checkbox ${attrs.join(" ")} />`
      const labelLine = `<label htmlFor="cb-demo" className="text-sm font-medium cursor-pointer">${label || "Accept terms and conditions"}</label>`
      const descLine = description && !invalid ? `\n  <p className="text-xs text-muted-foreground ml-6">${description}</p>` : ""
      const errorLine = invalid ? `\n  <p className="text-xs text-destructive ml-6">This field is required.</p>` : ""
      const body = `<div className="flex flex-col gap-1.5">\n  <div className="flex items-center gap-2">\n    ${cbTag}\n    ${labelLine}\n  </div>${descLine}${errorLine}\n</div>`
      const indented = body.split("\n").map(l=>`    ${l}`).join("\n")
      return `import { Checkbox } from "@/components/ui/checkbox"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── INPUT ────────────────────────────────────────────────────────────────────
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
      type:        { type: "select",  options: ["text","email","password","number","search","url","tel","file"], defaultValue: "email" },
      showLabel:   { type: "boolean", defaultValue: true },
      label:       { type: "text",    defaultValue: "Email" },
      placeholder: { type: "text",    defaultValue: "your@email.com" },
      showMessage: { type: "boolean", defaultValue: false },
      description: { type: "text",    defaultValue: "We'll never share your email." },
      disabled:    { type: "boolean", defaultValue: false },
      required:    { type: "boolean", defaultValue: false },
      invalid:     { type: "boolean", defaultValue: false },
      iconLeft:    { type: "icon",    defaultValue: "none" },
      showButton:  { type: "boolean", defaultValue: false },
    },
    controlVisible: (key, props) => {
      if (key === "label") return !!props.showLabel
      if (key === "description") return !!props.showMessage
      return true
    },
    cascade: (key, value) => {
      if (key !== "type") return {}
      const presets: Record<string, { label: string; placeholder: string; showLabel: boolean }> = {
        text:     { label: "Name",     placeholder: "e.g. John Smith",      showLabel: true  },
        email:    { label: "Email",    placeholder: "your@email.com",        showLabel: true  },
        password: { label: "Password", placeholder: "••••••••",              showLabel: true  },
        number:   { label: "Amount",   placeholder: "0",                     showLabel: true  },
        search:   { label: "Search",   placeholder: "Search...",             showLabel: false },
        url:      { label: "Website",  placeholder: "https://example.com",   showLabel: true  },
        tel:      { label: "Phone",    placeholder: "+1 800 000 0000",       showLabel: true  },
        file:     { label: "File",     placeholder: "",                      showLabel: true  },
      }
      return presets[value as string] ?? {}
    },
    render: (props) => {
      const { showLabel, label, placeholder, type, disabled, showMessage, description, required, invalid, iconLeft, showButton } = props as {
        showLabel: boolean; label: string; placeholder: string; type: string; disabled: boolean
        showMessage: boolean; description: string; required: boolean; invalid: boolean; iconLeft: string; showButton: boolean
      }
      const hasIcon = iconLeft && iconLeft !== "none"
      const inputEl = (
        <div className={hasIcon ? "relative flex-1 min-w-0" : showButton ? "flex-1 min-w-0" : ""}>
          {hasIcon && <ButtonIcon name={iconLeft} className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />}
          <Input placeholder={placeholder} type={type as never} disabled={disabled}
            required={required || undefined} aria-invalid={invalid ? "true" : undefined}
            className={hasIcon ? "pl-8" : undefined} />
        </div>
      )
      return (
        <div className="w-72 flex flex-col gap-1.5">
          {showLabel && label && (
            <label className="text-sm font-medium text-foreground">
              {label}{required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
            </label>
          )}
          {showButton ? <div className="flex gap-2">{inputEl}<Button size="sm">Send</Button></div> : inputEl}
          {showMessage && description && !invalid && <p className="text-xs text-muted-foreground">{description}</p>}
          {invalid && <p className="text-xs text-destructive">This field is not valid.</p>}
        </div>
      )
    },
    generateCode: (props) => {
      const { showLabel, label, placeholder, type, disabled, showMessage, description, required, invalid, iconLeft, showButton } = props as {
        showLabel: boolean; label: string; placeholder: string; type: string; disabled: boolean
        showMessage: boolean; description: string; required: boolean; invalid: boolean; iconLeft: string; showButton: boolean
      }
      const hasIcon = iconLeft && iconLeft !== "none"
      const inputAttrs: string[] = []
      if (type !== "text") inputAttrs.push(`type="${type}"`)
      if (placeholder) inputAttrs.push(`placeholder="${placeholder}"`)
      if (disabled) inputAttrs.push("disabled")
      if (required) inputAttrs.push("required")
      if (invalid) inputAttrs.push('aria-invalid="true"')
      if (hasIcon) inputAttrs.push('className="pl-8"')
      const inputTag = inputAttrs.length <= 1
        ? `<Input${inputAttrs.length ? " " + inputAttrs[0] : ""} />`
        : ["<Input", ...inputAttrs.map(a => `  ${a}`), "/>"].join("\n")
      const iconLine = hasIcon
        ? `<${iconLeft} className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />\n    ` : ""
      const wrappedInput = hasIcon
        ? `<div className="relative">\n    ${iconLine}${inputTag.split("\n").join("\n    ")}\n    </div>` : inputTag
      const labelContent = showLabel && label ? `${label}${required ? `{" "}<span className="text-destructive" aria-hidden="true">*</span>` : ""}` : ""
      const labelLine = labelContent ? `<label className="text-sm font-medium">\n      ${labelContent}\n    </label>\n    ` : ""
      const descLine = showMessage && description && !invalid ? `\n    <p className="text-xs text-muted-foreground">${description}</p>` : ""
      const errorLine = invalid ? `\n    <p className="text-xs text-destructive">This field is not valid.</p>` : ""
      const inner = showButton
        ? `${labelLine}<div className="flex gap-2">\n      ${wrappedInput.split("\n").join("\n      ")}\n      <Button>Send</Button>\n    </div>${descLine}${errorLine}`
        : `${labelLine}${wrappedInput}${descLine}${errorLine}`
      const indented = inner.split("\n").map(l => `    ${l}`).join("\n")
      const imports = [
        hasIcon ? `import { ${iconLeft} } from "lucide-react"` : null,
        showButton ? 'import { Button } from "@/components/ui/button"' : null,
        'import { Input } from "@/components/ui/input"',
      ].filter(Boolean).join("\n")
      return `${imports}\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
    examples: [
      {
        title: "Default",
        render: () => (
          <div className="flex flex-col gap-1.5 w-60">
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="your@email.com" />
          </div>
        ),
        code: `import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="flex flex-col gap-1.5 w-60">
      <label className="text-sm font-medium">Email</label>
      <Input placeholder="your@email.com" />
    </div>
  )
}`,
      },
      {
        title: "With icon",
        render: () => (
          <div className="flex flex-col gap-1.5 w-60">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
          </div>
        ),
        code: `import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="flex flex-col gap-1.5 w-60">
      <label className="text-sm font-medium">Search</label>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input placeholder="Search..." className="pl-8" />
      </div>
    </div>
  )
}`,
      },
      {
        title: "With description",
        render: () => (
          <div className="flex flex-col gap-1.5 w-60">
            <label className="text-sm font-medium">Username</label>
            <Input placeholder="john_doe" />
            <p className="text-xs text-muted-foreground">This will be your public display name.</p>
          </div>
        ),
        code: `import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="flex flex-col gap-1.5 w-60">
      <label className="text-sm font-medium">Username</label>
      <Input placeholder="john_doe" />
      <p className="text-xs text-muted-foreground">
        This will be your public display name.
      </p>
    </div>
  )
}`,
      },
      {
        title: "Error state",
        render: () => (
          <div className="flex flex-col gap-1.5 w-60">
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="your@email.com" aria-invalid="true" defaultValue="not-an-email" />
            <p className="text-xs text-destructive">Please enter a valid email address.</p>
          </div>
        ),
        code: `import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="flex flex-col gap-1.5 w-60">
      <label className="text-sm font-medium">Email</label>
      <Input
        placeholder="your@email.com"
        aria-invalid="true"
        defaultValue="not-an-email"
      />
      <p className="text-xs text-destructive">
        Please enter a valid email address.
      </p>
    </div>
  )
}`,
      },
      {
        title: "Disabled",
        render: () => (
          <div className="flex flex-col gap-1.5 w-60">
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <Input placeholder="your@email.com" disabled defaultValue="user@example.com" />
          </div>
        ),
        code: `import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="flex flex-col gap-1.5 w-60">
      <label className="text-sm font-medium text-muted-foreground">Email</label>
      <Input
        placeholder="your@email.com"
        disabled
        defaultValue="user@example.com"
      />
    </div>
  )
}`,
      },
      {
        title: "With button",
        render: () => (
          <div className="flex flex-col gap-1.5 w-60">
            <label className="text-sm font-medium">Invite</label>
            <div className="flex gap-2">
              <Input placeholder="colleague@email.com" />
              <Button size="sm">Send</Button>
            </div>
          </div>
        ),
        code: `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="flex flex-col gap-1.5 w-60">
      <label className="text-sm font-medium">Invite</label>
      <div className="flex gap-2">
        <Input placeholder="colleague@email.com" />
        <Button size="sm">Send</Button>
      </div>
    </div>
  )
}`,
      },
    ],
  },

  // ─── PROGRESS ────────────────────────────────────────────────────────────────
  {
    id: "progress",
    name: "Progress",
    description: {
      en: "Displays an indicator showing the completion progress of a task.",
      es: "Muestra un indicador del progreso de completación de una tarea.",
    },
    category: "Components",
    filePath: "components/ui/progress.tsx",
    controls: {
      value:          { type: "number",  defaultValue: 60, min: 0, max: 100, step: 1 },
      showLabel:      { type: "boolean", defaultValue: false },
      showPercentage: { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { value, showLabel, showPercentage } = props as {
        value: number; showLabel: boolean; showPercentage: boolean
      }
      return (
        <div className="flex flex-col gap-2 w-64">
          {(showLabel || showPercentage) && (
            <div className="flex items-center justify-between">
              {showLabel && <span className="text-sm font-medium">Loading files...</span>}
              {showPercentage && <span className="text-sm text-muted-foreground">{value}%</span>}
            </div>
          )}
          <Progress value={value} />
        </div>
      )
    },
    generateCode: (props) => {
      const { value, showLabel, showPercentage } = props as {
        value: number; showLabel: boolean; showPercentage: boolean
      }
      const progressTag = `<Progress value={${value}} />`
      if (!showLabel && !showPercentage) {
        const indented = `    ${progressTag}`
        return `import { Progress } from "@/components/ui/progress"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
      }
      const labelLine  = showLabel      ? `      <span className="text-sm font-medium">Loading files...</span>` : ""
      const pctLine    = showPercentage ? `      <span className="text-sm text-muted-foreground">${value}%</span>` : ""
      const header     = `  <div className="flex items-center justify-between">\n${[labelLine, pctLine].filter(Boolean).join("\n")}\n  </div>`
      const body       = `<div className="flex flex-col gap-2 w-64">\n${header}\n  ${progressTag}\n</div>`
      const indented   = body.split("\n").map(l=>`    ${l}`).join("\n")
      return `import { Progress } from "@/components/ui/progress"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── RADIO GROUP ─────────────────────────────────────────────────────────────
  {
    id: "radio-group",
    name: "Radio Group",
    description: {
      en: "A set of checkable buttons where only one can be checked at a time.",
      es: "Un conjunto de botones donde solo uno puede estar seleccionado a la vez.",
    },
    category: "Components",
    filePath: "components/ui/radio-group.tsx",
    controls: {
      label:            { type: "text",    defaultValue: "Subscription plan" },
      description:      { type: "text",    defaultValue: "" },
      itemCount:        { type: "select",  options: ["2","3","4","5"], defaultValue: "3" },
      option1:          { type: "text",    defaultValue: "Option 1" },
      option2:          { type: "text",    defaultValue: "Option 2" },
      option3:          { type: "text",    defaultValue: "Option 3" },
      option4:          { type: "text",    defaultValue: "Option 4" },
      option5:          { type: "text",    defaultValue: "Option 5" },
      orientation:      { type: "select",  options: ["vertical","horizontal"], defaultValue: "vertical" },
      withDescription:  { type: "boolean", defaultValue: false },
      disabled:         { type: "boolean", defaultValue: false },
      invalid:          { type: "boolean", defaultValue: false },
    },
    controlVisible: (key, props) => {
      const match = key.match(/^option(\d)$/)
      if (!match) return true
      return Number(match[1]) <= Number(props.itemCount ?? 3)
    },
    render: (props) => {
      const { label, description, itemCount, option1, option2, option3, option4, option5, orientation, withDescription, disabled, invalid } = props as {
        label: string; description: string; itemCount: string
        option1: string; option2: string; option3: string; option4: string; option5: string
        orientation: string; withDescription: boolean; disabled: boolean; invalid: boolean
      }
      const count = Number(itemCount) || 3
      const allOptions = [option1, option2, option3, option4, option5].map((o, i) => o || `Option ${i + 1}`)
      const options = allOptions.slice(0, count).map((lbl, i) => ({ value: `option${i + 1}`, label: lbl }))

      if (withDescription) {
        return (
          <div className="flex flex-col gap-1.5">
            {label && <label className="text-sm font-medium text-foreground">{label}</label>}
            <RadioGroup defaultValue="option1" className="gap-3 w-72">
              {options.map((opt, i) => (
                <label key={opt.value} className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer">
                  <RadioGroupItem value={opt.value} id={opt.value} className="mt-0.5" disabled={disabled && i === 1} />
                  <div>
                    <p className="text-sm font-medium leading-none">{opt.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">Description for {opt.label.toLowerCase()}.</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
            {description && !invalid && <p className="text-xs text-muted-foreground">{description}</p>}
            {invalid && <p className="text-xs text-destructive">Please select an option.</p>}
          </div>
        )
      }
      return (
        <div className="flex flex-col gap-1.5">
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}
          <RadioGroup defaultValue="option1"
            className={orientation === "horizontal" ? "flex flex-row gap-6 w-fit" : "gap-3 w-fit"}>
            {options.map((opt, i) => (
              <div key={opt.value} className="flex items-center gap-2">
                <RadioGroupItem value={opt.value} id={opt.value}
                  disabled={disabled && i === 1}
                  aria-invalid={invalid ? "true" : undefined} />
                <label htmlFor={opt.value} className="text-sm cursor-pointer">{opt.label}</label>
              </div>
            ))}
          </RadioGroup>
          {description && !invalid && <p className="text-xs text-muted-foreground">{description}</p>}
          {invalid && <p className="text-xs text-destructive">Please select an option.</p>}
        </div>
      )
    },
    generateCode: (props) => {
      const { label, description, itemCount, option1, option2, option3, option4, option5, orientation, withDescription, disabled, invalid } = props as {
        label: string; description: string; itemCount: string
        option1: string; option2: string; option3: string; option4: string; option5: string
        orientation: string; withDescription: boolean; disabled: boolean; invalid: boolean
      }
      const count = Number(itemCount) || 3
      const allOptions = [option1, option2, option3, option4, option5].map((o, i) => o || `Option ${i + 1}`)
      const options = allOptions.slice(0, count).map((lbl, i) => ({ value: `option${i + 1}`, label: lbl }))
      const labelLine = label ? `  <label className="text-sm font-medium">${label}</label>\n` : ""
      const descLine = description && !invalid ? `\n  <p className="text-xs text-muted-foreground">${description}</p>` : ""
      const errorLine = invalid ? `\n  <p className="text-xs text-destructive">Please select an option.</p>` : ""
      if (withDescription) {
        const rows = options.map((opt, i) => {
          const dAttr = disabled && i === 1 ? " disabled" : ""
          return `  <label className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer">\n    <RadioGroupItem value="${opt.value}" id="${opt.value}" className="mt-0.5"${dAttr} />\n    <div>\n      <p className="text-sm font-medium leading-none">${opt.label}</p>\n      <p className="text-xs text-muted-foreground mt-1">Description for ${opt.label.toLowerCase()}.</p>\n    </div>\n  </label>`
        }).join("\n")
        const radioGroup = `<RadioGroup defaultValue="option1" className="gap-3 w-72">\n${rows}\n</RadioGroup>`
        const body = label || description || invalid
          ? `<div className="flex flex-col gap-1.5">\n${labelLine}  ${radioGroup.split("\n").join("\n  ")}${descLine}${errorLine}\n</div>`
          : radioGroup
        const indented = body.split("\n").map(l => `    ${l}`).join("\n")
        return `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
      }
      const cls = orientation === "horizontal" ? `className="flex flex-row gap-6"` : `className="gap-3"`
      const rows = options.map((opt, i) => {
        const attrs = [`value="${opt.value}"`, `id="${opt.value}"`, ...(disabled && i === 1 ? ["disabled"] : []), ...(invalid ? ['aria-invalid="true"'] : [])]
        return `  <div className="flex items-center gap-2">\n    <RadioGroupItem ${attrs.join(" ")} />\n    <label htmlFor="${opt.value}" className="text-sm cursor-pointer">${opt.label}</label>\n  </div>`
      }).join("\n")
      const radioGroup = `<RadioGroup defaultValue="option1" ${cls}>\n${rows}\n</RadioGroup>`
      const body = label || description || invalid
        ? `<div className="flex flex-col gap-1.5">\n${labelLine}  ${radioGroup.split("\n").join("\n  ")}${descLine}${errorLine}\n</div>`
        : radioGroup
      const indented = body.split("\n").map(l => `    ${l}`).join("\n")
      return `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── SELECT ──────────────────────────────────────────────────────────────────
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
      showLabel:   { type: "boolean", defaultValue: true },
      label:       { type: "text",    defaultValue: "Fruit" },
      placeholder: { type: "text",    defaultValue: "Select an option" },
      showMessage: { type: "boolean", defaultValue: false },
      description: { type: "text",    defaultValue: "Pick your favourite fruit." },
      size:        { type: "select",  options: ["default","sm"], defaultValue: "default" },
      showIcons:   { type: "boolean", defaultValue: false },
      disabled:    { type: "boolean", defaultValue: false },
      invalid:     { type: "boolean", defaultValue: false },
      groups:      { type: "boolean", defaultValue: false },
    },
    controlVisible: (key, props) => {
      if (key === "label") return !!props.showLabel
      if (key === "description") return !!props.showMessage
      return true
    },
    render: (props) => {
      const { showLabel, label, placeholder, showMessage, description, size, showIcons, disabled, invalid, groups } = props as {
        showLabel: boolean; label: string; placeholder: string
        showMessage: boolean; description: string
        size: "default" | "sm"; showIcons: boolean; disabled: boolean; invalid: boolean; groups: boolean
      }

      const FLAT_ITEMS = [
        { value: "apple",  label: "Apple",  Icon: Apple  },
        { value: "orange", label: "Orange", Icon: Citrus },
        { value: "banana", label: "Banana", Icon: Banana },
        { value: "grape",  label: "Grape",  Icon: Grape  },
        { value: "cherry", label: "Cherry", Icon: Cherry },
      ]
      const GROUP_ITEMS = [
        { group: "Fruits",     items: [
          { value: "apple",    label: "Apple",    Icon: Apple  },
          { value: "orange",   label: "Orange",   Icon: Citrus },
          { value: "banana",   label: "Banana",   Icon: Banana },
        ]},
        { group: "Vegetables", items: [
          { value: "carrot",   label: "Carrot",   Icon: Carrot  },
          { value: "broccoli", label: "Broccoli", Icon: Leaf    },
          { value: "spinach",  label: "Spinach",  Icon: Sprout  },
        ]},
      ]
      const allItems = groups
        ? GROUP_ITEMS.flatMap(g => g.items)
        : FLAT_ITEMS

      function SelectPreview() {
        const [value, setValue] = React.useState("")
        return (
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger size={size} className="w-full" disabled={disabled}
              aria-invalid={invalid ? "true" : undefined}>
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {groups ? (
                GROUP_ITEMS.map((g, gi) => (
                  <React.Fragment key={g.group}>
                    {gi > 0 && <SelectSeparator />}
                    <SelectGroup>
                      <SelectLabel>{g.group}</SelectLabel>
                      {g.items.map(({ value: v, label: lbl, Icon }) => (
                        <SelectItem key={v} value={v}>
                          <span className="flex items-center gap-1.5">
                            {showIcons && <Icon className="size-4 shrink-0 text-muted-foreground" />}
                            {lbl}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </React.Fragment>
                ))
              ) : (
                FLAT_ITEMS.map(({ value: v, label: lbl, Icon }) => (
                  <SelectItem key={v} value={v}>
                    <span className="flex items-center gap-1.5">
                      {showIcons && <Icon className="size-4 shrink-0 text-muted-foreground" />}
                      {lbl}
                    </span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )
      }

      return (
        <div className="flex flex-col gap-1.5 w-56">
          {showLabel && label && <label className="text-sm font-medium text-foreground">{label}</label>}
          <SelectPreview />
          {showMessage && description && !invalid && <p className="text-xs text-muted-foreground">{description}</p>}
          {invalid && <p className="text-xs text-destructive">Please select an option.</p>}
        </div>
      )
    },
    generateCode: (props) => {
      const { showLabel, label, placeholder, showMessage, description, size, showIcons, disabled, invalid, groups } = props as {
        showLabel: boolean; label: string; placeholder: string
        showMessage: boolean; description: string
        size: string; showIcons: boolean; disabled: boolean; invalid: boolean; groups: boolean
      }
      const FLAT_ITEMS = [
        { value: "apple",  label: "Apple",  icon: "Apple"  },
        { value: "orange", label: "Orange", icon: "Citrus" },
        { value: "banana", label: "Banana", icon: "Banana" },
        { value: "grape",  label: "Grape",  icon: "Grape"  },
        { value: "cherry", label: "Cherry", icon: "Cherry" },
      ]
      const GROUP_ITEMS = [
        { group: "Fruits", items: [
          { value: "apple",    label: "Apple",    icon: "Apple"  },
          { value: "orange",   label: "Orange",   icon: "Citrus" },
          { value: "banana",   label: "Banana",   icon: "Banana" },
        ]},
        { group: "Vegetables", items: [
          { value: "carrot",   label: "Carrot",   icon: "Carrot"  },
          { value: "broccoli", label: "Broccoli", icon: "Leaf"    },
          { value: "spinach",  label: "Spinach",  icon: "Sprout"  },
        ]},
      ]
      const allItems = groups ? GROUP_ITEMS.flatMap(g => g.items) : FLAT_ITEMS
      const iconNames = [...new Set(allItems.map(i => i.icon))]
      const lucideImport = showIcons ? `import { ${iconNames.join(", ")} } from "lucide-react"\n` : ""

      const triggerAttrs: string[] = ['className="w-full"']
      if (size !== "default") triggerAttrs.push(`size="${size}"`)
      if (disabled) triggerAttrs.push("disabled")
      if (invalid) triggerAttrs.push('aria-invalid="true"')
      const ph = placeholder || "Select an option"

      const itemLine = (v: string, lbl: string, icon: string) => {
        const inner = showIcons
          ? `<span className="flex items-center gap-1.5"><${icon} className="size-4 shrink-0 text-muted-foreground" />${lbl}</span>`
          : lbl
        return `<SelectItem value="${v}">${inner}</SelectItem>`
      }

      const itemsCode = groups
        ? GROUP_ITEMS.map((g, gi) => {
            const sep = gi > 0 ? `<SelectSeparator />\n` : ""
            const rows = g.items.map(({ value: v, label: lbl, icon }) => `  ${itemLine(v, lbl, icon)}`).join("\n")
            return `${sep}<SelectGroup>\n  <SelectLabel>${g.group}</SelectLabel>\n${rows}\n</SelectGroup>`
          }).join("\n")
        : FLAT_ITEMS.map(({ value: v, label: lbl, icon }) => itemLine(v, lbl, icon)).join("\n")

      const triggerInner = showIcons
        ? `\n    <span className="flex items-center gap-1.5 flex-1 min-w-0">\n      {selectedItem && <SelectedIcon className="size-4 shrink-0 text-muted-foreground" />}\n      <SelectValue placeholder="${ph}" />\n    </span>`
        : `\n    <SelectValue placeholder="${ph}" />`

      const stateBlock = showIcons
        ? `  const [value, setValue] = useState("")\n  const ICONS: Record<string, React.ElementType> = { ${iconNames.map((n, i) => `${allItems.find(it => it.icon === n)?.value ?? n}: ${n}`).join(", ")} }\n  const SelectedIcon = ICONS[value]\n\n`
        : `  const [value, setValue] = useState("")\n\n`

      const selectBlock = `<Select value={value} onValueChange={setValue}>\n  <SelectTrigger ${triggerAttrs.join(" ")}>${triggerInner}\n  </SelectTrigger>\n  <SelectContent>\n${itemsCode.split("\n").map(l => `    ${l}`).join("\n")}\n  </SelectContent>\n</Select>`

      const labelLine = showLabel && label ? `<label className="text-sm font-medium">${label}</label>\n  ` : ""
      const descLine = showMessage && description && !invalid ? `\n  <p className="text-xs text-muted-foreground">${description}</p>` : ""
      const errorLine = invalid ? `\n  <p className="text-xs text-destructive">Please select an option.</p>` : ""
      const inner = labelLine || descLine || errorLine
        ? `<div className="flex flex-col gap-1.5 w-56">\n  ${labelLine}${selectBlock.split("\n").join("\n  ")}${descLine}${errorLine}\n</div>`
        : selectBlock

      const indented = inner.split("\n").map(l => `    ${l}`).join("\n")
      const named = groups
        ? "Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue"
        : "Select, SelectContent, SelectItem, SelectTrigger, SelectValue"
      const reactImport = showIcons ? `import { useState } from "react"\n` : `import { useState } from "react"\n`
      return `${lucideImport}${reactImport}import { ${named} } from "@/components/ui/select"\n\nexport default function Example() {\n${stateBlock}  return (\n${indented}\n  )\n}`
    },
  },

  // ─── SLIDER ──────────────────────────────────────────────────────────────────
  {
    id: "slider",
    name: "Slider",
    description: {
      en: "An input where the user selects a value from within a given range.",
      es: "Un control deslizante donde el usuario selecciona un valor dentro de un rango.",
    },
    category: "Components",
    filePath: "components/ui/slider.tsx",
    controls: {
      type:        { type: "select",  options: ["single","range"], defaultValue: "single" },
      min:         { type: "number",  defaultValue: 0,   min: 0,   max: 100, step: 1 },
      max:         { type: "number",  defaultValue: 100, min: 1,   max: 200, step: 1 },
      step:        { type: "select",  options: ["1","5","10","25"], defaultValue: "1" },
      orientation: { type: "select",  options: ["horizontal","vertical"], defaultValue: "horizontal" },
      disabled:    { type: "boolean", defaultValue: false },
      showValue:   { type: "boolean", defaultValue: true },
      valueLabel:  { type: "text",    defaultValue: "Value" },
    },
    controlVisible: (key, props) => {
      if (key === "valueLabel") return !!props.showValue
      return true
    },
    render: (props) => {
      const { type, min, max, step, orientation, disabled, showValue, valueLabel } = props as {
        type: string; min: number; max: number; step: string
        orientation: string; disabled: boolean; showValue: boolean; valueLabel: string
      }
      const isRange = type === "range"
      const isVertical = orientation === "vertical"
      const label = valueLabel || (isRange ? "Range" : "Value")
      function SliderPreview() {
        const [val, setVal] = React.useState<number[]>(isRange ? [25, 75] : [50])
        return (
          <div className={isVertical ? "flex flex-col items-center gap-4" : "flex flex-col gap-3 w-64"}>
            {showValue && (
              isVertical ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{isRange ? `${val[0]} – ${val[1]}` : val[0]}</span>
                </div>
              ) : (
                <div className="flex justify-between w-full text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{isRange ? `${val[0]} – ${val[1]}` : val[0]}</span>
                </div>
              )
            )}
            <Slider defaultValue={isRange ? [25, 75] : [50]}
              min={min} max={max} step={Number(step)}
              orientation={orientation as "horizontal" | "vertical"}
              disabled={disabled} onValueChange={setVal}
              className={isVertical ? "h-40" : undefined} />
          </div>
        )
      }
      return <SliderPreview />
    },
    generateCode: (props) => {
      const { type, min, max, step, orientation, disabled, showValue, valueLabel } = props as {
        type: string; min: number; max: number; step: string
        orientation: string; disabled: boolean; showValue: boolean; valueLabel: string
      }
      const isRange = type === "range"
      const label = valueLabel || (isRange ? "Range" : "Value")
      const attrs: string[] = [`defaultValue={${isRange ? "[25, 75]" : "[50]"}}`]
      if (min !== 0)   attrs.push(`min={${min}}`)
      if (max !== 100) attrs.push(`max={${max}}`)
      if (step !== "1") attrs.push(`step={${step}}`)
      if (orientation !== "horizontal") attrs.push(`orientation="${orientation}"`)
      if (disabled) attrs.push("disabled")
      attrs.push("onValueChange={setVal}")
      const tag = attrs.length <= 2
        ? `<Slider ${attrs.join(" ")} />`
        : ["<Slider", ...attrs.map(a => `  ${a}`), "/>"].join("\n")
      const wrapClass = orientation === "vertical" ? "h-40" : "w-64"
      const valueRow = showValue
        ? `  <div className="flex justify-between text-sm">\n    <span className="text-muted-foreground">${label}</span>\n    <span className="font-medium">{${isRange ? "val[0] + \" – \" + val[1]" : "val[0]"}}</span>\n  </div>\n  ` : ""
      const sliderIndented = tag.split("\n").map(l => `  ${l}`).join("\n")
      const inner = `${valueRow}${sliderIndented}`
      const indented = inner.split("\n").map(l => `    ${l}`).join("\n")
      const stateBlock = `  const [val, setVal] = React.useState(${isRange ? "[25, 75]" : "[50]"})\n\n`
      return `import { useState } from "react"\nimport { Slider } from "@/components/ui/slider"\n\nexport default function Example() {\n${stateBlock}  return (\n    <div className="${wrapClass}">\n${indented}\n    </div>\n  )\n}`
    },
  },

  // ─── SWITCH ──────────────────────────────────────────────────────────────────
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
      checked:     { type: "boolean", defaultValue: false },
      label:       { type: "text",    defaultValue: "Airplane mode" },
      description: { type: "text",    defaultValue: "" },
      size:        { type: "select",  options: ["default","sm","lg"], defaultValue: "default" },
      disabled:    { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { checked, label, description, size, disabled } = props as {
        checked: boolean; label: string; description: string
        size: "default" | "sm" | "lg"; disabled: boolean
      }
      if (!label && !description) {
        return <Switch key={String(checked)} defaultChecked={checked} size={size} disabled={disabled} />
      }
      return (
        <div className="flex items-center justify-between w-72 gap-4">
          <div className="flex flex-col gap-0.5">
            {label && <p className="text-sm font-medium leading-none">{label}</p>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          <Switch key={String(checked)} defaultChecked={checked} size={size} disabled={disabled} />
        </div>
      )
    },
    generateCode: (props) => {
      const { checked, label, description, size, disabled } = props as {
        checked: boolean; label: string; description: string; size: string; disabled: boolean
      }
      const attrs: string[] = []
      if (checked) attrs.push("defaultChecked")
      if (size !== "default") attrs.push(`size="${size}"`)
      if (disabled) attrs.push("disabled")
      const switchTag = attrs.length === 0 ? `<Switch />`
        : attrs.length === 1 ? `<Switch ${attrs[0]} />`
        : `<Switch\n  ${attrs.join("\n  ")}\n/>`
      if (!label && !description) {
        const indented = switchTag.split("\n").map(l=>`    ${l}`).join("\n")
        return `import { Switch } from "@/components/ui/switch"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
      }
      const labelLine = label ? `      <p className="text-sm font-medium leading-none">${label}</p>` : ""
      const descLine = description ? `\n      <p className="text-xs text-muted-foreground mt-0.5">${description}</p>` : ""
      const body = `<div className="flex items-center justify-between w-72 gap-4">\n  <div className="flex flex-col gap-0.5">\n${labelLine}${descLine}\n  </div>\n  ${switchTag}\n</div>`
      const indented = body.split("\n").map(l=>`    ${l}`).join("\n")
      return `import { Switch } from "@/components/ui/switch"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── TABS ────────────────────────────────────────────────────────────────────
  {
    id: "tabs",
    name: "Tabs",
    description: {
      en: "A set of layered sections of content displayed one at a time.",
      es: "Un conjunto de secciones de contenido apiladas que se muestran de una en una.",
    },
    category: "Components",
    filePath: "components/ui/tabs.tsx",
    controls: {
      variant:     { type: "select",  options: ["default","line"], defaultValue: "default" },
      orientation: { type: "select",  options: ["horizontal","vertical"], defaultValue: "horizontal" },
      tabCount:    { type: "select",  options: ["2","3","4"], defaultValue: "3" },
      tab1:        { type: "text",    defaultValue: "Account" },
      tab2:        { type: "text",    defaultValue: "Password" },
      tab3:        { type: "text",    defaultValue: "Notifications" },
      tab4:        { type: "text",    defaultValue: "Settings" },
      icons:       { type: "select",  options: ["none","with text","icons only"], defaultValue: "none" },
      disabled:    { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { variant, orientation, tabCount, tab1, tab2, tab3, tab4, disabled, icons } = props as {
        variant: "default" | "line"; orientation: "horizontal" | "vertical"
        tabCount: string; tab1: string; tab2: string; tab3: string; tab4: string
        disabled: boolean; icons: string
      }
      const count = Number(tabCount) || 3
      const iconEls = [<User className="size-4" key="u"/>, <Lock className="size-4" key="l"/>, <Bell className="size-4" key="b"/>, <Search className="size-4" key="s"/>]
      const allLabels = [tab1 || "Account", tab2 || "Password", tab3 || "Notifications", tab4 || "Settings"]
      const keys = ["tab1","tab2","tab3","tab4"].slice(0, count)
      const labels = allLabels.slice(0, count)
      const showIcon = icons !== "none"
      const showLabel = icons !== "icons only"
      return (
        <div className="flex justify-center w-full">
          <Tabs defaultValue="tab1" orientation={orientation} className="w-fit">
            <TabsList variant={variant}>
              {keys.map((k, i) => (
                <TabsTrigger key={k} value={k} disabled={disabled && i === 1}>
                  {showIcon && iconEls[i]}{showLabel && labels[i]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )
    },
    compositorRender: (props) => {
      const { variant, orientation, tabCount, tab1, tab2, tab3, tab4, disabled, icons } = props as {
        variant: "default" | "line"; orientation: "horizontal" | "vertical"
        tabCount: string; tab1: string; tab2: string; tab3: string; tab4: string
        disabled: boolean; icons: string
      }
      const count = Number(tabCount) || 3
      const iconEls = [<User className="size-4" key="u"/>, <Lock className="size-4" key="l"/>, <Bell className="size-4" key="b"/>, <Search className="size-4" key="s"/>]
      const allLabels = [tab1 || "Account", tab2 || "Password", tab3 || "Notifications", tab4 || "Settings"]
      const keys = ["tab1","tab2","tab3","tab4"].slice(0, count)
      const labels = allLabels.slice(0, count)
      const showIcon = icons !== "none"
      const showLabel = icons !== "icons only"
      return (
        <Tabs defaultValue="tab1" orientation={orientation} className="w-full">
          <TabsList variant={variant}>
            {keys.map((k, i) => (
              <TabsTrigger key={k} value={k} disabled={disabled && i === 1}>
                {showIcon && iconEls[i]}{showLabel && labels[i]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )
    },
    generateCode: (props) => {
      const { variant, orientation, tabCount, tab1, tab2, tab3, tab4, disabled, icons } = props as {
        variant: string; orientation: string; tabCount: string
        tab1: string; tab2: string; tab3: string; tab4: string; disabled: boolean; icons: string
      }
      const count = Number(tabCount) || 3
      const showIcon = icons !== "none"
      const showLabel = icons !== "icons only"
      const allLabels = [tab1||"Account", tab2||"Password", tab3||"Notifications", tab4||"Settings"]
      const keys = ["tab1","tab2","tab3","tab4"].slice(0, count)
      const labels = allLabels.slice(0, count)
      const iconNames = ["User","Lock","Bell","Search"]
      const tabsAttrs = ['defaultValue="tab1"', ...(orientation !== "horizontal" ? [`orientation="${orientation}"`] : [])]
      const listAttrs = variant !== "default" ? [`variant="${variant}"`] : []
      const tabsOpen = tabsAttrs.length === 1 ? `<Tabs ${tabsAttrs[0]}>` : `<Tabs\n  ${tabsAttrs.join("\n  ")}\n>`
      const listOpen = listAttrs.length ? `<TabsList ${listAttrs[0]}>` : `<TabsList>`
      const triggers = keys.map((k, i) => {
        const attrs = [`value="${k}"`, ...(disabled && i === 1 ? ["disabled"] : [])]
        const iconPart = showIcon ? `<${iconNames[i]} className="size-4" />` : ""
        const labelPart = showLabel ? labels[i] : ""
        return `  <TabsTrigger ${attrs.join(" ")}>${iconPart}${labelPart}</TabsTrigger>`
      }).join("\n")
      const panels = keys.map((k, i) => `<TabsContent value="${k}">\n  <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">\n    Content of ${labels[i]}\n  </div>\n</TabsContent>`).join("\n")
      const body = [tabsOpen, `  ${listOpen}`, triggers.split("\n").map(l=>`  ${l}`).join("\n"), `  </TabsList>`, panels.split("\n").map(l=>`  ${l}`).join("\n"), `</Tabs>`].join("\n")
      const indented = body.split("\n").map(l=>`    ${l}`).join("\n")
      const iconImport = showIcon ? `import { ${iconNames.slice(0,count).join(", ")} } from "lucide-react"\n` : ""
      return `${iconImport}import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
  },

  // ─── TEXTAREA ────────────────────────────────────────────────────────────────
  {
    id: "textarea",
    name: "Textarea",
    description: {
      en: "Displays a multi-line text input for longer form content.",
      es: "Muestra un campo de texto de múltiples líneas para contenido más largo.",
    },
    category: "Components",
    filePath: "components/ui/textarea.tsx",
    controls: {
      showLabel:   { type: "boolean", defaultValue: true },
      label:       { type: "text",    defaultValue: "Message" },
      placeholder: { type: "text",    defaultValue: "Write your message here..." },
      showMessage: { type: "boolean", defaultValue: false },
      description: { type: "text",    defaultValue: "Max 500 characters." },
      rows:        { type: "select",  options: ["2","4","6","8"], defaultValue: "4" },
      disabled:    { type: "boolean", defaultValue: false },
      invalid:     { type: "boolean", defaultValue: false },
    },
    controlVisible: (key, props) => {
      if (key === "label") return !!props.showLabel
      if (key === "description") return !!props.showMessage
      return true
    },
    render: (props) => {
      const { showLabel, label, placeholder, showMessage, description, rows, disabled, invalid } = props as {
        showLabel: boolean; label: string; placeholder: string
        showMessage: boolean; description: string
        rows: string; disabled: boolean; invalid: boolean
      }
      return (
        <div className="w-72 flex flex-col gap-1.5">
          {showLabel && label && <label className="text-sm font-medium text-foreground">{label}</label>}
          <Textarea placeholder={placeholder} rows={Number(rows)} disabled={disabled}
            aria-invalid={invalid ? "true" : undefined} />
          {showMessage && description && !invalid && <p className="text-xs text-muted-foreground">{description}</p>}
          {invalid && <p className="text-xs text-destructive">This field is not valid.</p>}
        </div>
      )
    },
    generateCode: (props) => {
      const { showLabel, label, placeholder, showMessage, description, rows, disabled, invalid } = props as {
        showLabel: boolean; label: string; placeholder: string
        showMessage: boolean; description: string
        rows: string; disabled: boolean; invalid: boolean
      }
      const attrs: string[] = []
      if (placeholder) attrs.push(`placeholder="${placeholder}"`)
      if (rows !== "4") attrs.push(`rows={${rows}}`)
      if (disabled) attrs.push("disabled")
      if (invalid) attrs.push('aria-invalid="true"')
      const tag = attrs.length <= 1
        ? `<Textarea${attrs.length ? " " + attrs[0] : ""} />`
        : ["<Textarea", ...attrs.map(a => `  ${a}`), "/>"].join("\n")
      const labelLine = showLabel && label ? `<label className="text-sm font-medium">${label}</label>\n    ` : ""
      const descLine = showMessage && description && !invalid ? `\n    <p className="text-xs text-muted-foreground">${description}</p>` : ""
      const errorLine = invalid ? `\n    <p className="text-xs text-destructive">This field is not valid.</p>` : ""
      const inner = `${labelLine}${tag}${descLine}${errorLine}`
      const indented = inner.split("\n").map(l => `    ${l}`).join("\n")
      return `import { Textarea } from "@/components/ui/textarea"\n\nexport default function Example() {\n  return (\n    <div className="flex flex-col gap-1.5 w-72">\n${indented}\n    </div>\n  )\n}`
    },
  },

  // ─── TOOLTIP ─────────────────────────────────────────────────────────────────
  {
    id: "tooltip",
    name: "Tooltip",
    description: {
      en: "A popup that displays information related to an element when hovered or focused.",
      es: "Un popup que muestra información relacionada con un elemento al pasar el cursor o al enfocarlo.",
    },
    category: "Components",
    filePath: "components/ui/tooltip.tsx",
    controls: {
      trigger:       { type: "text",   defaultValue: "Hover me" },
      content:       { type: "text",   defaultValue: "This is a tooltip" },
      side:          { type: "select", options: ["top","right","bottom","left"], defaultValue: "top" },
      align:         { type: "select", options: ["start","center","end"], defaultValue: "center" },
      sideOffset:    { type: "select", options: ["0","4","8","12"], defaultValue: "4" },
      delayDuration: { type: "select", options: ["0","200","500","700"], defaultValue: "700" },
    },
    render: (props) => {
      const { content, side, trigger, align, sideOffset, delayDuration } = props as {
        content: string; side: "top"|"right"|"bottom"|"left"
        trigger: string; align: "start"|"center"|"end"
        sideOffset: string; delayDuration: string
      }
      return (
        <TooltipProvider>
          <Tooltip delayDuration={Number(delayDuration)}>
            <TooltipTrigger asChild>
              <Button variant="outline">{trigger || "Hover me"}</Button>
            </TooltipTrigger>
            <TooltipContent side={side} align={align} sideOffset={Number(sideOffset)}>
              {content || "This is a tooltip"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    generateCode: (props) => {
      const { content, side, trigger, align, sideOffset, delayDuration } = props as {
        content: string; side: string; trigger: string; align: string
        sideOffset: string; delayDuration: string
      }
      const tooltipAttrs = delayDuration !== "700" ? ` delayDuration={${delayDuration}}` : ""
      const contentAttrs: string[] = []
      if (side !== "top")     contentAttrs.push(`side="${side}"`)
      if (align !== "center") contentAttrs.push(`align="${align}"`)
      if (sideOffset !== "4") contentAttrs.push(`sideOffset={${sideOffset}}`)
      const contentAttrStr = contentAttrs.length ? ` ${contentAttrs.join(" ")}` : ""
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
      <Tooltip${tooltipAttrs}>
        <TooltipTrigger asChild>
          <Button variant="outline">${trigger || "Hover me"}</Button>
        </TooltipTrigger>
        <TooltipContent${contentAttrStr}>
          ${content || "This is a tooltip"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`
    },
  },
]

export const categorizedComponents = components.reduce<Record<string, ComponentEntry[]>>(
  (acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = []
    acc[comp.category].push(comp)
    return acc
  },
  {}
)

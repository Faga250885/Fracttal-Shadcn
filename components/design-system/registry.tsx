"use client"

import React from "react"
import {
  Loader2, Search, Mail, User, Lock, Bell,
  Tag, Info, AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
import {
  Avatar, AvatarImage, AvatarFallback,
  AvatarBadge, AvatarGroup, AvatarGroupCount,
} from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import type { ComponentEntry } from "./types"

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
      disabled:     { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { type, itemCount, collapsible, defaultOpen, disabled } = props as {
        type: "single" | "multiple"
        itemCount: string
        collapsible: boolean
        defaultOpen: boolean
        disabled: boolean
      }
      const count = Number(itemCount) || 3
      const items = [
        { value: "item-1", trigger: "Is it accessible?",           content: "Yes. It adheres to the WAI-ARIA design pattern." },
        { value: "item-2", trigger: "Is it styled?",               content: "Yes. It comes with default styles that match the other components' aesthetic." },
        { value: "item-3", trigger: "Is it animated?",             content: "Yes. It's animated by default, but you can disable it if you prefer." },
        { value: "item-4", trigger: "Can I customize it?",         content: "Yes. You can customize the styles using Tailwind CSS classes." },
      ].slice(0, count)

      const accordionProps =
        type === "single"
          ? { type: "single" as const, defaultValue: defaultOpen ? "item-1" : undefined, collapsible }
          : { type: "multiple" as const, defaultValue: defaultOpen ? ["item-1"] : [] }

      return (
        <Accordion {...accordionProps} className="w-80">
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value} disabled={disabled}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    },
    generateCode: (props) => {
      const { type, itemCount, collapsible, defaultOpen, disabled } = props as {
        type: string; itemCount: string; collapsible: boolean; defaultOpen: boolean; disabled: boolean
      }
      const count = Number(itemCount) || 3
      const items = [
        { value: "item-1", trigger: "Is it accessible?",   content: "Yes. It adheres to the WAI-ARIA design pattern." },
        { value: "item-2", trigger: "Is it styled?",        content: "Yes. It comes with default styles that match the other components' aesthetic." },
        { value: "item-3", trigger: "Is it animated?",      content: "Yes. It's animated by default, but you can disable it if you prefer." },
        { value: "item-4", trigger: "Can I customize it?",  content: "Yes. You can customize the styles using Tailwind CSS classes." },
      ].slice(0, count)

      const rootAttrs: string[] = [`type="${type}"`]
      if (type === "single") {
        if (defaultOpen) rootAttrs.push(`defaultValue="item-1"`)
        if (collapsible) rootAttrs.push(`collapsible`)
      } else {
        if (defaultOpen) rootAttrs.push(`defaultValue={["item-1"]}`)
      }

      const itemRows = items.map(item => {
        const disabledAttr = disabled ? " disabled" : ""
        return [
          `  <AccordionItem value="${item.value}"${disabledAttr}>`,
          `    <AccordionTrigger>${item.trigger}</AccordionTrigger>`,
          `    <AccordionContent>${item.content}</AccordionContent>`,
          `  </AccordionItem>`,
        ].join("\n")
      }).join("\n")

      const attrStr = rootAttrs.join(" ")
      const body = `<Accordion ${attrStr} className="w-80">\n${itemRows}\n</Accordion>`
      const indented = body.split("\n").map(l => `    ${l}`).join("\n")
      return `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
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
              <Avatar key={init} size={size}>
                {withImage && <AvatarImage src={imgSrcs[i]} alt={init} />}
                <AvatarFallback>{init}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        )
      }

      return (
        <Avatar size={size}>
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
      icon:      { type: "select",  options: ["none","start","end","both"], defaultValue: "none" },
      loading:   { type: "boolean", defaultValue: false },
      disabled:  { type: "boolean", defaultValue: false },
      invalid:   { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { size, children, variant, disabled, loading, icon, invalid } = props as {
        size: string; children: string; variant: string
        disabled: boolean; loading: boolean; icon: string; invalid: boolean
      }
      const isIconSize = size.startsWith("icon")
      let content: React.ReactNode
      if (loading) {
        content = <><Loader2 className="animate-spin" />{!isIconSize && (children || "Button")}</>
      } else if (isIconSize) {
        content = <Mail />
      } else if (icon === "start") {
        content = <><Mail data-icon="inline-start" />{children || "Button"}</>
      } else if (icon === "end") {
        content = <>{children || "Button"}<Mail data-icon="inline-end" /></>
      } else if (icon === "both") {
        content = <><Mail data-icon="inline-start" />{children || "Button"}<Mail data-icon="inline-end" /></>
      } else {
        content = <>{children || "Button"}</>
      }
      return (
        <Button size={size as never} variant={variant as never}
          disabled={disabled || loading} aria-invalid={invalid ? "true" : undefined}>
          {content}
        </Button>
      )
    },
    generateCode: (props) => {
      const { children, size, variant, disabled, loading, icon, invalid } = props as {
        children: string; size: string; variant: string
        disabled: boolean; loading: boolean; icon: string; invalid: boolean
      }
      const isIconSize = size.startsWith("icon")
      const needsLoader = loading
      const needsMail = (isIconSize || icon === "start" || icon === "end" || icon === "both") && !loading

      let inner: string
      if (loading) {
        inner = isIconSize ? `\n  <Loader2 className="animate-spin" />\n` : `\n  <Loader2 className="animate-spin" />\n  ${children || "Button"}\n`
      } else if (isIconSize) {
        inner = `\n  <Mail />\n`
      } else if (icon === "start") {
        inner = `\n  <Mail data-icon="inline-start" />\n  ${children || "Button"}\n`
      } else if (icon === "end") {
        inner = `\n  ${children || "Button"}\n  <Mail data-icon="inline-end" />\n`
      } else if (icon === "both") {
        inner = `\n  <Mail data-icon="inline-start" />\n  ${children || "Button"}\n  <Mail data-icon="inline-end" />\n`
      } else {
        inner = children || "Button"
      }

      const attrs: string[] = []
      if (variant !== "default") attrs.push(`variant="${variant}"`)
      if (size !== "default") attrs.push(`size="${size}"`)
      if (disabled || loading) attrs.push("disabled")
      if (invalid) attrs.push('aria-invalid="true"')
      const attrStr = attrs.length === 0 ? "" : attrs.length === 1 ? ` ${attrs[0]}` : `\n  ${attrs.join("\n  ")}\n`
      const ml = attrs.length >= 2
      const tag = ml
        ? `<Button${attrStr}>${inner.startsWith("\n") ? inner : `\n  ${inner}\n`}</Button>`
        : `<Button${attrStr}>${inner}</Button>`
      const indented = tag.split("\n").map(l => `    ${l}`).join("\n")
      const icons: string[] = []
      if (needsLoader) icons.push("Loader2")
      if (needsMail) icons.push("Mail")
      const iconLine = icons.length ? `import { ${icons.join(", ")} } from "lucide-react"\n` : ""
      return `${iconLine}import { Button } from "@/components/ui/button"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
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
      const cls = "rounded-xl border border-zinc-200 dark:border-zinc-700"
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
        `className="rounded-xl border border-zinc-200"`,
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
      checked:     { type: "boolean", defaultValue: false },
      disabled:    { type: "boolean", defaultValue: false },
      invalid:     { type: "boolean", defaultValue: false },
      group:       { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { label, description, checked, disabled, invalid, group } = props as {
        label: string; description: string; checked: boolean
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
            <Checkbox id="cb-demo" key={String(checked)} defaultChecked={checked} disabled={disabled}
              aria-invalid={invalid ? "true" : undefined} />
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
      const { label, description, checked, disabled, invalid, group } = props as {
        label: string; description: string; checked: boolean
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
      if (checked) attrs.push("defaultChecked")
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
      label:       { type: "text",    defaultValue: "Email" },
      placeholder: { type: "text",    defaultValue: "your@email.com" },
      description: { type: "text",    defaultValue: "" },
      disabled:    { type: "boolean", defaultValue: false },
      required:    { type: "boolean", defaultValue: false },
      invalid:     { type: "boolean", defaultValue: false },
      showIcon:    { type: "boolean", defaultValue: false },
      showButton:  { type: "boolean", defaultValue: false },
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
        label: string; placeholder: string; type: string; disabled: boolean
        description: string; required: boolean; invalid: boolean; showIcon: boolean; showButton: boolean
      }
      const inputEl = (
        <div className={showIcon ? "relative flex-1 min-w-0" : showButton ? "flex-1 min-w-0" : ""}>
          {showIcon && <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />}
          <Input placeholder={placeholder} type={type as never} disabled={disabled}
            required={required || undefined} aria-invalid={invalid ? "true" : undefined}
            className={showIcon ? "pl-8" : undefined} />
        </div>
      )
      return (
        <div className="w-72 flex flex-col gap-1.5">
          {label && (
            <label className="text-sm font-medium text-foreground">
              {label}{required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
            </label>
          )}
          {showButton ? <div className="flex gap-2">{inputEl}<Button size="sm">Send</Button></div> : inputEl}
          {description && !invalid && <p className="text-xs text-muted-foreground">{description}</p>}
          {invalid && <p className="text-xs text-destructive">This field is not valid.</p>}
        </div>
      )
    },
    generateCode: (props) => {
      const { label, placeholder, type, disabled, description, required, invalid, showIcon, showButton } = props as {
        label: string; placeholder: string; type: string; disabled: boolean
        description: string; required: boolean; invalid: boolean; showIcon: boolean; showButton: boolean
      }
      const inputAttrs: string[] = []
      if (type !== "text") inputAttrs.push(`type="${type}"`)
      if (placeholder) inputAttrs.push(`placeholder="${placeholder}"`)
      if (disabled) inputAttrs.push("disabled")
      if (required) inputAttrs.push("required")
      if (invalid) inputAttrs.push('aria-invalid="true"')
      if (showIcon) inputAttrs.push('className="pl-8"')
      const inputTag = inputAttrs.length <= 1
        ? `<Input${inputAttrs.length ? " " + inputAttrs[0] : ""} />`
        : ["<Input", ...inputAttrs.map(a => `  ${a}`), "/>"].join("\n")
      const iconLine = showIcon
        ? `<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />\n    ` : ""
      const wrappedInput = showIcon
        ? `<div className="relative">\n    ${iconLine}${inputTag.split("\n").join("\n    ")}\n    </div>` : inputTag
      const labelContent = label ? `${label}${required ? `{" "}<span className="text-destructive" aria-hidden="true">*</span>` : ""}` : ""
      const labelLine = label ? `<label className="text-sm font-medium">\n      ${labelContent}\n    </label>\n    ` : ""
      const descLine = description && !invalid ? `\n    <p className="text-xs text-muted-foreground">${description}</p>` : ""
      const errorLine = invalid ? `\n    <p className="text-xs text-destructive">This field is not valid.</p>` : ""
      const inner = showButton
        ? `${labelLine}<div className="flex gap-2">\n      ${wrappedInput.split("\n").join("\n      ")}\n      <Button>Send</Button>\n    </div>${descLine}${errorLine}`
        : `${labelLine}${wrappedInput}${descLine}${errorLine}`
      const indented = inner.split("\n").map(l => `    ${l}`).join("\n")
      const imports = [
        showIcon ? 'import { Search } from "lucide-react"' : null,
        showButton ? 'import { Button } from "@/components/ui/button"' : null,
        'import { Input } from "@/components/ui/input"',
      ].filter(Boolean).join("\n")
      return `${imports}\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
    },
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
      orientation:      { type: "select",  options: ["vertical","horizontal"], defaultValue: "vertical" },
      withDescription:  { type: "boolean", defaultValue: false },
      disabled:         { type: "boolean", defaultValue: false },
      invalid:          { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { orientation, withDescription, disabled, invalid } = props as {
        orientation: string; withDescription: boolean; disabled: boolean; invalid: boolean
      }
      if (withDescription) {
        const plans = [
          { value: "free",       name: "Free",       price: "$0/mo",  desc: "Perfect for individuals and small projects." },
          { value: "pro",        name: "Pro",        price: "$12/mo", desc: "For growing teams and businesses." },
          { value: "enterprise", name: "Enterprise", price: "$49/mo", desc: "For large organizations with advanced needs." },
        ]
        return (
          <RadioGroup defaultValue="pro" className="gap-3 w-72">
            {plans.map(plan => (
              <label key={plan.value} className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer">
                <RadioGroupItem value={plan.value} id={plan.value} className="mt-0.5" disabled={disabled} />
                <div className="flex flex-1 justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium leading-none">{plan.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
                  </div>
                  <p className="text-sm font-medium shrink-0">{plan.price}</p>
                </div>
              </label>
            ))}
          </RadioGroup>
        )
      }
      const items = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]
      return (
        <RadioGroup defaultValue="option1"
          className={orientation === "horizontal" ? "flex flex-row gap-6 w-fit" : "gap-3 w-fit"}>
          {items.map((item, i) => (
            <div key={item.value} className="flex items-center gap-2">
              <RadioGroupItem value={item.value} id={item.value}
                disabled={disabled && i === 1}
                aria-invalid={invalid ? "true" : undefined} />
              <label htmlFor={item.value} className="text-sm cursor-pointer">{item.label}</label>
            </div>
          ))}
        </RadioGroup>
      )
    },
    generateCode: (props) => {
      const { orientation, withDescription, disabled, invalid } = props as {
        orientation: string; withDescription: boolean; disabled: boolean; invalid: boolean
      }
      if (withDescription) {
        const plans = [
          { value: "free",       name: "Free",       price: "$0/mo",  desc: "Perfect for individuals." },
          { value: "pro",        name: "Pro",        price: "$12/mo", desc: "For growing teams." },
          { value: "enterprise", name: "Enterprise", price: "$49/mo", desc: "For large organizations." },
        ]
        const rows = plans.map(p => {
          const dAttr = disabled ? " disabled" : ""
          return `  <label className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer">\n    <RadioGroupItem value="${p.value}" id="${p.value}" className="mt-0.5"${dAttr} />\n    <div className="flex flex-1 justify-between gap-2">\n      <div>\n        <p className="text-sm font-medium leading-none">${p.name}</p>\n        <p className="text-xs text-muted-foreground mt-1">${p.desc}</p>\n      </div>\n      <p className="text-sm font-medium shrink-0">${p.price}</p>\n    </div>\n  </label>`
        }).join("\n")
        const body = `<RadioGroup defaultValue="pro" className="gap-3 w-72">\n${rows}\n</RadioGroup>`
        const indented = body.split("\n").map(l=>`    ${l}`).join("\n")
        return `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
      }
      const items = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]
      const cls = orientation === "horizontal" ? `className="flex flex-row gap-6"` : `className="gap-3"`
      const rows = items.map((item, i) => {
        const attrs = [`value="${item.value}"`, `id="${item.value}"`, ...(disabled && i === 1 ? ["disabled"] : []), ...(invalid ? ['aria-invalid="true"'] : [])]
        return `  <div className="flex items-center gap-2">\n    <RadioGroupItem ${attrs.join(" ")} />\n    <label htmlFor="${item.value}" className="text-sm cursor-pointer">${item.label}</label>\n  </div>`
      }).join("\n")
      const body = `<RadioGroup defaultValue="option1" ${cls}>\n${rows}\n</RadioGroup>`
      const indented = body.split("\n").map(l=>`    ${l}`).join("\n")
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
      label:       { type: "text",    defaultValue: "Fruit" },
      description: { type: "text",    defaultValue: "" },
      placeholder: { type: "text",    defaultValue: "Select an option" },
      size:        { type: "select",  options: ["default","sm"], defaultValue: "default" },
      disabled:    { type: "boolean", defaultValue: false },
      invalid:     { type: "boolean", defaultValue: false },
      groups:      { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { label, description, placeholder, size, disabled, invalid, groups } = props as {
        label: string; description: string; placeholder: string
        size: "default" | "sm"; disabled: boolean; invalid: boolean; groups: boolean
      }
      return (
        <div className="flex flex-col gap-1.5 w-56">
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}
          <Select>
            <SelectTrigger size={size} className="w-full" disabled={disabled}
              aria-invalid={invalid ? "true" : undefined}>
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
          {description && !invalid && <p className="text-xs text-muted-foreground">{description}</p>}
          {invalid && <p className="text-xs text-destructive">Please select an option.</p>}
        </div>
      )
    },
    generateCode: (props) => {
      const { label, description, placeholder, size, disabled, invalid, groups } = props as {
        label: string; description: string; placeholder: string
        size: string; disabled: boolean; invalid: boolean; groups: boolean
      }
      const triggerAttrs: string[] = ['className="w-full"']
      if (size !== "default") triggerAttrs.push(`size="${size}"`)
      if (disabled) triggerAttrs.push("disabled")
      if (invalid) triggerAttrs.push('aria-invalid="true"')
      const ph = placeholder || "Select an option"
      const items = groups
        ? [`<SelectGroup>`, `  <SelectLabel>Fruits</SelectLabel>`, `  <SelectItem value="apple">Apple</SelectItem>`, `  <SelectItem value="orange">Orange</SelectItem>`, `  <SelectItem value="banana">Banana</SelectItem>`, `</SelectGroup>`, `<SelectSeparator />`, `<SelectGroup>`, `  <SelectLabel>Vegetables</SelectLabel>`, `  <SelectItem value="carrot">Carrot</SelectItem>`, `  <SelectItem value="broccoli">Broccoli</SelectItem>`, `  <SelectItem value="spinach">Spinach</SelectItem>`, `</SelectGroup>`].join("\n")
        : [`<SelectItem value="apple">Apple</SelectItem>`, `<SelectItem value="orange">Orange</SelectItem>`, `<SelectItem value="banana">Banana</SelectItem>`, `<SelectItem value="grape">Grape</SelectItem>`, `<SelectItem value="mango">Mango</SelectItem>`].join("\n")
      const labelLine = label ? `  <label className="text-sm font-medium">${label}</label>\n` : ""
      const descLine = description && !invalid ? `\n  <p className="text-xs text-muted-foreground">${description}</p>` : ""
      const errorLine = invalid ? `\n  <p className="text-xs text-destructive">Please select an option.</p>` : ""
      const body = `<Select>\n  <SelectTrigger ${triggerAttrs.join(" ")}>\n    <SelectValue placeholder="${ph}" />\n  </SelectTrigger>\n  <SelectContent>\n${items.split("\n").map(l => `    ${l}`).join("\n")}\n  </SelectContent>\n</Select>`
      const wrapper = label || description || invalid
        ? `<div className="flex flex-col gap-1.5 w-56">\n${labelLine}  ${body.split("\n").join("\n  ")}${descLine}${errorLine}\n</div>`
        : body
      const indented = wrapper.split("\n").map(l => `    ${l}`).join("\n")
      const named = groups
        ? "Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue"
        : "Select, SelectContent, SelectItem, SelectTrigger, SelectValue"
      return `import { ${named} } from "@/components/ui/select"\n\nexport default function Example() {\n  return (\n${indented}\n  )\n}`
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
    },
    render: (props) => {
      const { type, min, max, step, orientation, disabled, showValue } = props as {
        type: string; min: number; max: number; step: string
        orientation: string; disabled: boolean; showValue: boolean
      }
      const isRange = type === "range"
      const isVertical = orientation === "vertical"
      function SliderPreview() {
        const [val, setVal] = React.useState<number[]>(isRange ? [25, 75] : [50])
        return (
          <div className={isVertical ? "flex flex-col items-center gap-4" : "flex flex-col gap-3 w-64"}>
            {showValue && (
              <div className="flex justify-between w-full text-sm">
                <span className="text-muted-foreground">{isRange ? "Range" : "Value"}</span>
                <span className="font-medium text-foreground">{isRange ? `${val[0]} – ${val[1]}` : val[0]}</span>
              </div>
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
      const { type, min, max, step, orientation, disabled } = props as {
        type: string; min: number; max: number; step: string; orientation: string; disabled: boolean
      }
      const isRange = type === "range"
      const attrs: string[] = [`defaultValue={${isRange ? "[25, 75]" : "[50]"}}`]
      if (min !== 0)  attrs.push(`min={${min}}`)
      if (max !== 100) attrs.push(`max={${max}}`)
      if (step !== "1") attrs.push(`step={${step}}`)
      if (orientation !== "horizontal") attrs.push(`orientation="${orientation}"`)
      if (disabled) attrs.push("disabled")
      const tag = attrs.length <= 2
        ? `<Slider ${attrs.join(" ")} />`
        : ["<Slider", ...attrs.map(a=>`  ${a}`), "/>"].join("\n")
      const wrapClass = orientation === "vertical" ? '"h-40"' : '"w-64"'
      const indented = tag.split("\n").map(l=>`      ${l}`).join("\n")
      return `import { Slider } from "@/components/ui/slider"\n\nexport default function Example() {\n  return (\n    <div className=${wrapClass}>\n${indented}\n    </div>\n  )\n}`
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
        <Tabs defaultValue="tab1" orientation={orientation} className="w-80">
          <TabsList variant={variant}>
            {keys.map((k, i) => (
              <TabsTrigger key={k} value={k} disabled={disabled && i === 1}>
                {showIcon && iconEls[i]}{showLabel && labels[i]}
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
      placeholder: { type: "text",    defaultValue: "Write your message here..." },
      label:       { type: "text",    defaultValue: "Message" },
      description: { type: "text",    defaultValue: "" },
      rows:        { type: "select",  options: ["2","4","6","8"], defaultValue: "4" },
      disabled:    { type: "boolean", defaultValue: false },
      invalid:     { type: "boolean", defaultValue: false },
    },
    render: (props) => {
      const { placeholder, label, description, rows, disabled, invalid } = props as {
        placeholder: string; label: string; description: string
        rows: string; disabled: boolean; invalid: boolean
      }
      return (
        <div className="w-72 flex flex-col gap-1.5">
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}
          <Textarea placeholder={placeholder} rows={Number(rows)} disabled={disabled}
            aria-invalid={invalid ? "true" : undefined} />
          {description && !invalid && <p className="text-xs text-muted-foreground">{description}</p>}
          {invalid && <p className="text-xs text-destructive">This field is not valid.</p>}
        </div>
      )
    },
    generateCode: (props) => {
      const { placeholder, label, description, rows, disabled, invalid } = props as {
        placeholder: string; label: string; description: string
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
      const labelLine = label ? `<label className="text-sm font-medium">${label}</label>\n    ` : ""
      const descLine = description && !invalid ? `\n    <p className="text-xs text-muted-foreground">${description}</p>` : ""
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

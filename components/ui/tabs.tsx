"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent rounded-none",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = React.useState({
    left: 0, top: 0, width: 0, height: 0, ready: false,
  })

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list || variant !== "default") return

    function update() {
      const active = list!.querySelector('[data-state="active"]') as HTMLElement | null
      if (!active) return
      const style = getComputedStyle(list!)
      const pt = parseFloat(style.paddingTop)
      const pb = parseFloat(style.paddingBottom)
      setIndicator({
        left:   active.offsetLeft,
        top:    pt,
        width:  active.offsetWidth,
        height: list!.offsetHeight - pt - pb,
        ready:  true,
      })
    }

    update()

    // Observa cambios en data-state de los triggers
    const mo = new MutationObserver(update)
    mo.observe(list, { attributes: true, subtree: true, attributeFilter: ["data-state"] })

    // Recalcula si el contenedor cambia de tamaño
    const ro = new ResizeObserver(update)
    ro.observe(list)

    return () => { mo.disconnect(); ro.disconnect() }
  }, [variant])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), "relative", className)}
      {...props}
    >
      {/* Indicador deslizante — solo en variante default */}
      {variant === "default" && indicator.ready && (
        <span
          aria-hidden
          className="absolute rounded-md bg-background shadow-sm pointer-events-none transition-[left,top,width,height] duration-200 ease-out dark:border dark:border-input dark:bg-input/30"
          style={{
            left:   indicator.left,
            top:    indicator.top,
            width:  indicator.width,
            height: indicator.height,
          }}
        />
      )}
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap transition-colors",
        "text-foreground/60 hover:text-foreground",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start",
        "data-[state=active]:text-foreground",
        "dark:text-muted-foreground dark:hover:text-foreground dark:data-[state=active]:text-foreground",
        // line variant indicator
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity",
        "group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5",
        "group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5",
        "group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }

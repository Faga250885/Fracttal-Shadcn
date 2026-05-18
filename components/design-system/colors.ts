export type ColorSwatch = {
  name: string
  light: { color: string; label: string }
  dark: { color: string; label: string }
}

export type ColorGroup = {
  id: string
  name: string
  swatches: ColorSwatch[]
  /** span full row in the grid */
  wide?: boolean
}

export const colorGroups: ColorGroup[] = [
  {
    id: "fracttal-ai",
    name: "Fracttal AI",
    swatches: [
      {
        name: "AI 1",
        light: { color: "#044EC6", label: "#044EC6" },
        dark:  { color: "#007AFF", label: "#007AFF" },
      },
      {
        name: "AI 2",
        light: { color: "#00C7FF", label: "#00C7FF" },
        dark:  { color: "#00E4FF", label: "#00E4FF" },
      },
    ],
  },
  {
    id: "primary",
    name: "Primary",
    swatches: [
      {
        name: "Primary main",
        light: { color: "#2929FF", label: "#2929FF" },
        dark:  { color: "#92B8FF", label: "#92B8FF" },
      },
      {
        name: "Primary light",
        light: { color: "#00C7FF", label: "#00C7FF" },
        dark:  { color: "#E5EFFF", label: "#E5EFFF" },
      },
      {
        name: "Primary dark",
        light: { color: "#102758", label: "#102758" },
        dark:  { color: "#5A7FBD", label: "#5A7FBD" },
      },
    ],
  },
  {
    id: "secondary",
    name: "Secondary",
    swatches: [
      {
        name: "Secondary main",
        light: { color: "#1050DB", label: "#1050DB" },
        dark:  { color: "#AFCDFF", label: "#AFCDFF" },
      },
      {
        name: "Secondary light",
        light: { color: "#D7E6FF", label: "#D7E6FF" },
        dark:  { color: "#CFE1FF", label: "#CFE1FF" },
      },
      {
        name: "Secondary dark",
        light: { color: "#0B4199", label: "#0B4199" },
        dark:  { color: "#76A7FB", label: "#76A7FB" },
      },
    ],
  },
  {
    id: "text",
    name: "Text",
    swatches: [
      {
        name: "Text primary",
        light: { color: "#000000", label: "#000000" },
        dark:  { color: "#FFFFFF", label: "#FFFFFF" },
      },
      {
        name: "Text secondary",
        light: { color: "#5A5A5A", label: "#5A5A5A" },
        dark:  { color: "#B3BCD1", label: "#B3BCD1" },
      },
      {
        name: "Text disabled",
        light: { color: "#A2A2A2", label: "#A2A2A2" },
        dark:  { color: "#62738C", label: "#62738C" },
      },
    ],
  },
  {
    id: "action",
    name: "Action",
    wide: true,
    swatches: [
      {
        name: "Default",
        light: { color: "#5A5A5A", label: "#5A5A5A" },
        dark:  { color: "#ABACAE", label: "#ABACAE" },
      },
      {
        name: "Hover",
        light: { color: "#4687F11A", label: "#4687F1 (10%)" },
        dark:  { color: "rgba(146,187,255,0.1)", label: "rgba(146,187,255,.1)" },
      },
      {
        name: "Active",
        light: { color: "#4D4D4D", label: "#4D4D4D" },
        dark:  { color: "#BFC0C2", label: "#BFC0C2" },
      },
      {
        name: "Disabled",
        light: { color: "#9D9D9D", label: "#9D9D9D" },
        dark:  { color: "#56595D", label: "#56595D" },
      },
      {
        name: "Background",
        light: { color: "rgba(0,0,0,0.03)", label: "#000000 (3%)" },
        dark:  { color: "rgba(255,255,255,0.03)", label: "#FFF (3%)" },
      },
    ],
  },
  {
    id: "other",
    name: "Other",
    wide: true,
    swatches: [
      {
        name: "Backdrop",
        light: { color: "rgba(0,0,0,0.4)", label: "rgba(0,0,0,.4)" },
        dark:  { color: "rgba(0,0,0,0.4)", label: "rgba(0,0,0,.4)" },
      },
      {
        name: "Divider",
        light: { color: "#E6E6E6", label: "#E6E6E6" },
        dark:  { color: "#414348", label: "#414348" },
      },
      {
        name: "Snackbar",
        light: { color: "#262626", label: "#262626" },
        dark:  { color: "#E0E0E1", label: "#E0E0E1" },
      },
      {
        name: "Outline",
        light: { color: "#9D9D9D", label: "#9D9D9D" },
        dark:  { color: "#484E52", label: "#484E52" },
      },
      {
        name: "Rating",
        light: { color: "#FEB436", label: "#FEB436" },
        dark:  { color: "#FEB436", label: "#FEB436" },
      },
      {
        name: "Blue bg",
        light: { color: "#EDF3FE", label: "#EDF3FE" },
        dark:  { color: "#333A47", label: "#333A47" },
      },
    ],
  },
  {
    id: "error",
    name: "Error status",
    swatches: [
      {
        name: "Error main",
        light: { color: "#E63946", label: "#E63946" },
        dark:  { color: "#FF5C5C", label: "#FF5C5C" },
      },
      {
        name: "Error light",
        light: { color: "#F58A92", label: "#F58A92" },
        dark:  { color: "#FFC4C4", label: "#FFC4C4" },
      },
      {
        name: "Error dark",
        light: { color: "#B92D38", label: "#B92D38" },
        dark:  { color: "#FF8A8A", label: "#FF8A8A" },
      },
      {
        name: "Error bg",
        light: { color: "#E639461A", label: "#E63946 (10%)" },
        dark:  { color: "#FF5C5C1F", label: "#FF5C5C (12%)" },
      },
    ],
  },
  {
    id: "warning",
    name: "Warning status",
    swatches: [
      {
        name: "Warning main",
        light: { color: "#F5A623", label: "#F5A623" },
        dark:  { color: "#FFCA4A", label: "#FFCA4A" },
      },
      {
        name: "Warning light",
        light: { color: "#FFD77A", label: "#FFD77A" },
        dark:  { color: "#FFD87A", label: "#FFD87A" },
      },
      {
        name: "Warning dark",
        light: { color: "#C8841C", label: "#C8841C" },
        dark:  { color: "#C08000", label: "#C08000" },
      },
      {
        name: "Warning bg",
        light: { color: "#F5A6231F", label: "#F5A623 (12%)" },
        dark:  { color: "#FFCA4A1A", label: "#FFCA4A (10%)" },
      },
    ],
  },
  {
    id: "info",
    name: "Info status",
    swatches: [
      {
        name: "Info main",
        light: { color: "#007AFF", label: "#007AFF" },
        dark:  { color: "#5EA9FF", label: "#5EA9FF" },
      },
      {
        name: "Info light",
        light: { color: "#66B2FF", label: "#66B2FF" },
        dark:  { color: "#CEE5FF", label: "#CEE5FF" },
      },
      {
        name: "Info dark",
        light: { color: "#005FCC", label: "#005FCC" },
        dark:  { color: "#96C5FF", label: "#96C5FF" },
      },
      {
        name: "Info bg",
        light: { color: "#007AFF1A", label: "#007AFF (10%)" },
        dark:  { color: "#5EA9FF1F", label: "#5EA9FF (12%)" },
      },
    ],
  },
  {
    id: "success",
    name: "Success status",
    swatches: [
      {
        name: "Success main",
        light: { color: "#1CC853", label: "#1CC853" },
        dark:  { color: "#29E18A", label: "#29E18A" },
      },
      {
        name: "Success light",
        light: { color: "#68E26F", label: "#68E26F" },
        dark:  { color: "#C8FFDB", label: "#C8FFDB" },
      },
      {
        name: "Success dark",
        light: { color: "#149A40", label: "#149A40" },
        dark:  { color: "#61EBB1", label: "#61EBB1" },
      },
      {
        name: "Success bg",
        light: { color: "#1CC8531A", label: "#1CC853 (10%)" },
        dark:  { color: "#29E18A1A", label: "#29E18A (10%)" },
      },
    ],
  },
  {
    id: "content",
    name: "Content",
    swatches: [
      {
        name: "Primary & secondary",
        light: { color: "#FFFFFF", label: "#FFFFFF" },
        dark:  { color: "#000000", label: "#000000" },
      },
      {
        name: "Status",
        light: { color: "#000000", label: "#000000" },
        dark:  { color: "#FFFFFF", label: "#FFFFFF" },
      },
    ],
  },
  {
    id: "background",
    name: "Background",
    swatches: [
      {
        name: "Surface",
        light: { color: "#FFFFFF", label: "#FFFFFF" },
        dark:  { color: "#2C2F34", label: "#2C2F34" },
      },
      {
        name: "Background",
        light: { color: "#E3EDFD", label: "#E3EDFD" },
        dark:  { color: "#1F2124", label: "#1F2124" },
      },
      {
        name: "Bg accent",
        light: { color: "#D5DEEB", label: "#D5DEEB" },
        dark:  { color: "#161719", label: "#161719" },
      },
    ],
  },
]

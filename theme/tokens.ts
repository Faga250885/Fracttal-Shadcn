/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DESIGN TOKENS — fuente única de verdad
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Este archivo controla todos los colores del Design System.
 *  Pasos para personalizar el tema:
 *
 *  1. Edita `brandPalette` con los colores exactos de tu marca.
 *  2. En `theme.light` / `theme.dark`, asigna los colores de la paleta
 *     a cada token semántico (o escribe el valor directamente).
 *  3. Guarda el archivo — los componentes se actualizan solos.
 *
 *  Tu app también puede importar `brandPalette` para usar los mismos
 *  colores en otros contextos (React Native, web, emails, etc.):
 *
 *    import { brandPalette } from "@tu-empresa/design-tokens"
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── 1. PALETA DE MARCA ───────────────────────────────────────────────────────
// Colores con nombres propios de la empresa.
// Tu app importa directamente de aquí.

export const brandPalette = {
  // ── Neutros ────────────────────────────────────────────────────────────────
  white:        "oklch(1 0 0)",
  nearWhite:    "oklch(0.985 0 0)",
  gray50:       "oklch(0.97 0 0)",
  gray100:      "oklch(0.922 0 0)",
  gray200:      "oklch(0.87 0 0)",
  gray300:      "oklch(0.78 0 0)",
  gray400:      "oklch(0.708 0 0)",
  gray500:      "oklch(0.556 0 0)",
  gray600:      "oklch(0.439 0 0)",
  gray700:      "oklch(0.371 0 0)",
  gray800:      "oklch(0.269 0 0)",
  nearBlack:    "oklch(0.205 0 0)",
  black:        "oklch(0.145 0 0)",

  // ── Marca / Primario ───────────────────────────────────────────────────────
  blue:         "#2929FF",
  blueDark:     "#7B7BFF",

  // ── Destructivo / Error ────────────────────────────────────────────────────
  red:          "oklch(0.577 0.245 27.325)",
  redDark:      "oklch(0.704 0.191 22.216)",

  // ── Status ─────────────────────────────────────────────────────────────────
  // Personaliza estos con los colores oficiales de tu empresa
  warning:      "#F5A623",
  warningDark:  "#FFCA4A",
  success:      "#1CC853",
  successDark:  "#29E18A",
  info:         "#007AFF",
  infoDark:     "#5EA9FF",
} as const

// ─── 2. TOKENS SEMÁNTICOS ────────────────────────────────────────────────────
// Mapean la paleta a las CSS variables que usan los componentes de shadcn.
// Cambia los valores para rethemear todo el sistema de diseño.

export const theme = {

  // ── Modo claro ─────────────────────────────────────────────────────────────
  light: {
    background:              brandPalette.white,
    foreground:              brandPalette.black,

    card:                    brandPalette.white,
    "card-foreground":       brandPalette.black,

    popover:                 brandPalette.white,
    "popover-foreground":    brandPalette.black,

    primary:                 brandPalette.blue,
    "primary-foreground":    brandPalette.white,

    secondary:               brandPalette.gray50,
    "secondary-foreground":  brandPalette.nearBlack,

    muted:                   brandPalette.gray50,
    "muted-foreground":      brandPalette.gray500,

    accent:                  brandPalette.gray50,
    "accent-foreground":     brandPalette.nearBlack,

    destructive:             brandPalette.red,
    "destructive-foreground": brandPalette.nearWhite,

    border:                  brandPalette.gray300,
    input:                   brandPalette.gray300,
    ring:                    brandPalette.blue,

    "chart-1":               brandPalette.gray200,
    "chart-2":               brandPalette.gray500,
    "chart-3":               brandPalette.gray600,
    "chart-4":               brandPalette.gray700,
    "chart-5":               brandPalette.gray800,

    sidebar:                 brandPalette.nearWhite,
    "sidebar-foreground":    brandPalette.black,
    "sidebar-primary":       brandPalette.blue,
    "sidebar-primary-foreground": brandPalette.white,
    "sidebar-accent":        brandPalette.gray50,
    "sidebar-accent-foreground": brandPalette.nearBlack,
    "sidebar-border":        brandPalette.gray100,
    "sidebar-ring":          brandPalette.gray400,

    // Status (Fracttal)
    warning:                 brandPalette.warning,
    "warning-foreground":    brandPalette.white,
    success:                 brandPalette.success,
    "success-foreground":    brandPalette.white,
    info:                    brandPalette.info,
    "info-foreground":       brandPalette.white,

    radius:                  "0.5rem",
  },

  // ── Modo oscuro ────────────────────────────────────────────────────────────
  dark: {
    background:              brandPalette.black,
    foreground:              brandPalette.nearWhite,

    card:                    brandPalette.nearBlack,
    "card-foreground":       brandPalette.nearWhite,

    popover:                 brandPalette.nearBlack,
    "popover-foreground":    brandPalette.nearWhite,

    primary:                 brandPalette.blueDark,
    "primary-foreground":    brandPalette.white,

    secondary:               brandPalette.gray800,
    "secondary-foreground":  brandPalette.nearWhite,

    muted:                   brandPalette.gray800,
    "muted-foreground":      brandPalette.gray400,

    accent:                  brandPalette.gray800,
    "accent-foreground":     brandPalette.nearWhite,

    destructive:             brandPalette.redDark,
    "destructive-foreground": brandPalette.nearWhite,

    border:                  "oklch(1 0 0 / 10%)",
    input:                   "oklch(1 0 0 / 15%)",
    ring:                    brandPalette.blueDark,

    "chart-1":               brandPalette.gray200,
    "chart-2":               brandPalette.gray500,
    "chart-3":               brandPalette.gray600,
    "chart-4":               brandPalette.gray700,
    "chart-5":               brandPalette.gray800,

    sidebar:                 brandPalette.nearBlack,
    "sidebar-foreground":    brandPalette.nearWhite,
    "sidebar-primary":       brandPalette.blueDark,
    "sidebar-primary-foreground": brandPalette.white,
    "sidebar-accent":        brandPalette.gray800,
    "sidebar-accent-foreground": brandPalette.nearWhite,
    "sidebar-border":        "oklch(1 0 0 / 10%)",
    "sidebar-ring":          brandPalette.gray500,

    // Status (Fracttal)
    warning:                 brandPalette.warningDark,
    "warning-foreground":    brandPalette.black,
    success:                 brandPalette.successDark,
    "success-foreground":    brandPalette.black,
    info:                    brandPalette.infoDark,
    "info-foreground":       brandPalette.black,
  },
} as const

// ─── 3. UTILIDAD: genera el bloque CSS de variables ──────────────────────────
// Usada internamente por layout.tsx para inyectar los tokens en el <head>.

type TokenMap = Record<string, string>

export function buildCssVariables(lightTokens: TokenMap, darkTokens: TokenMap): string {
  const toVars = (map: TokenMap) =>
    Object.entries(map)
      .map(([k, v]) => `--${k}:${v}`)
      .join(";")

  return `:root{${toVars(lightTokens)}}.dark{${toVars(darkTokens)}}`
}

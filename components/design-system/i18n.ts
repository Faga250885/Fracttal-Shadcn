export type Lang = "en" | "es"

export const translations = {
  en: {
    components: "Components",
    controls: "Controls",
    configureHere: "Configure the component here.",
    selectToSeeControls: "Select a component to see its controls.",
    preview: "Preview",
    implementation: "Implementation",
    copyPaste: "Copy and paste in your project",
    selectFromLeft: "Select a component from the left panel",
    copy: "Copy",
    copied: "Copied",
    lightMode: "Light mode",
    darkMode: "Dark mode",
  },
  es: {
    components: "Componentes",
    controls: "Controles",
    configureHere: "Configura el componente aquí.",
    selectToSeeControls: "Selecciona un componente para ver sus controles.",
    preview: "Vista previa",
    implementation: "Implementación",
    copyPaste: "Copia y pega en tu proyecto",
    selectFromLeft: "Selecciona un componente del panel izquierdo",
    copy: "Copiar",
    copied: "Copiado",
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
  },
} satisfies Record<Lang, Record<string, string>>

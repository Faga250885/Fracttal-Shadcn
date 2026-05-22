export interface ApiProp {
  prop: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export const API_REFERENCE: Record<string, ApiProp[]> = {
  "button-group": [
    {
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Direction in which buttons are stacked.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional CSS classes for the group container.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      description: "Button, ButtonGroupSeparator, or ButtonGroupText elements.",
    },
    {
      prop: "ButtonGroupSeparator · orientation",
      type: '"horizontal" | "vertical"',
      default: '"vertical"',
      description: "Orientation of the separator line between buttons.",
    },
    {
      prop: "ButtonGroupText · asChild",
      type: "boolean",
      default: "false",
      description: "Merge props onto the immediate child element.",
    },
  ],

  accordion: [
    {
      prop: "type",
      type: '"single" | "multiple"',
      required: true,
      description: "Whether one or multiple items can be open at a time.",
    },
    {
      prop: "value",
      type: "string | string[]",
      description: "Controlled open state. Use with onValueChange.",
    },
    {
      prop: "defaultValue",
      type: "string | string[]",
      description: "Uncontrolled initial open item(s).",
    },
    {
      prop: "onValueChange",
      type: "(value: string | string[]) => void",
      description: "Callback fired when the open state changes.",
    },
    {
      prop: "collapsible",
      type: "boolean",
      default: "false",
      description: 'Allow closing the open item (only for type="single").',
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables all accordion items when true.",
    },
    {
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"vertical"',
      description: "Orientation of the accordion.",
    },
  ],

  alert: [
    {
      prop: "variant",
      type: '"default" | "destructive"',
      default: '"default"',
      description: "Visual style variant of the alert.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional CSS classes for the alert container.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      description: "Content rendered inside the alert.",
    },
  ],

  avatar: [
    {
      prop: "size",
      type: '"default" | "sm" | "lg"',
      default: '"default"',
      description: "Controls the dimensions of the avatar.",
    },
    {
      prop: "src",
      type: "string",
      description: "Image URL for AvatarImage.",
    },
    {
      prop: "alt",
      type: "string",
      description: "Accessible alt text for the avatar image.",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Merge props onto the immediate child element.",
    },
    {
      prop: "delayMs",
      type: "number",
      default: "0",
      description: "Delay in ms before the fallback is shown.",
    },
    {
      prop: "onLoadingStatusChange",
      type: '(status: "idle" | "loading" | "loaded" | "error") => void',
      description: "Callback when the image loading status changes.",
    },
  ],

  badge: [
    {
      prop: "variant",
      type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
      default: '"default"',
      description: "Visual style variant of the badge.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional CSS classes for the badge.",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Merge props onto the immediate child element.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      description: "Content rendered inside the badge.",
    },
  ],

  button: [
    {
      prop: "variant",
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      default: '"default"',
      description: "Visual style variant of the button.",
    },
    {
      prop: "size",
      type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
      default: '"default"',
      description: "Size of the button.",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Render as a child element (e.g. <a>) instead of <button>.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the button and prevents interaction.",
    },
    {
      prop: "type",
      type: '"button" | "submit" | "reset"',
      default: '"button"',
      description: "HTML button type attribute.",
    },
    {
      prop: "onClick",
      type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
      description: "Click event handler.",
    },
  ],

  calendar: [
    {
      prop: "mode",
      type: '"single" | "multiple" | "range"',
      default: '"single"',
      description: "Selection mode of the calendar.",
    },
    {
      prop: "selected",
      type: "Date | Date[] | DateRange | undefined",
      description: "Controlled selected date(s).",
    },
    {
      prop: "defaultMonth",
      type: "Date",
      description: "The month displayed on first render.",
    },
    {
      prop: "disabled",
      type: "Matcher | Matcher[]",
      description: "Dates to disable. Accepts a date, range, or matcher fn.",
    },
    {
      prop: "fromDate",
      type: "Date",
      description: "Earliest selectable date.",
    },
    {
      prop: "toDate",
      type: "Date",
      description: "Latest selectable date.",
    },
    {
      prop: "numberOfMonths",
      type: "number",
      default: "1",
      description: "Number of months to display side-by-side.",
    },
    {
      prop: "showOutsideDays",
      type: "boolean",
      default: "true",
      description: "Show days from adjacent months in the grid.",
    },
    {
      prop: "initialFocus",
      type: "boolean",
      default: "false",
      description: "Move focus to the calendar on mount.",
    },
    {
      prop: "captionLayout",
      type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
      default: '"label"',
      description: "Controls the calendar header — plain label or month/year dropdowns.",
    },
    {
      prop: "buttonVariant",
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      default: '"ghost"',
      description: "Variant applied to the navigation and day buttons inside the calendar.",
    },
    {
      prop: "onSelect",
      type: "(value: Date | Date[] | DateRange | undefined) => void",
      description: "Callback fired when a date is selected. Signature varies with mode.",
    },
    {
      prop: "timeZone",
      type: "string",
      description: "User's IANA timezone for proper date display (e.g. 'America/New_York').",
    },
  ],

  checkbox: [
    {
      prop: "checked",
      type: "boolean | 'indeterminate'",
      description: "Controlled checked state of the checkbox.",
    },
    {
      prop: "defaultChecked",
      type: "boolean",
      default: "false",
      description: "Uncontrolled initial checked state.",
    },
    {
      prop: "onCheckedChange",
      type: "(checked: boolean | 'indeterminate') => void",
      description: "Callback fired when the checked state changes.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the checkbox.",
    },
    {
      prop: "required",
      type: "boolean",
      default: "false",
      description: "Marks the checkbox as required in a form.",
    },
    {
      prop: "name",
      type: "string",
      description: "Name attribute for form submission.",
    },
    {
      prop: "value",
      type: "string",
      default: '"on"',
      description: "Value submitted in a form when checked.",
    },
    {
      prop: "id",
      type: "string",
      description: "HTML id — used to associate with a <label>.",
    },
  ],

  dialog: [
    {
      prop: "open",
      type: "boolean",
      description: "Controlled open state of the dialog.",
    },
    {
      prop: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Uncontrolled initial open state.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Callback fired when the open state changes.",
    },
    {
      prop: "modal",
      type: "boolean",
      default: "true",
      description: "When true, interaction outside the dialog is blocked.",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      description: "Trigger, content, and other dialog sub-components.",
    },
    {
      prop: "showCloseButton",
      type: "boolean",
      default: "true",
      description: "Show or hide the default close (×) button on DialogContent.",
    },
  ],

  input: [
    {
      prop: "type",
      type: "string",
      default: '"text"',
      description: "HTML input type (text, email, password, number, etc.).",
    },
    {
      prop: "value",
      type: "string | number",
      description: "Controlled value of the input.",
    },
    {
      prop: "defaultValue",
      type: "string | number",
      description: "Uncontrolled initial value.",
    },
    {
      prop: "onChange",
      type: "(event: React.ChangeEvent<HTMLInputElement>) => void",
      description: "Callback fired on every value change.",
    },
    {
      prop: "placeholder",
      type: "string",
      description: "Placeholder text shown when the input is empty.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the input.",
    },
    {
      prop: "readOnly",
      type: "boolean",
      default: "false",
      description: "Makes the input read-only.",
    },
    {
      prop: "required",
      type: "boolean",
      default: "false",
      description: "Marks the input as required in a form.",
    },
    {
      prop: "name",
      type: "string",
      description: "Name attribute for form submission.",
    },
    {
      prop: "id",
      type: "string",
      description: "HTML id — used to associate with a <label>.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional CSS classes for the input.",
    },
  ],

  progress: [
    {
      prop: "value",
      type: "number | null",
      description: "Current progress value (0–max). Pass null to show an indeterminate animated state.",
    },
    {
      prop: "max",
      type: "number",
      default: "100",
      description: "Maximum value of the progress bar.",
    },
    {
      prop: "getValueLabel",
      type: "(value: number, max: number) => string",
      description: "Function to build the accessible aria-valuetext label.",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Merge props onto the immediate child element.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional CSS classes for the progress root.",
    },
  ],

  "radio-group": [
    {
      prop: "value",
      type: "string",
      description: "Controlled value of the selected radio item.",
    },
    {
      prop: "defaultValue",
      type: "string",
      description: "Uncontrolled initial selected value.",
    },
    {
      prop: "onValueChange",
      type: "(value: string) => void",
      description: "Callback fired when the selected value changes.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables all radio items in the group.",
    },
    {
      prop: "required",
      type: "boolean",
      default: "false",
      description: "Marks the group as required in a form.",
    },
    {
      prop: "name",
      type: "string",
      description: "Name attribute shared by all radio items for form submission.",
    },
    {
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"vertical"',
      description: "Orientation used for keyboard navigation.",
    },
    {
      prop: "loop",
      type: "boolean",
      default: "true",
      description: "Whether keyboard navigation loops from last to first item.",
    },
  ],

  select: [
    {
      prop: "value",
      type: "string",
      description: "Controlled value of the select.",
    },
    {
      prop: "defaultValue",
      type: "string",
      description: "Uncontrolled initial value.",
    },
    {
      prop: "onValueChange",
      type: "(value: string) => void",
      description: "Callback fired when the selected value changes.",
    },
    {
      prop: "open",
      type: "boolean",
      description: "Controlled open state of the dropdown.",
    },
    {
      prop: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Uncontrolled initial open state.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Callback fired when the open state changes.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the select.",
    },
    {
      prop: "required",
      type: "boolean",
      default: "false",
      description: "Marks the select as required in a form.",
    },
    {
      prop: "name",
      type: "string",
      description: "Name attribute for form submission.",
    },
    {
      prop: "placeholder",
      type: "string",
      description: "Text shown in SelectTrigger when no value is selected.",
    },
    {
      prop: "dir",
      type: '"ltr" | "rtl"',
      description: "Reading direction for keyboard navigation.",
    },
    {
      prop: "SelectTrigger · size",
      type: '"default" | "sm"',
      default: '"default"',
      description: "Visual size of the trigger button.",
    },
    {
      prop: "SelectContent · position",
      type: '"item-aligned" | "popper"',
      default: '"popper"',
      description: "Positioning strategy of the dropdown relative to the trigger.",
    },
  ],

  slider: [
    {
      prop: "value",
      type: "number[]",
      description: "Controlled value(s). Array supports multi-thumb sliders.",
    },
    {
      prop: "defaultValue",
      type: "number[]",
      description: "Uncontrolled initial value(s).",
    },
    {
      prop: "onValueChange",
      type: "(value: number[]) => void",
      description: "Callback fired continuously while dragging.",
    },
    {
      prop: "onValueCommit",
      type: "(value: number[]) => void",
      description: "Callback fired only when the user releases the thumb.",
    },
    {
      prop: "min",
      type: "number",
      default: "0",
      description: "Minimum value of the slider.",
    },
    {
      prop: "max",
      type: "number",
      default: "100",
      description: "Maximum value of the slider.",
    },
    {
      prop: "step",
      type: "number",
      default: "1",
      description: "Step increment between values.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the slider.",
    },
    {
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Orientation of the slider.",
    },
    {
      prop: "inverted",
      type: "boolean",
      default: "false",
      description: "Reverses the direction of the slider.",
    },
    {
      prop: "minStepsBetweenThumbs",
      type: "number",
      default: "0",
      description: "Minimum distance between thumbs in a range slider.",
    },
  ],

  switch: [
    {
      prop: "checked",
      type: "boolean",
      description: "Controlled checked (on) state of the switch.",
    },
    {
      prop: "defaultChecked",
      type: "boolean",
      default: "false",
      description: "Uncontrolled initial checked state.",
    },
    {
      prop: "onCheckedChange",
      type: "(checked: boolean) => void",
      description: "Callback fired when the checked state changes.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the switch.",
    },
    {
      prop: "required",
      type: "boolean",
      default: "false",
      description: "Marks the switch as required in a form.",
    },
    {
      prop: "name",
      type: "string",
      description: "Name attribute for form submission.",
    },
    {
      prop: "value",
      type: "string",
      default: '"on"',
      description: "Value submitted in a form when checked.",
    },
    {
      prop: "id",
      type: "string",
      description: "HTML id — used to associate with a <label>.",
    },
    {
      prop: "size",
      type: '"default" | "sm" | "lg"',
      default: '"default"',
      description: "Controls the visual size of the switch thumb and track.",
    },
  ],

  tabs: [
    {
      prop: "value",
      type: "string",
      description: "Controlled value of the active tab.",
    },
    {
      prop: "defaultValue",
      type: "string",
      description: "Uncontrolled initial active tab value.",
    },
    {
      prop: "onValueChange",
      type: "(value: string) => void",
      description: "Callback fired when the active tab changes.",
    },
    {
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Orientation of the tabs list.",
    },
    {
      prop: "dir",
      type: '"ltr" | "rtl"',
      description: "Reading direction for keyboard navigation.",
    },
    {
      prop: "activationMode",
      type: '"automatic" | "manual"',
      default: '"automatic"',
      description: "Whether tabs activate on focus or only on explicit selection.",
    },
    {
      prop: "TabsList · variant",
      type: '"default" | "line"',
      default: '"default"',
      description: "Visual style of TabsList — pill/filled or underline.",
    },
  ],

  textarea: [
    {
      prop: "value",
      type: "string",
      description: "Controlled value of the textarea.",
    },
    {
      prop: "defaultValue",
      type: "string",
      description: "Uncontrolled initial value.",
    },
    {
      prop: "onChange",
      type: "(event: React.ChangeEvent<HTMLTextAreaElement>) => void",
      description: "Callback fired on every value change.",
    },
    {
      prop: "placeholder",
      type: "string",
      description: "Placeholder text shown when the textarea is empty.",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the textarea.",
    },
    {
      prop: "readOnly",
      type: "boolean",
      default: "false",
      description: "Makes the textarea read-only.",
    },
    {
      prop: "required",
      type: "boolean",
      default: "false",
      description: "Marks the textarea as required in a form.",
    },
    {
      prop: "rows",
      type: "number",
      description: "Visible number of text lines.",
    },
    {
      prop: "name",
      type: "string",
      description: "Name attribute for form submission.",
    },
    {
      prop: "id",
      type: "string",
      description: "HTML id — used to associate with a <label>.",
    },
    {
      prop: "className",
      type: "string",
      description: "Additional CSS classes for the textarea.",
    },
  ],
}

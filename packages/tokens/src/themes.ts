import { semanticColors } from "./colors";

export const themes = {
  light: {
    colors: semanticColors.light,
  },
  dark: {
    colors: semanticColors.dark,
  },
  brand: {
    colors: {
      ...semanticColors.light,
      primary: "#111827",
      primaryHover: "#1f2937",
      secondary: "#ff5a1f",
      secondaryHover: "#e94b10",
      focus: "#ff5a1f",
    },
  },
} as const;

export type ThemeName = keyof typeof themes;

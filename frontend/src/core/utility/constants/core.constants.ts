/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSVariablesResolver, createTheme } from "@mantine/core";

export const theme: any = createTheme({
  primaryColor: "primary",
  primaryShade: 6,
  fontFamily: "Poppins, sans-serif",
  colors: {
    primary: [
      "#e1faff",
      "#cdf0ff",
      "#9fddfb",
      "#6ccaf7",
      "#44baf4",
      "#2bb0f2",
      "#16abf2",
      "#0095d8",
      "#0084c3",
      "#0073ac",
    ],
  },
  cursorType: "pointer",
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {
    "--mantine-color-blue-filled": "#000",
    "--btn-bg-color": "#356966",
  },
  dark: {},
  light: {},
});

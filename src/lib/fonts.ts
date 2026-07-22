import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * Fonts are self-hosted by next/font at build time (no render-blocking request
 * to Google), all with `display: swap`. Exposed as CSS variables consumed by
 * the Tailwind fontFamily tokens (display / sans / mono).
 *
 *   display -> Archivo        industrial grotesque, technical presence
 *   body    -> Inter          highly legible body text
 *   mono    -> IBM Plex Mono  spec numbers, certification codes, data labels
 */
export const fontDisplay = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

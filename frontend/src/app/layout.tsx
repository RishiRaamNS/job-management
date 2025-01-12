import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "JobDeck",
  description: "Job Management Dashboard",
};

const theme = createTheme({
  fontFamily: "Satoshi, sans-serif",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap"
          rel="stylesheet"
        ></link>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider withGlobalClasses theme={theme}>
          <Providers>{children}</Providers>
        </MantineProvider>
      </body>
    </html>
  );
}

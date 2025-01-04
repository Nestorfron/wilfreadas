import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next"

import App from "./App.jsx";
import "../src/styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SpeedInsights />
        <App />
      </NextThemesProvider>
    </NextUIProvider>
  </StrictMode>
);

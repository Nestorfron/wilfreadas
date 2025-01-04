import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

import App from "./App.jsx";
import "../src/styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <App />
      </NextThemesProvider>
    </NextUIProvider>
  </StrictMode>
);

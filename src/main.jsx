import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "rgb(31, 41, 55)",
          colorInputBackground: "rgb(55, 65, 81)",
          colorNeutral: "#fff",
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// core styles are required for all packages
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import AppRoutes from "./AppRoutes.tsx";
import { resolver, theme } from "./core/utility/constants/core.constants.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        defaultColorScheme="light"
        theme={theme}
        cssVariablesResolver={resolver}
      >
        <AppRoutes />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

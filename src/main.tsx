import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import "./index.css";
import AuthStateProvider from "./context/Auth_Context.tsx";
import Provider from "./Provider.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import ThemeProvider from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <ErrorBoundary fallback={<ErrorPage />}>
          <Provider>
            <AuthStateProvider>
              <App />
            </AuthStateProvider>
          </Provider>
        </ErrorBoundary>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
